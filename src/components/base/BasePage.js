import React, { useEffect, useMemo, useState } from "react";
import { useApi } from '../../hooks/UseApi';
import expenseApi from '../../api/ExpenseApi';
import Expense from "../expense/Expense";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Paid, History, Analytics } from "@mui/icons-material";
import HistoricalExpense from "../history/HistoricalExpense";

function BasePage() {

  const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
  const expenses = getExpensesApi?.data ?? [];

  const getHistoricalExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
  const historicalExpenses = getHistoricalExpensesApi?.data ?? [];
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  const [index, setIndex] = useState(0);

  function loadExpenses() {
    const date = new Date();
    getExpensesApi.request({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  function loadHistoricalExpenses() {
    getHistoricalExpensesApi.request({ year: year, month: month });
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    if (year !== '' && month !== '') {
      loadHistoricalExpenses();
    }
  }, [year, month]);

  return (
    <div>
      {index === 0 && <Expense getExpensesApi={getExpensesApi} expenses={expenses} loadExpenses={loadExpenses} />}
      {index === 1 && <HistoricalExpense getExpensesApi={getHistoricalExpensesApi} expenses={historicalExpenses} year={year} month={month} setYear={setYear} setMonth={setMonth} />}
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

export default BasePage;