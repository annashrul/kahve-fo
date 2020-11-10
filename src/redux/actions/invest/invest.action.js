import {
    INVEST,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'



export function setLoading(load) {
    return {
        type: INVEST.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: INVEST.LOADING,
        load
    }
}
export function setInvest(data = []) {
    return {
        type: INVEST.SUCCESS,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: INVEST.FAILED,
        data
    }
}

export function setInvestReport(data=[]){
    return {type:INVEST.SUCCESS_REPORT,data}
}
export function setInvestConfig(data=[]){
    return {type:INVEST.SUCCESS_CONFIG,data}
}

export const storeInvest = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `topup`;
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
                //     localStorage.removeItem("nota_pembelian_invest");
                //     localStorage.removeItem("jenis_trx_invest");
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
export const storeAppove = (id,data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `topup/${id}`;
        axios.put(url, data)
            .then(function (response) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Upload Success!',
                    type: 'info',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result)=>{
                    window.location.reload();
                });
            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Failed',
                    type: 'error',
                    text: "Something when wrong with your request",
                });
                if (error.response) {
                    
                }
            })
    }
}


//FILTER INVEST REPORT//
// perpage=10,page=1,searchby=kd_brg,dateFrom=2020-01-01,dateTo=2020-07-01,lokasi=LK%2F0001
export const FetchInvestReport = (page=1,where='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `topup?page=${page}`;
        if(where!==''){
            url+=`${where}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setInvestReport(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}
export const FetchInvestConfig = ()=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `topup/config`;
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setInvestConfig(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}