import {
    TRANSACTION,
    HEADERS
} from "../_constants"
import axios from "axios"
// import Swal from 'sweetalert2'

export function setLoading(load) {
    return {
        type: TRANSACTION.LOADING,
        load
    }
}
export function setFailed(data = []) {
    return {
        type: TRANSACTION.FAILED,
        data
    }
}

export function setTransactionReport(data=[]){
    return {
        type:TRANSACTION.SUCCESS_REPORT,
        data
    }
}

export const FetchTransactionReport = (page=1,where='',id)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `transaction/detail/${id}?page=${page}`;
        if(where!==''){
            url+=`${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setTransactionReport(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}