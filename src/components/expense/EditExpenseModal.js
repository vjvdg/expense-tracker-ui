import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import { useApi } from '../../hooks/UseApi';
import expenseApi from '../../api/ExpenseApi';
import { Button, Modal, Box, FormControl, Select, MenuItem, InputLabel, TextField, OutlinedInput, InputAdornment, CircularProgress, FormHelperText, Alert } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { iconMap } from "../../utils/Utils";

function EditExpenseModal({ expense, showEditExpenseModal, handleClose, handleAfterAction }) {

  const {metadata} = useContext(AppContext);
  const editExpenseApi = useApi(expenseApi.editExpense);
  const deleteExpenseApi = useApi(expenseApi.deleteExpense);

  const id = expense.id;
  const expenseDate = expense.expenseDate;

  const [item, setItem] = useState(expense.item);
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);

  const [itemError, setItemError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [editApiError, setEditApiError] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(false);

  useEffect(() => {
    setEditApiError(editExpenseApi?.error);
  }, [editExpenseApi?.error]);

  useEffect(() => {
    setDeleteApiError(deleteExpenseApi?.error);
  }, [deleteExpenseApi?.error]);

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  function checkInput() {
    const isItemValid = item.length !== 0 && item.trim().length !== 0;
    const isCategoryValid = category.length !== 0 && category.trim().length !== 0;
    const isAmountValid = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(amount);
    return { isItemValid, isCategoryValid, isAmountValid };
  }

  const handleEditExpense = () => {
    setEditApiError(false);
    setDeleteApiError(false);
    const { isItemValid, isCategoryValid, isAmountValid } = checkInput();
    if (!isItemValid || !isCategoryValid || !isAmountValid) {
      setItemError(!isItemValid);
      setCategoryError(!isCategoryValid);
      setAmountError(!isAmountValid);
    } else {
      const expense = {
        'id': id,
        'item': item,
        'category': category,
        'amount': amount,
        'expenseDate': expenseDate
      };
      editExpenseApi.request(expense, handleAfterAction);
    }    
  }

  const handleDeleteExpense = () => {
    setEditApiError(false);
    setDeleteApiError(false);
    deleteExpenseApi.request(id, handleAfterAction);
  }

  const closeExpenseModal = () => {
    handleClose();
  }

  const expenseModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

  function getMenuItems() {
    const menuItems = [];
    const categories = metadata?.categories ?? [];

    for (const category of categories) {
      menuItems.push(
        <MenuItem key={category} value={category}><Button startIcon={iconMap[category]}>{category}</Button></MenuItem>
      );
    }

    return menuItems;
  }

  return (
    <div>
      <Modal open={showEditExpenseModal} onClose={closeExpenseModal}>
        <Box sx={expenseModalStyle}>
          {(editApiError || deleteApiError) && <Alert severity="error" sx={{ mb: 2 }}>Oops, something went wrong.</Alert>}
          <FormControl sx={{ my: 2, minWidth: 282 }}>
            <TextField
              size='small'
              label='Item'
              variant="outlined"
              value={item}
              error={itemError}
              helperText={itemError && 'Please fill in this field.'}
              onChange={handleItemChange}/>
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small' error={categoryError}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label='Category'
              onChange={handleCategoryChange}
            >
              {getMenuItems()}
            </Select>
            {categoryError && <FormHelperText>Please select a category.</FormHelperText>}
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small' error={amountError}>
            <InputLabel>Amount</InputLabel>
            <OutlinedInput
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              value={amount}
              label="Amount"
              onChange={handleAmountChange}
              inputProps={{ inputMode: 'decimal' }}
            />
            {amountError && <FormHelperText>Please input a valid amount.</FormHelperText>}
          </FormControl>
          <Button 
            sx={{ my: 1, minWidth: 282 }}
            variant='contained'
            startIcon={editExpenseApi?.loading ? <CircularProgress color='inherit' size={17} /> : <Edit />}
            disabled={editExpenseApi?.loading || deleteExpenseApi?.loading}
            onClick={handleEditExpense}
          >
            Edit Expense
          </Button>
          <Button 
            sx={{ minWidth: 282 }}
            variant='contained'
            color='error'
            startIcon={deleteExpenseApi?.loading ? <CircularProgress color='inherit' size={17} /> : <Delete />}
            disabled={editExpenseApi?.loading || deleteExpenseApi?.loading}
            onClick={handleDeleteExpense}
          >
            Delete Expense
          </Button>
        </Box>
      </Modal>
    </div>
  );

}

export default EditExpenseModal;