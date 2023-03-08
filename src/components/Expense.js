import React, { useEffect } from "react";
import ExpenseApi from "../api/ExpenseApi";
import { useApi } from "../hooks/UseApi";
import expenseApi from "../api/ExpenseApi";

function Expense() {

    const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
    const expenses = getExpensesApi?.data?.data;

    useEffect(() => {
      getExpensesApi.request({ year: 2023, month: 2 });
    }, []);

    return (
      <div>
        {expenses?.map(expense => renderExpense(expense))}
      </div>
    );

}

function renderExpense(expense) {
  return (
    <div>
      {`${expense.expenseDate.slice(0, 10)}, ${expense.item}, ${expense.category}, ${expense.amount}`}
      <br />
    </div>
  );
}

export default Expense;