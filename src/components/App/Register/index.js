import React, { Component } from 'react';
import {connect} from 'react-redux';
import imgThumb from 'assets/kahve.png';
import Swal from 'sweetalert2';
import { storeRegister } from '../../../redux/actions/register/register.action';
import { Link } from 'react-router-dom';
import Preloader from 'Preloader'
import { HEADERS } from '../../../redux/actions/_constants';
import ReCAPTCHA from 'react-google-recaptcha';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            id_card:"",
            kd_referral:this.props.match.params.id,
            name:"",
            wallet_address:"",
            email:"",
            password:"",
            password_confirm:"",
            logo: imgThumb,
            width:'100px',
            captcha: false,
            error:{
                id_card:"",
                kd_refferal:"",
                name:"",
                wallet_address:"",
                email:"",
                password:"",
                password_confirm:"",
            }
        }
        this.onValid = this.onValid.bind(this)
        this.handleChange = this.handleChange.bind(this)
        if (this.props.match.params.id===''||this.props.match.params.id===undefined||this.props.match.params.id===null) {
            this.props.history.push({
                pathname: '/',
                data: this.props.config
            })
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
        this.initFetch(false)
    }

    initFetch(check){
        fetch(HEADERS.URL + `site/get`)
        .then(res => res.json())
        .then(
            (data) => {
                document.title = `${data.result.title===undefined?'Kahve - Register':data.result.title}`;
                this.setState({
                    logo: data.result.logo,
                    width:data.result.width
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        let err = this.state.error;
        err = Object.assign({}, err, {[column]:""});
        this.setState({ [column]: value, error: err });
    }
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            id_card:"-",
            selfie:"-",
            kd_referral:this.state.kd_referral===''?this.props.match.params.id:this.state.kd_referral,
            wallet_address:this.state.wallet_address,
        };
        let err = this.state.error;
        if(parsedata['kd_referral']===''||parsedata['kd_referral']===undefined){
            err = Object.assign({}, err, {kd_referral:"Referral cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['name']===''||parsedata['name']===undefined){
            err = Object.assign({}, err, {name:"Name cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['wallet_address']===''||parsedata['wallet_address']===undefined){
            err = Object.assign({}, err, {wallet_address:"Wallet address cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['email']===''||parsedata['email']===undefined){
            err = Object.assign({}, err, {email:"Email cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['password']===''||parsedata['password']===undefined){
            err = Object.assign({}, err, {password:"Password cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['password']!==this.state.password_confirm){
            err = Object.assign({}, err, {password_confirm:"Password confirm not match!"});
            this.setState({error: err});
        }
        else if(!this.state.captcha){
            Swal.fire(
                'Captcha is required!',
                'Checked captcha first!',
                'error'
            )
        }
        else{
            let timerInterval;
            Swal.fire({
                title: 'Wait a moment',
                html: 'is sending data to the server',
                timer: 1000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                                b.textContent = Swal.getTimerLeft()
                            }
                        }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    this.props.dispatch(storeRegister(parsedata,(arr)=>this.props.history.push(arr)));
                }
            })
        }
    }
    
    onValid(value){
        // console.log("Captcha value:", value);
        this.setState({captcha:value!==''?true:false})
    }
    render() {
        return (
            <div className="container h-100" style={{marginTop:'4rem',marginBottom:'4rem'}}>
                {!this.props.isProses?
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
                                <h4 className="font-18 mb-30">Create a free account.</h4>
                                <form>
                                <div className="form-group" style={{display:'none'}}>
                                    <label htmlFor="id_card">ID Card</label>
                                    <input className="form-control" type="text" id="id_card" name="id_card" value={this.state.id_card} onChange={(e) => this.handleChange(e)} placeholder="Enter ID Card" required />
                                    <div className="invalid-feedback"
                                        style={this.state.error.id_card !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.id_card}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="kd_referral">Refferal</label>
                                    <input className="form-control" type="text" id="kd_referral" name="kd_referral" value={this.state.kd_referral} onChange={(e) => this.handleChange(e)} placeholder="Enter your Refferal" required readOnly />
                                    <div className="invalid-feedback"
                                        style={this.state.error.kd_referral !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.kd_referral}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Enter your Name" required />
                                    <div className="invalid-feedback"
                                        style={this.state.error.name !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="wallet_address">Wallet Address</label>
                                    <input className="form-control" type="text" id="wallet_address" name="wallet_address" value={this.state.wallet_address} onChange={(e) => this.handleChange(e)} placeholder="Enter Wallet Address" required />
                                    <div className="invalid-feedback"
                                        style={this.state.error.wallet_address !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.wallet_address}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} required placeholder="Enter your Email" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.email !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" type="password" required id="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} placeholder="Enter your Password" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.password !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.password}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password_confirm">Confirm Password</label>
                                    <input className="form-control" type="password" required id="password_confirm" name="password_confirm" value={this.state.password_confirm} onChange={(e) => this.handleChange(e)} placeholder="Enter your Confirm Password" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.password_confirm !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.password_confirm}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <ReCAPTCHA
                                        size="normal"
                                        sitekey="6LcgvOAZAAAAAAIpET5hHV_DikIuZ_YxVKAeOR3h"
                                        onChange={this.onValid}
                                    />
                                </div>
                                <div className="form-group mb-0 mt-15">
                                    <button className="btn btn-primary btn-block" type="submit" onClick={(e)=>this.handleSubmit(e)}>Sign Up</button>
                                </div>
                                <div className="text-center mt-15"><span className="mr-2 font-13 font-weight-bold">Already have an account?</span><Link to={'/'} className="font-13 font-weight-bold" >Sign in</Link></div>
                                </form>
                            </div> {/* end card-body */}
                            </div>
                            {/* end card */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                :
                <Preloader/>
                }
                </div>
        );
    }
}

const mapStateToProps = (state) =>{
    
    return{
        isProses:state.registerReducer===undefined?false:state.registerReducer.isLoading,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Register);