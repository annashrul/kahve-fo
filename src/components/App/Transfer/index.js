import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import { FetchTransferReport } from '../../../redux/actions/transfer/transfer.action';
import Form from './src/Form';
import Card from './src/Card';
import { FetchCoinType } from '../../../redux/actions/coin/coin.action';

class Transfer extends Component {

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    componentWillMount(){
        this.props.dispatch(FetchTransferReport(1,''))
        this.props.dispatch(FetchCoinType(1,'',999))
    }
    render() {
        return (
            <Layout page="Transfer">
                <div className="row">
                <div className="col-md-6 mb-4">
                    <Form/>
                </div>
                <div className="col-md-6 mb-4">
                    <Card/>
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

export default connect(mapStateToProps)(Transfer);