import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout';
import moment from 'moment';
import {toRp} from "helper";
import {FetchDashboard} from 'redux/actions/dashboard/dashboard.action'
import 'bootstrap-daterangepicker/daterangepicker.css';
import socketIOClient from "socket.io-client";
import {HEADERS} from 'redux/actions/_constants'

import Cards from './src/Cards'
import Slot from './src/slot'
import Balance from './src/balance'
import Info from './src/Info'
import Monthly from './src/monthlySlot'
// const socket = socketIOClient(HEADERS.URL);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets:[],
            reff:0,
            saldo:[],
            slot:[],
            withdraw:[],
            data:[],
            referral_profit:0
        };

    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.auth.user) {
            console.log("AUTH", nextProps.auth.user);
            if (nextProps.auth.user!==this.props.auth.user){

                if (nextProps.auth.user.reff!==undefined){
                    this.props.dispatch(FetchDashboard(nextProps.auth.user.reff));
                }
            }
        }
        if (nextProps.data!==undefined){
            console.log(nextProps.data);
            const newData = [];
            const hours = moment().format("H");
            if (nextProps.data.saldo!==undefined){
                for (let i = 0; i < nextProps.data.saldo.length; i++) {
                    newData.push({
                        total: parseFloat(nextProps.data.saldo[i].total)+(parseFloat(hours) * (parseFloat(nextProps.data.saldo[i].total) / 86400)),
                        coin: nextProps.data.saldo[i].coin
                    })
                }
            }
            this.setState({
                assets: nextProps.data.assets,
                reff: nextProps.data.reff,
                saldo: nextProps.data.saldo,
                slot: nextProps.data.slot,
                withdraw: nextProps.data.withdraw,
                data: newData,
                referral_profit: nextProps.data.referral_profit
            })
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
        }
    }

    componentWillMount(){
        // console.log(this.props.auth);
    }

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');
        clearInterval(this.intervalID);

    }

    tick() {
        const newData = [];
        for (let i = 0; i < this.state.data.length; i++) {
            newData.push({
                total: parseFloat(this.state.data[i].total) + (parseFloat(this.state.saldo[i].total) / 86400),
                coin: this.state.data[i].coin
            })
        }
        this.setState({
            data: newData
        });
    }


    render() {
        return (
            <Layout page="Dashboard">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Dashboard</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    <Info data={this.state.saldo}/>
                </div>


                {/* Dashboard Widget Area */}
                <div className="row">
                    <Cards title="Referral" data={this.state.reff} isobj={false} link={window.location.origin.toString()+'/signup?reff='+this.props.auth.user.reff} 
                    referral_profit={this.state.referral_profit} icon="fa fa-users text-primary"/>
                    <Cards title="Your Balance" data={this.state.data} isobj={true} miner={true} icon="fa fa-dollar text-primary"/>
                    <Cards title="Total Investment You Made" data={this.state.assets} isobj={true} icon="fa fa-money text-primary"/>                    
                    <Cards title="Total Payment You Received" data={this.state.withdraw} isobj={true} icon="fa fa-credit-card text-primary"/>                    
                </div>
                {/* <div className="row">
                    <Balance/>
                </div> */}
                <div className="row">
                    <Slot title="Mining Slot" data={this.state.slot}/>
                </div>
                <div className="row">
                    {
                        this.state.slot!==undefined?
                            this.state.slot.map(item=>{
                                return(
                                    <Monthly title={'Slot '+item.slot_no} symbol={item.symbol} status={item.status} data={item.monthly}/>
                                )
                            })
                        :''
                    }
                </div>
                
        </Layout>
       
        );
    }
}
// Dashboard.propTypes = {
//     auth: PropTypes.object
// }

const mapStateToProps = (state) =>{
     return{
       auth: state.auth,
       data: state.dashboardReducer.data
     }
}
export default connect(mapStateToProps)(Dashboard);