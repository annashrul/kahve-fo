import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import { FetchWithdrawReport } from '../../../redux/actions/withdraw/withdraw.action';
import Form from './src/Form';
import List from './src/List';

class Withdraw extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.dispatch(FetchWithdrawReport(1,''))
    }
    render() {
        return (
            <Layout page="Dashboard">
                <div className="row">
                <div className="col-6">
                    <Form/>
                </div>
                <div className="col-6">
                    <List/>
                </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Withdraw);