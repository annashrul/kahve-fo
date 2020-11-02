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
                            <div className="inner pt--250 pb--150 text-center">
                                <h5 className="heading heading-h5 text-white">KAHVE</h5>
                                <div className="bkseparator--15" />
                                <h1 className="heading heading-h1 text-white font-120">Join and Get <br /> Your Profit</h1>
                            </div>
                            <div className="text-center">
                                <div className="basic-modern-dots white-dots">
                                <div className="dot first-circle" />
                                <div className="dot second-circle" />
                                <div className="dot third-circle" />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* End Slider Area */}

                    <div className="brook-about-area pt--130 pt_md--80 pt_sm--60 rslide bg-shape" data-background="#5e0891">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="join-content text-center max-width--990">
                                <h6 className="heading heading-h6 font-blod text-white letter-spacing-3">JOIN US</h6>
                                <div className="bkseparator--10" />
                                    <div className="login-form-wrapper">
                                    <form className="sn-form sn-form-boxed">
                                        <div className="sn-form-inner">
                                        <div className="single-input">
                                            <label htmlFor="login-form-email">Username or email address *</label>
                                            <input type="text" readOnly={disableButton}
                                            className={email !== '' ? 'input100 has-val' : 'input100'}
                                            placeholder="Username"
                                            name="email"
                                            value={email}
                                            onChange={this.handleInputChange} id="login-form-email" />
                                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                        </div>
                                        <div className="single-input">
                                            <label htmlFor="login-form-password">Password *</label>
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
                    {/* End About Area */}

                    {/* Start Pricing Plans */}
                    <div className="brook-about-area pt--130 pb--130 pt_md--80 pt_sm--60 rslide bg-shape" data-background="#5e0891">
                        <div className="container">
                            <div className="row">
                                {/* Start Single Pricing Table */}
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="procing-wrap pt--40 move-up wow">
                                    <div className="procing-box">
                                        <div className="header">
                                        <div className="price">
                                            <h3 className="currenct">Packet</h3>
                                            <h3 className="heading headin-h3">#1</h3>
                                        </div>
                                        </div>
                                        <div className="content">
                                        <h5 className="heading heading-h5">Bronze</h5>
                                        {/* Start Single List */}
                                        <div className="bk-list--2">
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Contract 5 Month</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Min Deposit 0,024 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Max Deposit 0,24 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">You Have 5 Slots</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Profit 25%/Your Deposit/Month</h6>
                                            </div>
                                            </div>
                                        </div>
                                        {/* End Single List */}
                                        </div>
                                        <div className="footer mt--40">
                                        <a className="brook-btn bk-btn-dark btn-sd-size btn-rounded" href="#">Sign up</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* End Single Pricing Table */}
                                {/* Start Single Pricing Table */}
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="procing-wrap pt--40 move-up wow">
                                    <div className="procing-box">
                                        <div className="header">
                                        <div className="price">
                                            <h3 className="currenct">Packet</h3>
                                            <h3 className="heading headin-h3">#2</h3>
                                        </div>
                                        </div>
                                        <div className="content">
                                        <h5 className="heading heading-h5">Gold</h5>
                                        {/* Start Single List */}
                                        <div className="bk-list--2">
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Contract 5 Month</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Min Deposit 0,024 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Max Deposit 0,24 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">You Have 5 Slots</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Profit 25%/Your Deposit/Month</h6>
                                            </div>
                                            </div>
                                        </div>
                                        {/* End Single List */}
                                        </div>
                                        <div className="footer mt--40">
                                        <a className="brook-btn bk-btn-dark btn-sd-size btn-rounded" href="#">Sign up</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* End Single Pricing Table */}
                                {/* Start Single Pricing Table */}
                                <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                                    <div className="procing-wrap pt--40 move-up wow">
                                    <div className="procing-box">
                                        <div className="header">
                                        <div className="price">
                                            <h3 className="currenct">Packet</h3>
                                            <h3 className="heading headin-h3">#3</h3>
                                        </div>
                                        </div>
                                        <div className="content">
                                        <h5 className="heading heading-h5">Platinum</h5>
                                        {/* Start Single List */}
                                        <div className="bk-list--2">
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Contract 5 Month</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Min Deposit 0,024 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Max Deposit 0,24 Bitcoin</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">You Have 5 Slots</h6>
                                            </div>
                                            </div>
                                            <div className="list-header with-ckeck item-available">
                                            <div className="marker" />
                                            <div className="title-wrap">
                                                <h6 className="heading heading-h5">Profit 25%/Your Deposit/Month</h6>
                                            </div>
                                            </div>
                                        </div>
                                        {/* End Single List */}
                                        </div>
                                        <div className="footer mt--40">
                                        <a className="brook-btn bk-btn-dark btn-sd-size btn-rounded" href="#">Sign up</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* End Single Pricing Table */}
                                </div>
                            </div>
                        </div>

                    {/* End Pricing Plans */}
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