import {axiosClient} from "./ApiClient";

function getExpensesByYearMonth(yearMonth) {
    
    return axiosClient.get('/expense/retrieve', {
        params: yearMonth
    });

}

function saveExpense(expense) {
    return axiosClient.post('/expense/save', expense);
}

function editExpense(expense) {
    return axiosClient.post('/expense/edit', expense, {
        params: {
            id: expense.id
        }
    });
}

export default {getExpensesByYearMonth, saveExpense, editExpense};