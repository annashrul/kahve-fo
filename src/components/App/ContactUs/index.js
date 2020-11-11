import React, { Component } from 'react';
import {connect} from 'react-redux';
import imgThumb from 'assets/contact_us.svg';
import Swal from 'sweetalert2';
import { storeContact } from '../../../redux/actions/site.action';
import Preloader from 'Preloader'
import Layout from 'components/Layout'
import SliderCaptcha from '@slider-captcha/react'
import { HEADERS } from '../../../redux/actions/_constants';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:"",
            email:"",
            title:"",
            message:"",
            captcha: false,
            error:{
                name:"",
                email:"",
                title:"",
                message:"",
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.onValid = this.onValid.bind(this)
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
        this.setState({
            name:this.props.auth.user.name,
            email:this.props.auth.user.email,
        })
    }

    // componentDidUpdate(prevState){
    //     if(this.props.auth.user.email===prevState.auth.user.email){
    //         this.setState({
    //             email:this.props.auth.user.email,
    //         })
    //     }
    // }
    componentWillReceiveProps(nextProps){
        if (nextProps.auth.user) {
            if (nextProps.auth.user!==this.props.auth.user){

                if (nextProps.auth.user.email!==undefined){
                    this.setState({
                        name:nextProps.auth.user.name,
                        email:nextProps.auth.user.email,
                    })
                }
            }
        }
    }

    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        let err = this.state.error;
        err = Object.assign({}, err, {[column]:""});
        this.setState({ 
            [column]: value,
            error: err
        });
        
    }
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            name:this.state.name,
            email:this.state.email,
            title:this.state.title,
            message:this.state.message,
        };
        let err = this.state.error;
        if(parsedata['name']===''||parsedata['name']===undefined){
            err = Object.assign({}, err, {name:"Name cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['email']===''||parsedata['email']===undefined){
            err = Object.assign({}, err, {email:"Email cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['title']===''||parsedata['title']===undefined){
            err = Object.assign({}, err, {title:"Title cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['message']===''||parsedata['message']===undefined){
            err = Object.assign({}, err, {message:"Message cannot be null"});
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
                    this.props.dispatch(storeContact(parsedata,(arr)=>this.props.history.push(arr)));
                }
            })
        }
    }
    
    onValid(value){
        // console.log("Captcha value:", value);
        this.setState({captcha:value!==''?true:false})
    }

    verifiedCallback(token) {
        console.log('Captcha token: ' + token);
    }
    render() {
        return (
            <Layout page="Faq">
                {!this.props.isProses?
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-12">
                    {/* Middle Box */}
                    <div className="middle-box">
                        <div className="card">
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                            <div className="col-md-6">
                                <h1 className="mb-50">Contact Us</h1>
                                <form className="login-area">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input className="form-control" type="text" readOnly id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Enter your Name" required />
                                    <div className="invalid-feedback"
                                        style={this.state.error.name !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input className="form-control" type="email" readOnly id="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} required placeholder="Enter your Email" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.email !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input className="form-control" type="title" required id="title" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} placeholder="Enter your Title" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.title !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.title}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    {/* <input className="form-control" type="message" required id="message" name="message" value={this.state.message} onChange={(e) => this.handleChange(e)} placeholder="Enter your Password" /> */}
                                    <textarea className="form-control" rows="4" required id="message" name="message" style={{height:'auto'}} value={this.state.message} onChange={(e) => this.handleChange(e)} >
                                    </textarea>
                                    <div className="invalid-feedback"
                                        style={this.state.error.message !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.message}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <SliderCaptcha
                                        create={HEADERS.URL+"auth/captcha/get"}
                                        verify={HEADERS.URL+"auth/captcha"}
                                        callback={this.onValid}
                                        text={{anchor:'I\'m not robot',challenge:'Slide to continue'}}
                                        />
                                </div>
                                <div className="form-group mb-0 mt-15">
                                    <button className="btn btn-primary btn-block" type="submit" onClick={(e)=>this.handleSubmit(e)}>SEND</button>
                                </div>
                                </form>
                            </div> {/* end card-body */}
                            <div className="col-md-6">
                                <div className="xs-d-none mb-50-xs break-320-576-none">
                                <img src={imgThumb} alt="kahve" />
                                </div>
                            </div>
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
            </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    
    return{
        isProses:state.siteReducer===undefined?false:state.siteReducer.isLoading,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Contact);