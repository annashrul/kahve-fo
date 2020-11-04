import {
    PROFILE,
    HEADERS
} from "../_constants"
import axios from "axios"
import Swal from 'sweetalert2'

export function setLoading(load) {
    return {
        type: PROFILE.LOADING,
        load
    }
}
export function setProfile(data = []) {
    return {
        type: PROFILE.SUCCESS,
        data
    }
}
export function setUserDetail(data = []) {
    return {
        type: PROFILE.DETAIL,
        data
    }
}

export function setFailed(data = []) {
    return {
        type: PROFILE.FAILED,
        data
    }
}

export const updateProfile = (data,param,id) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        const url = HEADERS.URL + `user/${id}`;
        axios.put(url, data)
            .then(function (response) {
                dispatch(setLoading(false));
                Swal.fire({
                    title: 'Profile Successfull',
                    type: 'info',
                    showCancelButton: false,
                    showConfirmButton: true
                }).then((result)=>{
                    param({
                        pathname: '/profile',
                    })
                });
            })
            .catch(function (error) {
                dispatch(setLoading(false));
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


export const FetchUserDetail = (id)=>{
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = `user/${id}`;
        
        axios.get(HEADERS.URL+`${url}`)
            .then(function(response){
                const data = response.data;
                dispatch(setUserDetail(data));
                dispatch(setLoading(false));
            }).catch(function(error){
            
        })
    }
}