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

function deleteExpense(id) {
    return axiosClient.post('/expense/delete', null, {
        params: {
            id: id
        }
    });
}

export default {getExpensesByYearMonth, saveExpense, editExpense, deleteExpense};