import React, { useEffect, useMemo, useState } from 'react';
import { useApi } from '../hooks/UseApi';
import expenseApi from '../api/ExpenseApi';
import { CircularProgress, IconButton, Skeleton } from '@mui/material/';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { Train, Fastfood, Restaurant, Receipt, TheaterComedy, LocalMall, EmojiPeople, Pending, AddCircle } from '@mui/icons-material';
import { getFormattedDate } from '../utils/DateUtils';
import ExpenseModal from './ExpenseModal';
import '../styles/expense.less';

function Expense() {

  const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
  const expenses = getExpensesApi?.data ?? [];
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  function handleOpen() {
    setShowAddExpenseModal(true);
  }

  function handleClose() {
    setShowAddExpenseModal(false);
  };

  function loadExpenses() {
    const date = new Date();
    getExpensesApi.request({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  function handleAfterSavingExpense() {
    handleClose();
    loadExpenses();
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const currencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  });

  const iconMap = useMemo(() => {
    return {
      'TRANSPORT': <Train />,
      'FOOD': <Fastfood />,
      'DINING': <Restaurant />,
      'BILLS': <Receipt />,
      'ENTERTAINMENT': <TheaterComedy />,
      'SHOPPING': <LocalMall />,
      'LIFESTYLE': <EmojiPeople />,
      'MISCELLANEOUS': <Pending />
    }
  }, []);

  const monthlyTotal = expenses.map(expense => expense.amount).reduce((prev, curr) => prev + curr, 0);

  const height = 50 + expenses.length * 40 + 1.5;

  const columns = [
    {
      field: 'expenseDate',
      headerName: 'Date',
      flex: 18,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueGetter: (params) => getFormattedDate(params.value)
    },
    {
      field: 'item',
      headerName: 'Item',
      flex: 43,
      align: 'center',
      headerAlign: 'center',
      sortable: false
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 19,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params) => iconMap[params.value]
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 20,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      valueFormatter: ({ value }) => currencyFormatter.format(value)
    }
  ];

  return (
    <div>
      <div className='monthly-total-header'>Monthly Total:</div>
      <div className='monthly-total'>
        {
          getExpensesApi?.loading
          ? <CircularProgress size={20} thickness={6}/>
          : currencyFormatter.format(monthlyTotal)
        }
        </div>
      <div className='add-expense-button'>
        <IconButton color='primary' size='large' onClick={handleOpen} disabled={getExpensesApi?.loading}>
          <AddCircle fontSize='large' />
        </IconButton>
        <ExpenseModal
          key={expenses}
          showAddExpenseModal={showAddExpenseModal}
          handleClose={handleClose}
          handleAfterSavingExpense={handleAfterSavingExpense}
        />
      </div>
      <div style={{ height: height, width: '90%', margin: 'auto', marginBottom: '30px' }}>
        {
          getExpensesApi?.loading 
          ? <Stack spacing={1}>
              <Skeleton variant='rounded' width='100%' height={42}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
              <Skeleton variant='rounded' width='100%' height={32}/>
            </Stack>
          : <DataGrid
              rows={expenses}
              columns={columns}
              rowHeight={40}
              columnHeaderHeight={50}
              disableColumnMenu
              autoPageSize
              hideFooter
            />
        }
      </div>
    </div>
  );

}

export default Expense;