import React, { useState } from "react";
import { IconButton, Box, Typography } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle } from '@mui/icons-material';
import { getFormattedDate } from '../../utils/DateUtils';
import { iconMap } from '../../utils/Utils';
import DemoAddExpenseModal from "./DemoAddExpenseModal";
import DemoEditExpenseModal from "./DemoEditExpenseModal";

function DemoExpense() {

  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [expenses, setExpenses] = useState([]);

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

  function handleRowClick(params) {
    setSelectedRow(params.row);
    handleOpenEditExpenseModal();
  }

  const currencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  });

  const monthlyTotal = expenses?.map(expense => expense.amount).reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0);

  const height = 50 + expenses?.length * 40 + 1.5;

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
          {currencyFormatter.format(monthlyTotal)}
        </div>
        <div className='add-expense-button'>
          <IconButton color='primary' size='large' onClick={handleOpenAddExpenseModal}>
            <AddCircle fontSize='large' />
          </IconButton>
        </div>
      </Box>
      <DemoAddExpenseModal
        key={expenses}
        expenses={expenses}
        setExpenses={setExpenses}
        showAddExpenseModal={showAddExpenseModal}
        handleClose={handleClose}
      />
      {Object.keys(selectedRow).length > 0 && <DemoEditExpenseModal
        key={selectedRow?.id}
        expense={selectedRow}
        expenses={expenses}
        setExpenses={setExpenses}
        showEditExpenseModal={showEditExpenseModal}
        handleClose={handleClose}
      />}
      <div style={{ height: height, width: '90%', maxWidth: 702, margin: 'auto', marginTop: '133px', marginBottom: '90px' }}>
        <DataGrid
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
      </div>
      <Box 
        sx={{
          position: 'fixed',
          width: '100%',
          bottom: 0,
          backgroundColor: '#212121',
          height: 75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h4' textAlign='center' color='#fff' paddingBottom={1}>
          THIS IS A DEMO
        </Typography>
      </Box>
    </div>
  );
}

export default DemoExpense;