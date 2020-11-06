import {
    TRANSFER,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'



export function setLoading(load) {
    return {
        type: TRANSFER.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: TRANSFER.LOADING,
        load
    }
}
export function setTransfer(data = []) {
    return {
        type: TRANSFER.SUCCESS,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: TRANSFER.FAILED,
        data
    }
}

export function setTransferReport(data=[]){
    return {type:TRANSFER.SUCCESS_REPORT,data}
}
export function setTransferConfig(data=[]){
    return {type:TRANSFER.SUCCESS_CONFIG,data}
}

export const storeTransfer = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `transaction/transfer`;
        axios.post(url, data)
            .then(function (response) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Transaction successfully!.',
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
                //     text:"Transaction successfully!",
                // }).then((result)=>{
                //     localStorage.removeItem("nota_pembelian_transfer");
                //     localStorage.removeItem("jenis_trx_transfer");
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


//FILTER TRANSFER REPORT//
// perpage=10,page=1,searchby=kd_brg,dateFrom=2020-01-01,dateTo=2020-07-01,lokasi=LK%2F0001
export const FetchTransferReport = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `transaction?page=${page}`;
        if(where!==''){
            url+=`${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setTransferReport(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchTransferConfig = (data='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `transaction/config/${data}`;
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setTransferConfig(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}