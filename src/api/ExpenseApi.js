import {axiosClient} from "./ApiClient";

function getExpensesByYearMonth(yearMonth) {
    
    return axiosClient.get('/expense/retrieve', {
        params: yearMonth
    });

}

export default {getExpensesByYearMonth};