import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useApi } from '../hooks/UseApi';
import expenseApi from '../api/ExpenseApi';
import { Button, Modal, Box, FormControl, Select, MenuItem, InputLabel, TextField, OutlinedInput, InputAdornment, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { iconMap } from "../utils/Utils";

function EditExpenseModal({ expense, showEditExpenseModal, handleClose, handleAfterAction }) {

  const {metadata} = useContext(AppContext);
  const editExpenseApi = useApi(expenseApi.editExpense);
  const deleteExpenseApi = useApi(expenseApi.deleteExpense);

  const id = expense.id;
  const expenseDate = expense.expenseDate;

  const [item, setItem] = useState(expense.item);
  const [category, setCategory] = useState(expense.category);
  const [amount, setAmount] = useState(expense.amount);

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleEditExpense = () => {
    const expense = {
      'id': id,
      'item': item,
      'category': category,
      'amount': amount,
      'expenseDate': expenseDate
    };
    console.log(expense);
    editExpenseApi.request(expense, handleAfterAction);
  }

  const handleDeleteExpense = () => {
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

    for (const category of metadata?.categories) {
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
          <FormControl sx={{ my: 2, minWidth: 282 }}>
            <TextField size='small' label='Item' variant="outlined" value={item} onChange={handleItemChange}/>
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small'>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label='Category'
              onChange={handleCategoryChange}
            >
              {getMenuItems()}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small'>
            <InputLabel>Amount</InputLabel>
            <OutlinedInput
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              value={amount}
              label="Amount"
              onChange={handleAmountChange}
            />
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