import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css'

import Header from './src/header'
import Footer from './src/footer'
import Swal from 'sweetalert2';
import { storeWd } from '../../../redux/actions/site.action';
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: '',
            id_user_destination: '',
            errors:{
            },
         };
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
    }
    getFaviconEl() {
        return document.getElementById("favicon");
    }
    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        this.setState({ [column]: value });
    }
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            amount: this.state.amount,
            id_user_destination: this.state.id_user_destination,
            coin_type: "c2f9fc02-5193-466e-acd8-8d69069d3fbb",
        };

        let timerInterval;
        Swal.fire({
            title: 'Tunggu Sebentar',
            html: 'data sedang dikirim ke server',
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
                this.props.dispatch(storeWd(parsedata));
            }
        })
    }

    render() {
        return (
        <div>
            <Header/>
            <div className="rvbody">
                <div className="page-content">
                    <div className="revolution-slider-area slider-bg-1 slider-bg-2 rslide" data-background="#3d088e">
                        <div className="revolution-slider slider-bg-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2">
                                    <div className="contact-form contact-form--1 inner pt--250 pb--150 text-center">
                                        <h4 className="heading heading-h4 text-light">YOU'RE EARNING BALANCE 0.02352 BTC (DUMMY)</h4>
                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input type="text" placeholder="MIN" />
                                            </div>
                                            <div className="col-lg-6">
                                                <input type="text" placeholder="MAX" />
                                            </div>
                                        </div>
                                        <br/>
                                        <form action="#">
                                            <div className="row">
                                            <div className="col-lg-12">
                                                <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} placeholder="AMOUNT" />
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <input type="text" name="id_user_destination" value={this.state.id_user_destination} onChange={this.handleChange} placeholder="Your address Wallet Destination" />
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-desc">#note</div>
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <input type="submit" VALUE="CONFIRM TRANSFER" onClick={this.handleSubmit} />
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
            </div>
            <Footer/>
        </div>
        );
    }
}



const mapStateToProps = (state) =>{
    return{
        isLoading: state.siteReducer.isLoading
    }
}

export default connect(mapStateToProps)(Transfer);