import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import { FetchWithdrawReport } from '../../../redux/actions/withdraw/withdraw.action';
import Form from './src/Form';
import List from './src/List';
import { FetchCoinType } from '../../../redux/actions/coin/coin.action';

class Withdraw extends Component {

    componentWillMount(){
        this.props.dispatch(FetchWithdrawReport(1,''))
        this.props.dispatch(FetchCoinType(1,'',999))
    }
    render() {
        return (
            <Layout page="Withdraw">
                <div className="row">
                <div className="col-md-6 mb-4">
                    <Form/>
                </div>
                <div className="col-md-6 mb-4">
                    <List/>
                </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Withdraw);