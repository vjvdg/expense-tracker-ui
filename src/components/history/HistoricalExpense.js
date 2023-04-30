import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import EditExpenseModal from "../expense/EditExpenseModal";
import { Box, FormControl, InputLabel, MenuItem, Select, Skeleton, CircularProgress } from "@mui/material";
import { Stack } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { getFormattedDate } from '../../utils/DateUtils';
import { iconMap } from '../../utils/Utils';

function HistoricalExpense({ getExpensesApi, expenses, loadExpenses, year, month, setYear, setMonth }) {

  const {metadata} = useContext(AppContext);

  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleOpenEditExpenseModal() {
    setShowEditExpenseModal(true);
  }

  function handleClose() {
    setSelectedRow({});
    setShowEditExpenseModal(false);
  };

  function handleAfterAction() {
    handleClose();
    loadExpenses();
  }

  function handleRowClick(params) {
    setSelectedRow(params.row);
    handleOpenEditExpenseModal();
  }

  function getMonthsMenuItems() {
    const menuItems = [];

    for (const month of Object.keys(months)) {
      menuItems.push(
        <MenuItem key={month} value={month}>
          {months[month]}
        </MenuItem>
      );
    }

    return menuItems;
  }

  function getYearsMenuItems() {
    const menuItems = [];
    const years = metadata?.years ?? [];

    for (const year of years) {
      menuItems.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }

    return menuItems;
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

  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  const currencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  });

  const monthlyTotal = expenses?.map(expense => expense.amount).reduce((prev, curr) => prev + curr, 0);

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
      <Box
        sx={{
          position: 'fixed',
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,1) 95%, rgba(255,255,255,0))',
          height: 133,
          width: '90%',
          maxWidth: 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
          <FormControl sx={{ width: '48%' }} size='small'>
            <InputLabel>Month</InputLabel>
            <Select
              value={month}
              label='Month'
              onChange={handleMonthChange}
            >
              {getMonthsMenuItems()}
            </Select>
          </FormControl>
          <FormControl sx={{ width: '48%' }} size='small'>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              label='Year'
              onChange={handleYearChange}
            >
              {getYearsMenuItems()}
            </Select>
          </FormControl>
        </div>
        <div style={{ paddingBottom: 10 }}>
          <div className='monthly-total-header'>Monthly Total:</div>
          <div className='monthly-total'>
            {
              getExpensesApi?.loading
              ? <CircularProgress size={20} thickness={6}/>
              : currencyFormatter.format(monthlyTotal)
            }
          </div>
        </div>
      </Box>
      {Object.keys(selectedRow).length > 0 && <EditExpenseModal
        key={selectedRow}
        expense={selectedRow}
        showEditExpenseModal={showEditExpenseModal}
        handleClose={handleClose}
        handleAfterAction={handleAfterAction}
      />}      
      <div style={{ height: height, width: '90%', maxWidth: 700, margin: 'auto', marginTop: 133, marginBottom: 90 }}>
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
      </div>
    </div>
  );
}

export default HistoricalExpense;