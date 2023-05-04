import React, { useState } from "react";
import { Button, Modal, Box, FormControl, Select, MenuItem, InputLabel, TextField, OutlinedInput, InputAdornment, CircularProgress, FormHelperText, Alert } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { iconMap } from "../../utils/Utils";

function DemoAddExpenseModal({ expenses, setExpenses, showAddExpenseModal, handleClose }) {

  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const [itemError, setItemError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const handleItemChange = (event) => {
    setItemError(false);
    setItem(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategoryError(false);
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmountError(false);
    setAmount(event.target.value);
  };

  function checkInput() {
    const isItemValid = item.length !== 0 && item.trim().length !== 0;
    const isCategoryValid = category.length !== 0 && category.trim().length !== 0;
    const isAmountValid = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(amount);
    return { isItemValid, isCategoryValid, isAmountValid };
  }

  const handleAddExpense = () => {
    const { isItemValid, isCategoryValid, isAmountValid } = checkInput();
    if (!isItemValid || !isCategoryValid || !isAmountValid) {
      setItemError(!isItemValid);
      setCategoryError(!isCategoryValid);
      setAmountError(!isAmountValid);
    } else {
      const expenseDate = new Date();
      const expense = {
        'id': Date.now(),
        'item': item,
        'category': category,
        'amount': amount,
        'expenseDate': expenseDate.toISOString()
      };
      const newExpenses = [...expenses, expense];
      newExpenses.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setExpenses(newExpenses);
      handleClose();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const closeExpenseModal = () => {
    handleClose();
    setItem('');
    setCategory('');
    setAmount('');
    setItemError(false);
    setCategoryError(false);
    setAmountError(false);
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
    const categories = ['TRANSPORT', 'FOOD', 'DINING', 'BILLS', 'ENTERTAINMENT', 'SHOPPING', 'LIFESTYLE', 'MISCELLANEOUS']

    for (const category of categories) {
      menuItems.push(
        <MenuItem key={category} value={category}>
          <Button 
            startIcon={iconMap[category]}
            disableRipple
            disableElevation
            disableFocusRipple
            sx={{"&:hover": {backgroundColor: "transparent", }}}
          >
            {category}
          </Button>
        </MenuItem>
      );
    }

    return menuItems;
  }

  return (
    <div>
      <Modal open={showAddExpenseModal} onClose={closeExpenseModal}>
        <Box sx={expenseModalStyle}>
          <FormControl sx={{ my: 2, minWidth: 282 }}>
            <TextField 
              size='small'
              label='Item'
              variant="outlined"
              error={itemError}
              helperText={itemError && 'Please fill in this field.'}
              onChange={handleItemChange}
            />
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
              label="Amount"
              onChange={handleAmountChange}
              inputProps={{ inputMode: 'decimal' }}
            />
            {amountError && <FormHelperText>Please input a valid amount.</FormHelperText>}
          </FormControl>
          <Button 
            sx={{ my: 2, minWidth: 282 }}
            variant='contained'
            startIcon={<AddCircle />}
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DemoAddExpenseModal;