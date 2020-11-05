import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import {FetchTransactionReport } from 'redux/actions/transaction/transaction.action';
import List from './src/List';

class TransactionHistory extends Component {
    componentDidMount(){
        this.props.dispatch(FetchTransactionReport(1,'', this.props.auth.user.id))
    }
    componentDidUpdate(prevState) {
        if (this.props.auth!==prevState.auth) {
            this.props.dispatch(FetchTransactionReport(1,'', this.props.auth.user.id))
        }
    }
    render() {
        return (
            <Layout page="Transaction">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <List auth={this.props.auth}/>
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

export default connect(mapStateToProps)(TransactionHistory);