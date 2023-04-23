import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/UseApi';
import expenseApi from '../../api/ExpenseApi';
import { CircularProgress, IconButton, Skeleton, BottomNavigation, BottomNavigationAction, Box, Typography, ButtonBase } from '@mui/material/';
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle, Paid, History, Analytics } from '@mui/icons-material';
import { getFormattedDate } from '../../utils/DateUtils';
import { iconMap } from '../../utils/Utils';
import AddExpenseModal from './AddExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import '../../styles/expense.less';

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
    setSelectedRow(params.row);
    handleOpenEditExpenseModal();
  }

  function getLoadingSkeleton() {
    const skeleton = [];
    skeleton.push(<Skeleton key={0} variant='rounded' width='100%' height={42}/>);

    for (let i = 0; i < 13; i++) {
      skeleton.push(<Skeleton key={i+1} variant='rounded' width='100%' height={32}/>);
    }

    return (
      <Stack spacing={1}>
        {skeleton}
      </Stack>
    );
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
      <Box sx={{ position: 'fixed', width: '100%', top: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1) 95%, rgba(255,255,255,0))' }}>
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
        </div>
      </Box>
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
      <div style={{ height: height, width: '90%', margin: 'auto', marginTop: '133px', marginBottom: '90px' }}>
        {
          getExpensesApi?.loading 
          ? getLoadingSkeleton()
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
        {
          getExpensesApi?.error &&
          <ButtonBase
            sx={{ width: '70%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            disableRipple
            onClick={loadExpenses}
          >
            <Typography variant="h6" align="center" display="block">
                Failed to load expenses.
                <br/>
                Tap to retry.
            </Typography>
          </ButtonBase>
        }
      </div>
      <Box sx={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <BottomNavigation
          sx={{ backgroundColor: '#212121', height: 75 }}
          showLabels
          value={index}
          onChange={(event, newValue) => {
            setIndex(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="Expenses" icon={<Paid />} />
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="History" icon={<History />} />
          <BottomNavigationAction sx={{ color: '#fff', paddingBottom: '15px' }} label="Insights" icon={<Analytics />} />
        </BottomNavigation>
      </Box>
    </div>
  );

}

export default Expense;