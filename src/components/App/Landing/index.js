import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import imgThumb from 'assets/kahve.png';
// import './login.css'
import {loginUser} from 'redux/actions/authActions';
import Swal from 'sweetalert2'
import {HEADERS} from 'redux/actions/_constants'
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
            logo: imgThumb,
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
        fetch(HEADERS.URL + `site/get`)
        .then(res => res.json())
        .then(
            (data) => {
                localStorage.setItem("logos",data.result.logo)
                localStorage.setItem("site_title", data.result.site_name)
                localStorage.setItem("site_url", data.result.site_url)
                document.title = `${data.result.title===undefined?'Kahve - Log In':data.result.title}`;
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
        const {email,password, errors} = this.state;
        return (
        <div className="container h-100 login-area" style={{marginTop:'8rem'}}>
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12">
                {/* Middle Box */}
                <div className="middle-box">
                    <div className="card">
                    <div className="card-body p-4">
                        <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="xs-d-none mb-50-xs break-320-576-none">
                            <img src={this.state.logo} alt="kahve" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* Logo */}
                            <h4 className="font-18 mb-30">Welcome back! Log in to your account.</h4>
                            <form action="#">
                            <div className="form-group">
                                <label className="float-left" htmlFor="emailaddress">Email address</label>
                                <input className="form-control" type="email" id="emailaddress" name="email" value={email} onChange={this.handleInputChange} required placeholder="Enter your email" />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <label className="float-left" htmlFor="password">Password</label>
                                <input className="form-control" type="password" required id="password" name="password" value={password} onChange={this.handleInputChange} placeholder="Enter your password" />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <div className="form-group mb-0">
                                <button className="btn btn-primary btn-block" type="submit" onClick={this.submitHandelar}> Log In </button>
                            </div>
                            </form>
                        </div> {/* end card-body */}
                        </div>
                        {/* end card */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
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