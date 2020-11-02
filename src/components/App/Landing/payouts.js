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
                    <div className="revolution-slider-area slider-bg-1 slider-bg-3 rslide">
                    <div className="revolution-slider slider-bg-2">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="inner pt--250 pb--150 text-center">
                                <h4 className="heading heading-h4 text-white">Start earning now</h4>
                                <div className="bkseparator--15" />
                                <p className="heading text-white">We are experts in the field of trading and investment of Dogecoin, and we're want to share our best practice with EVERYONE! Dogecoin market capitalization growing everyday. Don't miss your chance to earn on this wave. Join our team now!</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* End Slider Area */}

                    <div className="brook-about-area pt--60 pt_md--80 pt_sm--60 rslide bg_color--1">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            {/* Cart Table */}
                                <h4 className="heading heading-h4">RECENT WITHDRAW</h4>
                                <div className="table-responsive mb--40">
                                <table className="table">
                                    <thead>
                                    <tr style={{textAlign:'center'}}>
                                        <th className="pro-thumbnail">Date</th>
                                        <th className="pro-title">Amount</th>
                                        <th className="pro-price">Address</th>
                                        <th className="pro-quantity">TRXID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign:'center'}}>2020-11-01 08:05:31</td>
                                        <td style={{textAlign:'center'}}>102.00000000 Đ</td>
                                        <td style={{textAlign:'center'}}>D8iU9oVKrJdyBUUt7gfb<b>XXXX</b></td>
                                        <td style={{textAlign:'center'}}>db1adacded56bfcba6c7<b>XXXX</b></td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    {/* End About Area */}

                    <div className="brook-about-area pt--60 pt_md--80 pt_sm--60 rslide bg_color--1">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            {/* Cart Table */}
                                <h4 className="heading heading-h4">RECENT TOPUP</h4>
                                <div className="table-responsive mb--40">
                                <table className="table">
                                    <thead>
                                    <tr style={{textAlign:'center'}}>
                                        <th className="pro-thumbnail">Date</th>
                                        <th className="pro-title">Amount</th>
                                        <th className="pro-price">Address</th>
                                        <th className="pro-quantity">TRXID</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign:'center'}}>2020-11-01 08:05:31</td>
                                        <td style={{textAlign:'center'}}>102.00000000 Đ</td>
                                        <td style={{textAlign:'center'}}>D8iU9oVKrJdyBUUt7gfb<b>XXXX</b></td>
                                        <td style={{textAlign:'center'}}>db1adacded56bfcba6c7<b>XXXX</b></td>
                                    </tr>
                                    </tbody>
                                </table>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    {/* End About Area */}
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