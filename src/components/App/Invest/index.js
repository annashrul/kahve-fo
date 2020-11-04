import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import { FetchInvestConfig, FetchInvestReport } from '../../../redux/actions/invest/invest.action';
import Form from './src/Form';
import List from './src/List';
import { FetchCoinType } from '../../../redux/actions/coin/coin.action';

class Invest extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.dispatch(FetchInvestReport(1,''))
        this.props.dispatch(FetchCoinType(1,'',999))
        this.props.dispatch(FetchInvestConfig())
    }
    render() {
        return (
            <Layout page="Invest">
                <div className="row">
                <div className="col-md-6 mb-4">
                    <Form config={this.props.config}/>
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
        config:state.investReducer.data_config,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Invest);