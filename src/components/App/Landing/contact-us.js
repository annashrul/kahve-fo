import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './style.css'
import {storeContact} from 'redux/actions/site.action';

import Header from './src/header'
import Footer from './src/footer'
import Swal from 'sweetalert2';
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            title: '',
            message: '',
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
            name: this.state.name,
            email: this.state.email,
            title: this.state.title,
            message: this.state.message,
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
                this.props.dispatch(storeContact(parsedata));
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
                            {/* STart Contact Us Modern */}
                            <div className="contact-modern pt--220 pb--120 pb_md--80 pb_sm--80">
                                <div className="container">
                                    <div className="row align-items-end">
                                    <div className="col-lg-6 col-12 pr--50 ptb-md--80 ptb-sm--80">
                                        <div className="contact-modern bg_color--18 space_dec--100 pt--60 pb--120 pl--60 pr--60">
                                        <div className="inner">
                                            <h2 className="heading heading-h2 text-white">Help for Somethink?</h2>
                                            <div className="classic-address text-left mt--60">
                                            <h4 className="heading heading-h4 text-white">Visit our studio at</h4>
                                            <div className="desc mt--15">
                                                <p className="bk_pra line-height-2-22 text-white">2005 Stokes Isle Apt. 896, <br />
                                                Venaville 10010,
                                                USA</p>
                                            </div>
                                            </div>
                                            <div className="classic-address text-left mt--60">
                                            <h4 className="heading heading-h4 text-white">Message us</h4>
                                            <div className="desc mt--15 mb--30">
                                                <p className="bk_pra line-height-2-22 text-white">info@yourdomain.com <br /> (+68) 120034509</p>
                                            </div>
                                            <div className="social-share social--transparent text-white">
                                                <a href="!#"><i className="fab fa-facebook" /></a>
                                                <a href="!#"><i className="fab fa-twitter" /></a>
                                                <a href="!#"><i className="fab fa-instagram" /></a>
                                                <a href="!#"><i className="fab fa-dribbble" /></a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12 pl--50">
                                        <h3 className="heading heading-h4 text-white">Contact Us</h3>
                                        <br/>
                                        <div className="contact-form">
                                        <form id="contact-form">
                                            <div className="row">
                                            <div className="col-lg-12">
                                                <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Name *" />
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email *" />
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <input name="title" type="text" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <textarea name="message" value={this.state.message} onChange={this.handleChange} placeholder="Your message" defaultValue={""} />
                                            </div>
                                            <div className="col-lg-12 mt--30">
                                                <input type="button" defaultValue="Send message" onClick={this.handleSubmit}/>
                                                <p className="form-messege" />
                                            </div>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* End Contact Us Modern */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        isLoading: state.siteReducer.isLoading
    }
}

export default connect(mapStateToProps)(Contact);