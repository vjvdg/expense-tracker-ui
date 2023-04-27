import React, { useState } from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { getFormattedDate } from '../../utils/DateUtils';

function HistoricalExpense() {

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

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
          height: 75,
          width: '90%',
          maxWidth: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <FormControl sx={{ width: '48%' }} size='small'>
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            label='Month'
            onChange={handleMonthChange}
          >
            <MenuItem value={1}>January</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: '48%' }} size='small'>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            label='Year'
            onChange={handleYearChange}
          >
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div style={{ height: 50, width: '90%', maxWidth: 700, margin: 'auto', marginTop: 75 }}>
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            }
          }}
          rows={[]}
          columns={columns}
          rowHeight={40}
          columnHeaderHeight={50}
          disableColumnMenu
          autoPageSize
          hideFooter
        />
      </div>
    </div>
  );
}

export default HistoricalExpense;