import {
    COIN,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'



export function setLoading(load) {
    return {
        type: COIN.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: COIN.LOADING,
        load
    }
}
export function setCoin(data = []) {
    return {
        type: COIN.SUCCESS,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: COIN.FAILED,
        data
    }
}

export function setCoinType(data=[]){
    return {type:COIN.SUCCESS_TYPE,data}
}

export const storeCoin = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `coin`;
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
                //     localStorage.removeItem("nota_pembelian_coin");
                //     localStorage.removeItem("jenis_trx_coin");
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

export const FetchCoinType = (page=1,where='',perpage='')=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `coin_type?page=${page}`;
        if(where!==''){
            url+=`${where}`
        }
        if(perpage!==''){
            url+=`&perpage=${perpage}`
        }
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                
                dispatch(setCoinType(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}