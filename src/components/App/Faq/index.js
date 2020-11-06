import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import { FetchFaq } from '../../../redux/actions/site.action';
import Card from './src/Card';

class Faq extends Component {

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    componentWillMount(){
        this.props.dispatch(FetchFaq(1,''))
    }
    render() {
        return (
            <Layout page="Faq">
                <h3>Frequelty Asked Questions</h3>
                <br></br>
                <Card/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Faq);