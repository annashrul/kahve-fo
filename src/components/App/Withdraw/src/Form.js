import React, {Component} from 'react'
import {storeWd} from 'redux/actions/site.action';
import Swal from 'sweetalert2';
import Select from 'react-select';
import connect from "react-redux/es/connect/connect";
import { FetchWithdrawConfig } from '../../../../redux/actions/withdraw/withdraw.action';
import Axios from 'axios';
import { HEADERS } from '../../../../redux/actions/_constants';
import Preloader from 'Preloader'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: "",
            id_wallet: "",
            coin_type: "",
            coin_type_data: [],
            config:[],
            verif:false,
            myPassword:'',
            isLoading:false,
            isWrong:false,
            isOkay:false,
            error:{
                amount: "",
                id_wallet: "",
                coin_type: "",
                myPassword:'',
            },
         };
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.HandleChangeCoin = this.HandleChangeCoin.bind(this)
        //  this.focus = this.focus.bind(this);
        this.textInput = React.createRef();
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({config:nextProps.config})
        if (nextProps.coin.data) {
            let c = []
            let coin = nextProps.coin.data;
            if(coin!==undefined){
                coin.sort((a, b) => a.symbol.localeCompare(b.symbol)).map((i) => {
                    c.push({
                        value: i.id,
                        label: i.title+'|'+i.symbol,
                        symbol: i.symbol,
                    });
                    return true;
                })
                this.setState({
                    coin_type: this.state.coin_type===''?{"value":coin[0].id,"label":coin[0].title+" | "+coin[0].symbol}:this.state.coin_type,
                    coin_type_data: c,
                })
            }
        }
        // if(value>this.state.config.active_balance){
        //     value=this.state.config.active_balance;
        //     this.setState({isWrong:true});
        //     if(this.state.config.active_balance>this.state.config.max_wd) {
        //         value=this.state.config.max_wd;
        //     }
        // } else if(value<this.state.config.min_wd) {
        //     value=this.state.config.min_wd;
        //     this.setState({isWrong:true});
        // } else{
        //     this.setState({isWrong:false});
        // }
    }
    // componentDidMount(){
    //     this.nameInput.focus();
    // }
    componentWillMount(){
        if(this.props.config.active_balance<this.props.config.min_wd){
            this.setState({amount:parseFloat(this.props.config.active_balance).toFixed(8),isWrong:true,isOkay:false});
        } else if(this.props.config.active_balance>this.props.config.max_wd){
            this.setState({amount:parseFloat(this.props.config.max_wd).toFixed(8),isOkay:true})
        } else if(this.props.config.active_balance<this.props.config.max_wd){
            if(this.props.config.active_balance<this.props.config.min_wd){
                this.setState({amount:parseFloat(this.props.config.active_balance).toFixed(8),isWrong:true,isOkay:false});
            } else {
                this.setState({amount:parseFloat(this.props.config.active_balance).toFixed(8),isOkay:true,isWrong:false})
            }
        } else {
            this.setState({amount:parseFloat(this.props.config.active_balance),isWrong:false,isOkay:false})
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.coin !== prevProps.coin) {
            this.props.dispatch(FetchWithdrawConfig(this.props.coin.data[0].symbol))
        }
        if(prevProps.config.active_balance!==this.props.config.active_balance){
            if(this.state.config.active_balance<this.state.config.min_wd){
                this.setState({amount:parseFloat(this.state.config.active_balance).toFixed(8),isWrong:true,isOkay:false});
            } else if(this.state.config.active_balance>this.state.config.max_wd){
                this.setState({amount:parseFloat(this.state.config.max_wd).toFixed(8),isOkay:true})
            } else if(this.state.config.active_balance<this.state.config.max_wd){
                if(this.state.config.active_balance<this.state.config.min_wd){
                    this.setState({amount:parseFloat(this.state.config.active_balance).toFixed(8),isWrong:true,isOkay:false});
                } else {
                    this.setState({amount:parseFloat(this.state.config.active_balance).toFixed(8),isOkay:true,isWrong:false})
                }
            } else {
                this.setState({amount:parseFloat(this.state.config.active_balance),isWrong:false,isOkay:false})
            }
            
        }
    }
    HandleChangeCoin(cn){
        this.props.dispatch(FetchWithdrawConfig(String(cn.label).split('|')[1]))
        let err = Object.assign({}, this.state.error, {
            coin_type: ""
        });
        this.setState({
            coin_type:cn,
            error: err
        })
    }

    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        let err = Object.assign({}, this.state.error, {
            [column]: ""
        });
        this.setState({ [column]: value, error:err });
    }
    HandleReset(e){
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                window.location.reload();
            }
        })
    }
    handleSubmit(e){
        e.preventDefault();
        
        if(!this.state.verif){
            this.setState({verif:true})
            if (this.searchInput) {
                setTimeout(() => {
        
                    this.searchInput.focus();
        
                }, 100);
            }
        } else if(this.state.myPassword==='') {
            let err = Object.assign({}, this.state.error, {
                myPassword: "Password cannot be null!"
            });
            this.setState({error:err})
        } else if(!this.state.config.isActive) {
            let days = this.state.config.schedule
            let time = this.state.config.schedule_time
            Swal.fire({
                title: 'Withdrawals can only do the days below!',
                html:`<div class="card"><div class="card-body"><h5>${days}</h5><h5>${time}</h5></div></div>`,
                icon: 'info',
                confirmButtonColor: '#ff9800',
                confirmButtonText: 'Okay',
            }).then((result) => {
      
            })
        } else {
            this.setState({isLoading:true})
            let userData = {}
            userData['email'] = this.props.auth.user.email
            userData['password'] = this.state.myPassword
            Axios.post(HEADERS.URL+'auth', userData)
            .then(res=>{
                if(!this.state.isWrong) this.postWd()
                this.setState({isLoading:false})
            }).catch(err =>{
                this.setState({isLoading:false})
                if (err.message === 'Network Error') {
                    Swal.fire(
                        'Server cannot connected!.',
                        'Check your internet connection.',
                        'error'
                    )
                }else{
                    Swal.fire(
                        err.response===undefined?"something when wrong!":err.response.data.msg,
                        '',
                        'error'
                    )
                }
            
        });
        }
    }

    postWd(){
        let parsedata=[];
        parsedata = {
            amount: this.state.amount,
            id_wallet: this.state.config.wallet.id === undefined ? '-' : this.state.config.wallet.id,
            coin_type: this.state.coin_type.value === undefined ? 'BTC' : this.state.coin_type.value,
        };

        let timerInterval;
        Swal.fire({
            title: 'Please wait',
            html: 'data is sending to server',
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
                this.props.dispatch(storeWd(parsedata));
            }
        })
    }

    render(){
        
        
        return(
            <div className="card">
                {!this.state.isLoading?
                <div>
                    <div className="card-header bg-transparent">
                        <h3>Withdraw</h3>
                    </div>
                    {this.state.config.isActive?
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="control-label font-12">
                                            Coin Type
                                        </label>
                                        <Select
                                            options={this.state.coin_type_data}
                                            placeholder="Coin type"
                                            onChange={this.HandleChangeCoin}
                                            value={this.state.coin_type}

                                        />
                                        <div className="invalid-feedback"
                                                style={this.state.error.coin_type !== "" ? {display: 'block'} : {display: 'none'}}>
                                            {this.state.error.coin_type}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">Total Active Balance</div>
                                        <div className="col-6">{parseFloat(this.state.config.active_balance===undefined?0:this.state.config.active_balance).toFixed(8)}</div>
                                        <div className="col-6">Number of payments</div>
                                        <div className="col-6">{this.state.config.num_trx===undefined?0:this.state.config.num_trx}</div>
                                    </div>
                                </div>
                                
                                <div className="col-md-12" style={{display:this.state.verif?'none':''}}>
                                    <div className="card mt-3">
                                        <div className="card-body">
                                            <h4><strong>Important</strong></h4>
                                            <ul>
                                                <li>* You can only 1x withdraw/24h</li>
                                            </ul>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    {/* {(this.state.amount>this.state.config.active_balance)?(this.state.config.active_balance>this.state.config.max_wd)?true:false:(this.state.amount<this.state.config.min_wd)? */}
                                                    {this.state.isWrong?
                                                        <div class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show mt-2" role="alert">
                                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                <span aria-hidden="true">×</span>
                                                            </button>
                                                            The Amount field must contain a number greater than {parseFloat(this.state.config.min_wd===undefined?0:this.state.config.min_wd).toFixed(8)} and cannot exceed a value of {this.state.config.max_wd}
                                                        </div>:''
                                                    }
                                                    <label className="control-label font-12">
                                                        Amount
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength="10"
                                                        readOnly={true}
                                                        className="form-control"
                                                        id="amount"
                                                        name="amount"
                                                        // onChange={(e) => this.handleChange(e)}
                                                        // onBlur={(e) => this.handleChange(e,'blur')}
                                                        value={this.state.amount}
                                                    />
                                                    <div className="invalid-feedback"
                                                            style={this.state.error.amount !== "" ? {display: 'block'} : {display: 'none'}}>
                                                        {this.state.error.amount}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label font-12">
                                                        Your Wallet Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        readOnly={true}
                                                        className="form-control"
                                                        id="id_wallet"
                                                        name="id_wallet"
                                                        // onChange={(e) => this.handleChange(e)}
                                                        value={this.state.config.length<=0?'-':this.state.config.wallet.address}
                                                    />
                                                    <div className="invalid-feedback"
                                                            style={this.state.error.id_wallet !== "" ? {display: 'block'} : {display: 'none'}}>
                                                        {this.state.error.id_wallet}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12" style={{display:this.state.verif?'':'none'}}>
                                    <div className="card mt-3">
                                        <div className="card-body login-area">
                                            <h4><strong>Input your password</strong></h4>
                                            <div className="form-group">
                                                <input
                                                    ref={(input) => { this.searchInput = input; }}
                                                    autoFocus 
                                                    type="password"
                                                    readOnly={false}
                                                    className="form-control"
                                                    id="myPassword"
                                                    name="myPassword"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.myPassword}
                                                />
                                                <div className="invalid-feedback"
                                                        style={this.state.error.myPassword !== "" ? {display: 'block'} : {display: 'none'}}>
                                                    {this.state.error.myPassword}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div class="form-group">
                                        <label>&nbsp;</label>
                                        <button type="button" className="btn btn-primary btn-block" disabled={!this.state.isOkay} onClick={(e) => this.handleSubmit(e)}>PROCESS</button>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div class="form-group">
                                        <label>&nbsp;</label>
                                        <button type="button" className="btn btn-danger btn-block" onClick={(e) => this.HandleReset(e)}>RESET</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        :
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ribbon-wrapper card">
                                        <div className="ribbon ribbon-info">INFORMATION</div>
                                        <div class="alert alert-danger text-center" role="alert">
                                            <h4 className="text-light">Withdrawals can only be made on the schedule below!</h4>
                                            <br/>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5>{this.state.config.schedule}</h5>
                                                    <h5>{this.state.config.schedule_time}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <Preloader/>
            }
            </div>
            
        )
    }
}


const mapStateToPropsCreateItem = (state) => {
    
    return {
    config:state.withdrawReducer.data_config,
    coin:state.coinReducer.data_type,
    auth:state.auth,
}};

export default (connect(mapStateToPropsCreateItem)(Form));