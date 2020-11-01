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
            withdraw:[]
        };

    }

    componentDidMount(){
        this.props.dispatch(FetchDashboard());
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log();
        console.log("nextprops",nextProps.data);
        if (nextProps.data!==undefined){
            this.setState({
                assets: nextProps.data.assets,
                reff: nextProps.data.reff,
                saldo: nextProps.data.saldo,
                slot: nextProps.data.slot,
                withdraw: nextProps.data.withdraw,
            })
        }
    }

    refreshData(start=null,end=null,loc=null){
        // socket.emit('get_dashboard', {
        //     datefrom: start!==null?start:this.state.startDate,
        //     dateto: end!==null?end:this.state.endDate,
        //     location: loc!==null?loc:this.state.location
        // })
    }

    componentWillMount(){
        this.refreshData();
    }

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');
    }

    onChange = date => this.setState({ date })

    handleEvent = (event, picker) => {
        // end:  2020-07-02T16:59:59.999Z
        const awal = picker.startDate._d.toISOString().substring(0,10);
        const akhir = picker.endDate._d.toISOString().substring(0,10);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
        this.refreshData(awal,akhir,null);
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.refreshData();
    }

    render() {
        console.log("FROM STATE",this.state.saldo);
        return (
            <Layout page="Dashboard">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                        <h5 className="mb-0 font-weight-bold">Dashboard</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    {/* <Info handleSubmit={this.handleSubmit}/> */}
                </div>


                {/* Dashboard Widget Area */}
                <div className="row">
                    <Cards title="Active Balance" data={this.state.saldo} isobj={true} icon="fa fa-area-chart text-primary"/>                    
                    <Cards title="Assets" data={this.state.assets} isobj={true} icon="fa fa-area-chart text-primary"/>                    
                    <Cards title="Assets" data={this.state.reff} isobj={false} icon="fa fa-area-chart text-primary"/>                    
                    <Cards title="Assets" data={this.state.withdraw} isobj={true} icon="fa fa-area-chart text-primary"/>                    
                </div>
                <div className="row">
                    <Balance/>
                </div>
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