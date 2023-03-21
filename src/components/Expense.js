import React, { useEffect } from "react";
import { useApi } from "../hooks/UseApi";
import expenseApi from "../api/ExpenseApi";
import { DataGrid } from '@mui/x-data-grid';

function Expense() {

    const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
    const expenses = getExpensesApi?.data ?? [];

    useEffect(() => {
      const date = new Date();
      getExpensesApi.request({ year: date.getFullYear(), month: date.getMonth() + 1 });
    }, []);

    const currencyFormatter = new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
    });

    const columns = [
      { 
        field: 'expenseDate', 
        headerName: 'Date',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params) => `${params.row.expenseDate.slice(0, 10)}`
      },
      { field: 'item', headerName: 'Item', flex: 5, align: 'center', headerAlign: 'center'},
      { field: 'category', headerName: 'Category', flex: 2, align: 'center', headerAlign: 'center'},
      {
        field: 'amount',
        headerName: 'Amount',
        flex: 1, align: 'center',
        headerAlign: 'center',
        valueFormatter: ({ value }) => currencyFormatter.format(value)
      }
    ];

    return (
        <div style={{ height: 700, width: '90%', margin: 'auto'}}>
          <DataGrid 
            rows={expenses}
            columns={columns}
          />
        </div>
    );
}

export default Expense;