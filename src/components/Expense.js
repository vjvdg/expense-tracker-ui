import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/UseApi';
import expenseApi from '../api/ExpenseApi';
import { CircularProgress, IconButton, Skeleton, BottomNavigation, BottomNavigationAction, Box } from '@mui/material/';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle, Paid, History, Analytics } from '@mui/icons-material';
import { getFormattedDate } from '../utils/DateUtils';
import { iconMap } from '../utils/Utils';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import '../styles/expense.less';

function Expense() {

  const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
  const expenses = getExpensesApi?.data ?? [];
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [index, setIndex] = useState(0);

  function handleOpenAddExpenseModal() {
    setShowAddExpenseModal(true);
  }

  function handleOpenEditExpenseModal() {
    setShowEditExpenseModal(true);
  }

  function handleClose() {
    setSelectedRow({});
    setShowAddExpenseModal(false);
    setShowEditExpenseModal(false);
  };

  function loadExpenses() {
    const date = new Date();
    getExpensesApi.request({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  function handleAfterAction() {
    handleClose();
    loadExpenses();
  }

  function handleRowClick(params) {
    console.log(params.row);
    setSelectedRow(params.row);
    handleOpenEditExpenseModal();
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const currencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  });

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
        <IconButton color='primary' size='large' onClick={handleOpenAddExpenseModal} disabled={getExpensesApi?.loading}>
          <AddCircle fontSize='large' />
        </IconButton>
        <AddExpenseModal
          key={expenses}
          showAddExpenseModal={showAddExpenseModal}
          handleClose={handleClose}
          handleAfterAction={handleAfterAction}
        />
        {Object.keys(selectedRow).length > 0 && <EditExpenseModal
          key={selectedRow}
          expense={selectedRow}
          showEditExpenseModal={showEditExpenseModal}
          handleClose={handleClose}
          handleAfterAction={handleAfterAction}
        />}
      </div>
      <div style={{ height: height, width: '90%', margin: 'auto', marginBottom: '70px' }}>
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
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                   outline: "none !important",
                }
              }}
              rows={expenses}
              columns={columns}
              rowHeight={40}
              columnHeaderHeight={50}
              disableColumnMenu
              autoPageSize
              hideFooter
              onRowClick={handleRowClick}
            />
        }
      </div>
      <Box sx={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <BottomNavigation
          sx={{ backgroundColor: '#212121' }}
          showLabels
          value={index}
          onChange={(event, newValue) => {
            setIndex(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: '#fff' }} label="Expenses" icon={<Paid />} />
          <BottomNavigationAction sx={{ color: '#fff' }} label="History" icon={<History />} />
          <BottomNavigationAction sx={{ color: '#fff' }} label="Insights" icon={<Analytics />} />
        </BottomNavigation>
      </Box>
    </div>
  );

}

export default Expense;