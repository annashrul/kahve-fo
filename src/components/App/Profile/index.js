import React, { Component } from 'react';
import {connect} from 'react-redux';
import imgCover from 'assets/cover.jpg';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Preloader from 'helper'
import Layout from 'components/Layout'
import { FetchUserDetail } from '../../../redux/actions/profile/profile.action';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            id_card:"",
            kd_referral:this.props.match.params.id,
            name:"",
            wallet_address:"",
            email:"",
            password:"",
            error:{
                id_card:"",
                kd_refferal:"",
                name:"",
                wallet_address:"",
                email:"",
                password:"",
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount(){
        console.log(this.props.auth)
        this.props.dispatch(FetchUserDetail(this.props.auth.user.id))
    }

    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        this.setState({ [column]: value });
    }
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            id_card:"-",
            selfie:"-",
            kd_referral:this.state.kd_referral===''?this.props.match.params.id:this.state.kd_referral,
            wallet_address:this.state.wallet_address,
        };
        let err = this.state.error;
        if(parsedata['kd_referral']===''||parsedata['kd_referral']===undefined){
            err = Object.assign({}, err, {kd_referral:"Referral cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['name']===''||parsedata['name']===undefined){
            err = Object.assign({}, err, {name:"Name cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['wallet_address']===''||parsedata['wallet_address']===undefined){
            err = Object.assign({}, err, {wallet_address:"Wallet address cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['email']===''||parsedata['email']===undefined){
            err = Object.assign({}, err, {email:"Email cannot be null"});
            this.setState({error: err});
        }
        else if(parsedata['password']===''||parsedata['password']===undefined){
            err = Object.assign({}, err, {password:"Password cannot be null"});
            this.setState({error: err});
        }
        else{
            let timerInterval;
            Swal.fire({
                title: 'Wait a moment',
                html: 'is sending data to the server',
                timer: 1000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                        if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                                b.textContent = Swal.getTimerLeft()
                            }
                        }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    // this.props.dispatch(storeProfile(parsedata,(arr)=>this.props.history.push(arr)));
                }
            })
        }
    }
    render() {
        return (
            <Layout page="Profile">
                {!this.props.isProses?
                    <div className="row">
                        <div className="col-12">
                            <div className="profile-header-area mb-130">
                            <div className="card border-none">
                                <div className="thumb bg-img height-300" style={{backgroundImage: `url(${imgCover})`}}>
                                </div>
                            </div>
                            <div className="profile-heading-text">
                                <div className="d-md-flex align-items-center justify-content-between">
                                <div className="info d-flex align-items-center mb-30-xs">
                                    <div className="profile-heading-thumb mr-3">
                                    <img className="border-radius-50" src="img/member-img/3.png" alt />
                                    </div>
                                    <div className="text">
                                    <h4>Jhon Smith</h4>
                                    <p className="mb-0">Laravel Developer</p>
                                    </div>
                                </div>
                                <div className="store">
                                    <div className="row mb-30-xs">
                                    <div className="col-4 text-center">
                                        <span className="text-primary font-18 font-weight-bold mb-0">84</span>
                                        <span className="d-block text-dark font-weight-bold">Images</span>
                                    </div>
                                    <div className="col-4 text-center">
                                        <span className="mb-0 font-18 font-weight-bold text-danger">9</span>
                                        <span className="d-block text-dark font-weight-bold">Products</span>
                                    </div>
                                    <div className="col-4 text-center">
                                        <span className="text-success font-18 font-weight-bold mb-0">1589</span>
                                        <span className="d-block text-dark font-weight-bold">Followers</span>
                                    </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-rounded btn-primary">
                                    <span className="btn-inner--icon"><i className="zmdi zmdi-edit" /></span>
                                    <span className="btn-inner--text">Edit</span>
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                :
                <Preloader/>
                }
                </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state.profileReducer)
    return{
        isProses:state.profileReducer===undefined?false:state.profileReducer.isLoading,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Profile);