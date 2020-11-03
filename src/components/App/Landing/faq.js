import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './style.css'
import {FetchFaq} from 'redux/actions/site.action';

import Preloader from "Preloader";
import Header from './src/header'
import Footer from './src/footer'
class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            errors:{
            },
         };
    }
    
    componentWillMount(){
        this.props.dispatch(FetchFaq());
    }
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    render() {
        console.log("aaaaaaaaaaa",this.props.faq)
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
                            <div className="inner pt--250 pb--250 text-center">
                                <h3 className="heading heading-h5 text-white">FAQ</h3>
                                <div className="bkseparator--15" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* End Slider Area */}
                    {/* Start List Wrapper */}
                        <div className="brook-list-wrapper ptb--100 ptb-md--80 ptb-sm--60  bg_color--1">
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                {/* Start Single List */}{
                                !this.props.isLoading?(
                                    typeof this.props.faq==='object'? this.props.faq.length>0?
                                        this.props.faq.map((v,i)=>{
                                            return (
                                                <div className="bk-list move-up wow">
                                                    <div className="list-header">
                                                        <div className="marker" />
                                                        <div className="title-wrap">
                                                        <h5 className="heading heading-h5">{v.question}</h5>
                                                        <p className="bk_pra">{v.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : <div className="col-md-12 mb-2">No faq found.</div> : <div className="col-md-12 mb-2">No faq found.</div>
                                        ):<Preloader/>
                                    }
                                {/* End Single List */}
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* End List Wrapper */}

                </div>
            </div>
            <Footer/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        faq: state.siteReducer.data_faq.data,
        isLoading: state.siteReducer.isLoading,
    }
}
export default connect(mapStateToProps)(Faq);