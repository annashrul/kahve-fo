import React, { Component } from 'react';
import {connect} from 'react-redux';
import imgCover from 'assets/cover.jpg';
import Swal from 'sweetalert2';
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Preloader from 'Preloader'
import Layout from 'components/Layout'
import { FetchUserDetail } from '../../../redux/actions/profile/profile.action';
import getImg from 'assets/default.png';
import moment from 'moment'
import ModalProfile from '../modals/profile/form_profile'
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
        this.props.dispatch(FetchUserDetail(this.props.auth.user.id))
    }
    componentDidUpdate(prevState) {
        if (this.props.auth!==prevState.auth) {
            this.props.dispatch(FetchUserDetail(this.props.auth.user.id))
        }
    }

    handleEdit = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formProfile"));
    };
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
        
        console.log(this.props.auth)
        const {
            active_balance,
            active_slot,
            address,
            bep,
            created_at,
            email,
            foto,
            id,
            id_card,
            investment,
            isadmin,
            kd_referral,
            name,
            number_of_month,
            payment,
            reff,
            selfie,
            slot,
            status,
            updated_at,
            upline_reff,
        } = this.props.detail

        const centerStyle = {verticalAlign: "middle", textAlign: "center"};
        const leftStyle = {verticalAlign: "middle", textAlign: "left"};
        const rightStyle = {verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
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
                                    <img className="border-radius-50" src={foto} alt onError={(e)=>{e.target.onerror = null; e.target.src=`${getImg}`}} />
                                    </div>
                                    <div className="text">
                                    <h4>{name}</h4>
                                    <p className="mb-0">{email}</p>
                                    </div>
                                </div>
                                <div className="store">
                                    <div className="row mb-30-xs">
                                    <div className="col-6 text-center text-nowrap">
                                        <span className="text-primary font-18 font-weight-bold mb-0">{active_slot}</span>
                                        <span className="d-block text-dark font-weight-bold">Active Slot</span>
                                    </div>
                                    <div className="col-6 text-center text-nowrap">
                                        <span className="mb-0 font-18 font-weight-bold text-danger">{reff}</span>
                                        <span className="d-block text-dark font-weight-bold">Total Referral</span>
                                    </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-rounded btn-primary" onClick={(e)=>this.handleEdit(e)}>
                                    <span className="btn-inner--icon"><i className="zmdi zmdi-edit" /></span>
                                    <span className="btn-inner--text">&nbsp;Edit</span>
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="col-xl-6 box-margin">
                            <div className="card box-margin">
                                <div className="card-body">
                                <div className="profile-thumb-contact text-center">
                                    <div className="profile--tumb">
                                    <img src={foto} alt="" onError={(e)=>{e.target.onerror = null; e.target.src=`${getImg}`}}  />
                                    </div>
                                    <h5 className="mt-15">{name}</h5>
                                    <p className="mb-0">{email}</p>
                                </div>
                                <div className="personal-information mt-30">
                                    <div className="name-text">
                                    <h6 className="font-14"><span className="text-muted">Active Balace :</span> {active_balance}</h6>
                                    <h6 className="font-14"><span className="text-muted">Investment :</span> {investment}</h6>
                                    <h6 className="font-14"><span className="text-muted">Payment :</span> {payment}</h6>
                                    <h6 className="font-14"><span className="text-muted">Referral Code :</span> {kd_referral}</h6>
                                    <h6 className="font-14"><span className="text-muted">Address :</span> {address}</h6>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="card box-margin">
                                <div className="card-header bg-white border-0">
                                    <div className="row">
                                    <div className="col-12">
                                        <h6 className="card-title mb-0">My Slot</h6>
                                    </div>
                                    </div>
                                </div>
                                <div style={{overflowX:'auto'}}>
                                    <table className="table align-items-center">
                                    <thead>
                                        <tr>
                                        <th style={centerStyle}>SLOT</th>
                                        <th style={centerStyle}>START DATE</th>
                                        <th style={centerStyle}>DAILY EARNING</th>
                                        <th style={centerStyle}>AMOUNT</th>
                                        <th style={centerStyle}>MONTHLY PROFIT</th>
                                        <th style={centerStyle}>CONTRACT</th>
                                        </tr>
                                    </thead>
                                    <tbody className="list">
                                        {
                                            (
                                                typeof slot === 'object' ?
                                                    slot.map((v,i)=>{
                                                        return(
                                                            <tr>
                                                                <td style={centerStyle}>{v.slot_no}</td>
                                                                <td style={rightStyle}>{moment(v.start_date).format('YYYY-MM-DD')}</td>
                                                                <td style={leftStyle}>{v.daily_earning}</td>
                                                                <td style={leftStyle}>{v.amount}</td>
                                                                <td style={leftStyle}>{v.monthly_profit}</td>
                                                                <td style={centerStyle}>{v.contract}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    : "No data."
                                            )
                                        }
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-md-6 col-xl-3">
                            <div className="card box-margin">
                                <div className="card-header bg-transparent">Your selfie picture</div>
                                <div className="card-body">
                                <a href={selfie} target="_blank" data-lightbox="roadtrip"><img src={selfie} className="img-fluid mb-30" alt onError={(e)=>{e.target.onerror = null; e.target.src=`${getImg}`}}/></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3">
                            <div className="card box-margin">
                                <div className="card-header bg-transparent">Your ID Card</div>
                                <div className="card-body">
                                <a href={id_card} target="_blank" data-lightbox="roadtrip"><img src={id_card} className="img-fluid mb-30" alt onError={(e)=>{e.target.onerror = null; e.target.src=`${getImg}`}}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <Preloader/>
                }
                <ModalProfile detail={this.props.detail} auth={this.props.auth} param={(arr)=>this.props.history.push(arr)}/>
                </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state.profileReducer)
    return{
        isProses:state.profileReducer===undefined?false:state.profileReducer.isLoading,
        auth: state.auth,
        detail: state.profileReducer.data_detail,
    }
}

export default connect(mapStateToProps)(Profile);