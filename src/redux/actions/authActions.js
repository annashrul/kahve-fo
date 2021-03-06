import { AUTH} from './_constants';
import axios from 'axios';
import Swal from 'sweetalert2'
import {store,destroy} from "components/model/app.model";
import setAuthToken from '../../utils/setAuthToken';
import {HEADERS} from "./_constants";

// user register

// Login user -- get token
export const loginUser = (userData) =>
    async dispatch =>{
        destroy('sess');
        Swal.fire({
            title: 'Please Wait.',
            html: 'Checking your account.',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })

        axios.post(HEADERS.URL+'auth', userData)
        .then(res=>{
            setTimeout(
            function () {
                Swal.close() 
                // save token to localStorage
                const token = res.data.result.token;
                localStorage.setItem('kahvebit', btoa(token));
                localStorage.setItem('kahvelink', btoa(res.data.result.kd_referral));
                store('sess', {
                    id: res.data.result.id,
                    token: res.data.result.token,
                    name: res.data.result.name,
                    email: res.data.result.email,
                    status: res.data.result.status,
                    reff: res.data.result.kd_referral,
                    foto: res.data.result.foto,
                    created_at: res.data.result.created_at
                })
            
                // Set token to Auth Header 
                setAuthToken(token);
                // decode token to set user data
                dispatch(setCurrentUser(res.data.result));
                dispatch(setLoggedin(true));
            },800)

        }).catch(err =>{
            Swal.close() 
            if (err.message === 'Network Error') {
                 Swal.fire(
                     'Server cannot connected!.',
                     'Check your internet connection.',
                     'error'
                 )
            }else{
                Swal.fire(
                    err.response===undefined?"something when wrong!":err.response.data.msg,
                    '',
                    'error'
                )
                dispatch({type: AUTH.GET_ERRORS, payload: err.response===undefined?"something when wrong!":err.response.data.msg})

            }
            
        });
    }

export const confirmEmail = (registid) =>
    async dispatch => {
        destroy('sess');
        Swal.fire({
            title: 'Please Wait..',
            html: 'Verifying your account.',
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })

        axios.post(HEADERS.URL + 'auth/confirm/'+registid, {})
            .then(res => {
                setTimeout(
                    function () {
                        Swal.close()
                        // save token to localStorage
                        Swal.fire(
                            '.',
                            '',
                            'success'
                        )

                        Swal.fire({
                            title: 'Your account has been verified!',
                            text: "Please login to continue using kahve.",
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Okay!'
                        }).then((result) => {
                            if (result.value) {
                                window.location.href = "/";
                            }
                        })
                    }, 800)

            }).catch(err => {
                Swal.close()
                if (err.message === 'Network Error') {
                    Swal.fire(
                        'Server cannot connected!.',
                        'Check your internet connection.',
                        'error'
                    )
                } else {
                    Swal.fire(
                        err.response === undefined ? "something when wrong!" : err.response.data.msg,
                        '',
                        'error'
                    )
                    dispatch({
                        type: AUTH.GET_ERRORS,
                        payload: err.response === undefined ? "something when wrong!" : err.response.data.msg
                    })

                }

            });
    }
// set user data
export const setCurrentUser = decoded =>{
    return{
        type: AUTH.SET_CURRENT_USER,
        payload: decoded
    }
}

//set loggedin
export const setLoggedin = decoded => {
    return {
        type: AUTH.SET_LOGGED_USER,
        payload: decoded
    }
}
// set logout user
export const logoutUser = () => dispatch =>{
    // remove jwtToken from localStorage
    // localStorage.removeItem('jwtToken');
    destroy('sess')
    dispatch(setLoggedin(false));
    localStorage.clear()

    // remove auth header for future request
    setAuthToken(false);
    // Set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}));
    window.location.reload(true);
}

