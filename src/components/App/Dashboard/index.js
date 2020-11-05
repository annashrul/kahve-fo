import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout';
import {FetchDashboard} from 'redux/actions/dashboard/dashboard.action'
import 'bootstrap-daterangepicker/daterangepicker.css';

import Cards from './src/Cards'
import Slot from './src/slot'
import Info from './src/Info'
import Box from './src/box'
import Simulator from './src/simulator'
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
            referral_profit:0,
            number_of_month:0,
            contract:0,
            monthly_profit:0,
            recent_wd:[],
            referral_user:[]
        };
        this.setMiner = this.setMiner.bind(this)
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
            if (nextProps.data !== this.props.data) {
                // const newData = [];
                // if (nextProps.data.miner!==undefined){
                //     newData.push(nextProps.data.miner)
                // }
                this.setState({
                    assets: nextProps.data.assets,
                    reff: nextProps.data.reff,
                    saldo: nextProps.data.saldo,
                    slot: nextProps.data.slot,
                    withdraw: nextProps.data.withdraw,
                    referral_profit: nextProps.data.referral_profit,
                    number_of_month: nextProps.data.number_of_month,
                    recent_wd: nextProps.data.recent_wd,
                    referral_user: nextProps.data.referral_user,
                    contract: nextProps.data.contract,
                    monthly_profit: nextProps.data.monthly_profit,
                })
            }
        }
    }

    componentWillMount(){
        this.props.dispatch(FetchDashboard(this.props.auth.user.reff));

    }

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');
        clearInterval(this.intervalID);
    }

    setMiner(miner){
        let balance=0;
        for(let i=0;i<miner.length;i++){
            balance+=parseFloat(miner[i].balance);
        }
        const minerData =[{
            coin:'BTC',
            total:balance
        }];
        this.setState({
            data:minerData
        })
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
                    <Cards title="Referral" data={this.state.reff} isobj={false} link={window.location.origin.toString()+'/register/'+this.props.auth.user.reff} 
                    referral_profit={this.state.referral_profit} icon="fa fa-users text-primary"/>
                    <Cards title="Your Balance" data={this.state.data} isobj={true} miner={true} icon="fa fa-dollar text-primary"/>
                    <Cards title="Total Investment You Made" data={this.state.assets} isobj={true} icon="fa fa-money text-primary"/>                    
                    <Cards title="Total Payment You Received" data={this.state.withdraw} isobj={true} icon="fa fa-credit-card text-primary"/>                    
                </div>
                {/* <div className="row">
                    <Balance/>
                </div> */}
                <div className="row">
                    <Slot title="Mining Slot"
                        data={this.state.slot}
                        number_of_month={this.state.number_of_month}
                        counter={this.setMiner}/>
                </div>
                <div className="row">
                    <Box title="5 Last Withdraw" isWd={true} data={this.state.recent_wd}/>
                    <Box title="Referral" isWd={false} data={this.state.referral_user}/>
                </div>
                <div className="row">
                    <Simulator 
                        title="Mining Calculator" 
                        number_of_month={this.state.number_of_month}
                        contract={this.state.contract}
                        monthly_profit={this.state.monthly_profit}
                    />
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