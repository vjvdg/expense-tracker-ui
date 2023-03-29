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
        flex: 21,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        valueGetter: (params) => `${params.row.expenseDate.slice(0, 10)}`
      },
      { 
        field: 'item',
        headerName: 'Item',
        flex: 36,
        align: 'center',
        headerAlign: 'center',
        sortable: false
      },
      {
        field: 'category',
        headerName: 'Category',
        flex: 23,
        align: 'center',
        headerAlign: 'center',
        sortable: false
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
        <div style={{ height: 550, width: '90%', margin: 'auto'}}>
          <DataGrid 
            rows={expenses}
            columns={columns}
            disableColumnMenu
          />
        </div>
    );
}

export default Expense;