import React, { useState } from "react";
import { useApi } from '../hooks/UseApi';
import expenseApi from '../api/ExpenseApi';
import { Button, Modal, Box, FormControl, Select, MenuItem, InputLabel, TextField, OutlinedInput, InputAdornment, CircularProgress } from '@mui/material';
import { Train, Fastfood, Restaurant, Receipt, TheaterComedy, LocalMall, EmojiPeople, Pending, AddCircle } from '@mui/icons-material';

function ExpenseModal({ showAddExpenseModal, handleClose, handleAfterSavingExpense }) {

  const saveExpenseApi = useApi(expenseApi.saveExpense);

  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);

  const handleItemChange = (event) => {
    setItem(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddExpense = () => {
    const expense = {
      'item': item,
      'category': category,
      'amount': amount
    };
    console.log(expense);
    saveExpenseApi.request(expense, handleAfterSavingExpense);
  }

  const closeExpenseModal = () => {
    handleClose();
    setItem('');
    setCategory('');
    setAmount(0);
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

  return (
    <div>
      <Modal open={showAddExpenseModal} onClose={closeExpenseModal}>
        <Box sx={expenseModalStyle}>
          <FormControl sx={{ my: 2, minWidth: 282 }}>
            <TextField size='small' label='Item' variant="outlined" onChange={handleItemChange}/>
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small'>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label='Category'
              onChange={handleCategoryChange}
            >
              {/* TODO: generate MenuItems dynamically from metadata */}
              <MenuItem value='TRANSPORT'><Button startIcon={<Train />}>Transport</Button></MenuItem>
              <MenuItem value='FOOD'><Button startIcon={<Fastfood />}>Food</Button></MenuItem>
              <MenuItem value='DINING'><Button startIcon={<Restaurant />}>Dining</Button></MenuItem>
              <MenuItem value='BILLS'><Button startIcon={<Receipt />}>Bills</Button></MenuItem>
              <MenuItem value='ENTERTAINMENT'><Button startIcon={<TheaterComedy />}>Entertainment</Button></MenuItem>
              <MenuItem value='SHOPPING'><Button startIcon={<LocalMall />}>Shopping</Button></MenuItem>
              <MenuItem value='LIFESTYLE'><Button startIcon={<EmojiPeople />}>Lifestyle</Button></MenuItem>
              <MenuItem value='MISCELLANEOUS'><Button startIcon={<Pending />}>Miscellaneous</Button></MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ my: 2, minWidth: 282 }} size='small'>
            <InputLabel>Amount</InputLabel>
            <OutlinedInput
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              onChange={handleAmountChange}
            />
          </FormControl>
          <Button 
            sx={{ my: 2, minWidth: 282 }}
            variant='contained'
            startIcon={saveExpenseApi?.loading ? <CircularProgress color='inherit' size={17} /> : <AddCircle />}
            disabled={saveExpenseApi?.loading}
            onClick={handleAddExpense}
          >
            Add Expense
          </Button>
        </Box>
      </Modal>
    </div>
  );

}

export default ExpenseModal;