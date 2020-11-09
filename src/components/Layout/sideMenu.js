import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state ={
            isSetting:false,
            isMasterdata: false,
        }
        this.changeMenu = this.changeMenu.bind(this);
    }

    changeMenu(e,param){
        e.preventDefault();
        if(param === 'masterdata'){
            this.setState({
                isMasterdata : !this.state.isMasterdata
            });
        }
        this.forceUpdate();
        
    }
   
    componentDidMount(){
        // this.getProps(this.props);
      
        const path = this.props.location.pathname;
        if(path==='/barang' || path==='/brand'){
            this.setState({
                isMasterdata:true
            })
        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Apakah anda yakin akan logout aplikasi?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.value) {
                this.props.logoutUser();
            }
        })
    }
    render() {
        const path = this.props.location.pathname;
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/dashboard'?"active":''}><a href="/"> <i className="fa fa-dashboard" /><span> Dashboard</span></a></li>
                    {/* DASHBOARD MODUL END */}
                    
                    <li  className={path==='/invest'?"active":''}><Link to="/invest"> <i className="fa fa-btc" /><span> Invest</span></Link></li>
                    <li  className={path==='/withdraw'?"active":''}><Link to="/withdraw"> <i className="fa fa-exchange" /><span> Withdraw</span></Link></li>
                    <li  className={path==='/transfer'?"active":''}><Link to="/transfer"> <i className="fa fa-send" /><span> Transfer</span></Link></li>
                    <li  className={path==='/history'?"active":''}><Link to="/history"> <i className="fa fa-history" /><span> History</span></Link></li>
                    
                    <li  className={path==='/Contact'?"active":''}><Link to="/Contact"> <i className="zmdi zmdi-account-box-mail" /><span> Contact Us</span></Link></li>
                    <li  className={path==='/faq'?"active":''}><Link to="/faq"> <i className="fa fa-comments-o" /><span> Faq</span></Link></li>

                    {/* LOGOUT MODUL START */}
                    <li><a href={null} style={{cursor:'pointer'}} className="text-dark" onClick={(event)=>this.handleLogout(event)}> <i className="fa fa-chain-broken" /><span> Logout</span></a></li>
                    {/* LOGOUT MODUL END */}
                </ul>
            </nav>
        )
    }
}
SideMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser})(SideMenu))