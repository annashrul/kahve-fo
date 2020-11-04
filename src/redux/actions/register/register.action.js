import {
    REGISTER,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'

export function setLoadingPost(load) {
    return {
        type: REGISTER.LOADING,
        load
    }
}
export function setRegister(data = []) {
    return {
        type: REGISTER.SUCCESS,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: REGISTER.FAILED,
        data
    }
}

export const storeRegister = (data,param) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `auth/register`;
        axios.post(url, data)
            .then(function (response) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Register Successfull',
                    type: 'info',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result)=>{
                    param({
                        pathname: '/',
                    })
                });
            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                Swal.fire({
                    title: 'Failed',
                    type: 'error',
                    text: error.response===undefined?"Something when wrong!":error.response.data.msg,
                });

                if (error.response) {
                    
                }
            })
    }
}