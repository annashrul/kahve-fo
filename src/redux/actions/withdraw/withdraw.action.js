import {
    WITHDRAW,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'



export function setLoading(load) {
    return {
        type: WITHDRAW.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: WITHDRAW.LOADING,
        load
    }
}
export function setWithdraw(data = []) {
    return {
        type: WITHDRAW.SUCCESS,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: WITHDRAW.FAILED,
        data
    }
}

export function setWithdrawReport(data=[]){
    return {type:WITHDRAW.SUCCESS_REPORT,data}
}
export function setWithdrawConfig(data=[]){
    return {type:WITHDRAW.SUCCESS_CONFIG,data}
}

export const storeWithdraw = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `withdraw`;
        axios.post(url, data)
            .then(function (response) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Transaksi berhasil.',
                    type: 'info',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result)=>{
                    // if(result.dismiss === 'cancel'){
                    //     window.location.reload(false);
                    // }
                    window.location.reload();
                });

                // dispatch(setLoadingPost(false));
                // Swal.fire({
                //     title: 'Success',
                //     type: 'success',
                //     text:"Transaksi Berhasil",
                // }).then((result)=>{
                //     localStorage.removeItem("nota_pembelian_withdraw");
                //     localStorage.removeItem("jenis_trx_withdraw");
                //     window.location.reload();
                // });
            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Failed',
                    type: 'error',
                    text: error.response.data.msg,
                });

                if (error.response) {
                    
                }
            })
    }
}


//FILTER WITHDRAW REPORT//
// perpage=10,page=1,searchby=kd_brg,dateFrom=2020-01-01,dateTo=2020-07-01,lokasi=LK%2F0001
export const FetchWithdrawReport = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `withdraw?page=${page}`;
        if(where!==''){
            url+=`${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setWithdrawReport(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchWithdrawConfig = (data='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `withdraw/config/${data}`;
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setWithdrawConfig(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}