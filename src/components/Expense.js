import React, { useEffect } from "react";
import { useApi } from "../hooks/UseApi";
import expenseApi from "../api/ExpenseApi";

function Expense() {

    const getExpensesApi = useApi(expenseApi.getExpensesByYearMonth);
    const expenses = getExpensesApi?.data ?? [];

    useEffect(() => {
      const date = new Date();
      getExpensesApi.request({ year: date.getFullYear(), month: date.getMonth() + 1 });
    }, []);

    return (
      <div className="container pt-2">
        <div className="row pt-2 pb-2" style={{ textAlign: "center"}}>
          <div className="col"><b>Date</b></div>
          <div className="col"><b>Item</b></div>
          <div className="col"><b>Category</b></div>
          <div className="col"><b>Amount</b></div>
        </div>
        {renderExpenses(expenses)}
      </div>
    );
}

function renderExpenses(expenses) {
  const renderedExpenses = [];

  for (const [index, expense] of expenses.entries()) {
    renderedExpenses.push(
      <div key={index} className="row pt-2 pb-2" style={{ textAlign: "center"}}>
        <div className="col">{expense.expenseDate.slice(0, 10)}</div>
        <div className="col">{expense.item}</div>
        <div className="col">{expense.category}</div>
        <div className="col">{expense.amount}</div>
    </div>
    );
  };

  return (
    <div>
      {renderedExpenses}
    </div>
  );
}

export default Expense;