import React, { Component } from 'react';
import {confirmEmail} from 'redux/actions/authActions';
import {connect} from 'react-redux';

// const mainStyle = {
//     height: '100%',
//     display: 'grid'
// };
// const childStyle={
//     margin: 'auto'
// }
class Confirmation extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            link: atob(document.getElementById("hellyeah").value)+"images/logo.png",
            email:"",
            idregist:""
        }
        this.verifyEmail = this.verifyEmail.bind(this)
    }
    componentWillMount() {
        document.title = `Confirm Your Registration!`;
    }
    componentDidMount(){
        const data = (atob(this.props.match.params.id)).split('|')
        this.setState({
            email:data[0],
            idregist:data[1]
        })
    }
    verifyEmail(e){
        e.preventDefault();
        this.props.dispatch(confirmEmail(btoa(this.state.idregist)))

    }
    render() {
        return (
            <div className="error-page-area">
            {/* Error Content */}
            <div className="error-content text-center">
                {/* Error Thumb */}
                <div className="error-thumb">
                <img src={this.state.link} alt="" />
                </div>
                <h2>Confirm Your Registration</h2>
                <p>Please verify <i style={{fontWeight:"100"}}>{this.state.email}</i> is your email address <br/>by clicking on verify button below.</p>
                <button className="btn btn-primary mt-10 btn-lg" style={{width:'100%',fontSize:"1.2em!important"}} onClick={(e)=>this.verifyEmail(e)}>Verify Email</button>
            </div>
            </div>

        )
    }
};

export default connect()(Confirmation);