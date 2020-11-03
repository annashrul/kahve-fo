import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BgAuth from "assets/logo.png"
import './style.css'
import {loginUser} from 'redux/actions/authActions';
import Swal from 'sweetalert2'
import {HEADERS} from 'redux/actions/_constants'

import Header from './src/header'
import Footer from './src/footer'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            // disableButton:false,
            // server_price:0,
            // acc_name:"",
            // acc_number:0,
            errors:{
            },
            logo: BgAuth,
            width:'100px'
         };
    }
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    componentDidMount (){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        this.initFetch(false);
    }

    initFetch(check){
        fetch(HEADERS.URL + `site/logo`)
        .then(res => res.json())
        .then(
            (data) => {
                localStorage.setItem("logos",data.result.logo)
                localStorage.setItem("site_title", data.result.title)
                document.title = `${data.result.title}`;
                this.setState({
                    logo: data.result.logo,
                    width:data.result.width
                })
                const favicon = this.getFaviconEl(); // Accessing favicon element
                favicon.href = data.result.fav_icon;
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    componentWillReceiveProps = (nextProps)=>{
        this.getProps(nextProps)
     }
     componentWillMount(){
        this.getProps(this.props);
     }
     getProps(param){
         if(param.auth.isAuthenticated){
             param.history.push('/');
         }else{
             if(param.errors){
                 this.setState({errors: param.errors})
             }
         }
     }

    submitHandelar = (event)=>{
        event.preventDefault();
        const {email,password} = this.state;
        if(email!==''&&password!==''){
            const user = {
                email: email,
                password: password
            }
            this.props.loginUser(user);
        }else{
            Swal.fire(
                'Isi Username dan Password Terlebih Dahulu! ',
                'Lengkapi form untuk melanjutkan.',
                'error'
            )
        }
    }

    handleInputChange =(event)=> {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    render() {
        const {email,password, errors,disableButton} = this.state;
        return (
        <div>
            <Header/>

            <div className="rvbody">
                <div className="page-content">
            
                    {/* STart Slider Area */}
                    <div className="revolution-slider-area slider-bg-1 slider-bg-2 rslide" data-background="#3d088e">
                    <div className="revolution-slider slider-bg-2">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="join-content pt--250 pb--250 text-center max-width--990">
                                <h6 className="heading heading-h6 font-blod text-white letter-spacing-3">SIGN UP</h6>
                                <div className="bkseparator--10" />
                                    <div className="login-form-wrapper">
                                    <form className="sn-form sn-form-boxed">
                                        <div className="sn-form-inner">
                                        <div className="single-input">
                                            <label htmlFor="login-form-email" className="text-white">Email address *</label>
                                            <input type="text" readOnly={disableButton}
                                            className={email !== '' ? 'input100 has-val' : 'input100'}
                                            placeholder="Username"
                                            name="email"
                                            value={email}
                                            onChange={this.handleInputChange} id="login-form-email" />
                                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                        </div>
                                        <div className="single-input">
                                            <label htmlFor="login-form-password" className="text-white">Password *</label>
                                            <input readOnly={disableButton}
                                            type="password"
                                            className={password !== '' ? 'input100 has-val' : 'input100'}
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={this.handleInputChange}
                                            id="login-form-password" />
                                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                        </div>
                                        <div className="single-input">
                                            <button className="mr-3" onClick={this.submitHandelar}>
                                            <span>Login</span>
                                            </button>
                                        </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* End Slider Area */}
                </div>
            </div>
            <Footer/>
        </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = ({auth, errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}

export default connect(mapStateToProps,{loginUser})(Login);