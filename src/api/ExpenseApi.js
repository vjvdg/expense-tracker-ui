import {axiosClient} from "./ApiClient";

function getExpensesByYearMonth(yearMonth) {
    
    return axiosClient.get('/expense/retrieve', {
        params: yearMonth
    });

}

function saveExpense(expense) {
    return axiosClient.post('/expense/save', expense);
}

export default {getExpensesByYearMonth, saveExpense};