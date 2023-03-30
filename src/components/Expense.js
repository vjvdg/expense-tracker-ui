import React, { useEffect, useMemo } from "react";
import { useApi } from "../hooks/UseApi";
import expenseApi from "../api/ExpenseApi";
import { DataGrid } from '@mui/x-data-grid';
import { Train, Fastfood, Restaurant, Receipt, TheaterComedy, ShoppingCart, EmojiPeople, MiscellaneousServices } from '@mui/icons-material';
import { getFormattedDate } from "../utils/DateUtils";

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

    const iconMap = useMemo(() => {
      return {
        'TRANSPORT': <Train />,
        'FOOD': <Fastfood />,
        'DINING': <Restaurant />,
        'BILLS': <Receipt />,
        'ENTERTAINMENT': <TheaterComedy />,
        'SHOPPING': <ShoppingCart />,
        'LIFESTYLE': <EmojiPeople />,
        'MISCELLANEOUS': <MiscellaneousServices />
      }
    }, []);

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