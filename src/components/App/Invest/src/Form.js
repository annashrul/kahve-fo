import React, {Component} from 'react'
import {storeWd} from 'redux/actions/site.action';
import Swal from 'sweetalert2';
import Select from 'react-select';
import connect from "react-redux/es/connect/connect";
import { CustomInput } from 'reactstrap';
import { storeInvest } from '../../../../redux/actions/invest/invest.action';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: "",
            id_slot: "",
            coin_type: "",
            coin_type_data: [],
            config:[],
            aggre:false,
            error:{
                amount: "",
                id_slot: "",
                coin_type: "",
            },
         };
         this.handleChange = this.handleChange.bind(this)
         this.handleSlider = this.handleSlider.bind(this)
         this.handleAgree = this.handleAgree.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.HandleChangeCoin = this.HandleChangeCoin.bind(this)
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
                    coin_type: this.state.coin_type===''?{"value":coin[0].id,"label":coin[0].title+"|"+coin[0].symbol}:this.state.coin_type,
                    coin_type_data: c,
                })
            }
        }
    }
    // componentDidUpdate(prevProps) {
    //     console.log("gggggggggg",prevProps)
    //     console.log("gggggggggg2",prevProps.coin)
    //     console.log("gggggggggg3",this.props.coin)
    //     if (this.props.coin !== prevProps.coin) {
    //         this.props.dispatch(FetchInvestConfig(this.props.coin.data[0].symbol))
    //     }
    //   }
    HandleChangeCoin(cn){
        // this.props.dispatch(FetchInvestConfig(String(cn.label).split('|')[1]))
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
        this.setState({ [column]: value });
    }
    handleSlider = (e) => {
        console.log("sliderrrrrrrrrrr",e)
        this.setState({ amount: e.target.value });
    }
    handleAgree = (e) => {
        e.preventDefault();
        this.setState({ aggre: !this.state.aggre });
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
        let parsedata=[];
        parsedata = {
            amount: this.state.amount,
            id_slot: this.state.config.slot.id,
            coin_type: this.state.config.coin.id===undefined?"c2f9fc02-5193-466e-acd8-8d69069d3fbb":this.state.config.coin.id,
        };

        let timerInterval;
        Swal.fire({
            title: 'Tunggu Sebentar',
            html: 'data sedang dikirim ke server',
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
                this.props.dispatch(storeInvest(parsedata));
            }
        })
    }

    render(){
        console.log("ccccccccc",this.state.coin_type)
        console.log("ddddddddddddd",this.props.config)
        return(
            <div className="card">
                <div className="card-header bg-transparent">
                    <h3>Invest Available for Slot Number #{this.props.config.slot===undefined?0:this.props.config.slot.slot_no}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" style={{display:this.state.aggre?'none':''}}>
                            <div className="ribbon-wrapper card">
                                <div className="ribbon ribbon-warning">IMPORTANT!</div>
                                <p className="ribbon-content">Pay attention to the following 5 points so that investment can be processed immediately:</p>
                                <ul>
                                    <li>* Prepare proof of your transaction, eg: photos or screenshots</li>
                                    <li>* Make sure you transfer to the correct address</li>
                                    <li>* Minimum Invest {this.props.config.min +" "+ this.props.config.coin}</li>
                                    <li>* Maximum Invest {this.props.config.max +" "+ this.props.config.coin}</li>
                                    <li>* We are not responsible for your mistakes if you write the wrong transfer address</li>
                                </ul>
                                <div class="form-group">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-warning btn-lg btn-block text-light" onClick={(e) => this.handleAgree(e)}>I agree, continue investment</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-12" style={{display:this.state.aggre?'':'none'}}>
                            <div className="card mt-3">
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label font-12">
                                                Amount
                                            </label>
                                            <CustomInput type="range" min={this.props.config.min} max={this.props.config.max} step="0.000000000000000001" value={this.state.amount} onChange={(e)=>this.handleSlider(e)} />
                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    min={this.props.config.min}
                                                    max={this.props.config.max}
                                                    step="0.0001"
                                                    readOnly={false}
                                                    className="form-control"
                                                    id="amount"
                                                    name="amount"
                                                    onChange={(e) => this.handleChange(e)}
                                                    value={this.state.amount}
                                                />
                                            <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon1">{this.props.config.coin}</span>
                                                </div>
                                            </div>
                                            <div className="invalid-feedback"
                                                    style={this.state.error.amount !== "" ? {display: 'block'} : {display: 'none'}}>
                                                {this.state.error.amount}
                                            </div>
                                            <div className="invalid-feedback"
                                                    style={this.state.amount < this.props.config.min || this.state.amount > this.props.config.max ? {display: 'block'} : {display: 'none'}}>
                                                Nominal not included in the range
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-transparent">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div class="form-group">
                                                <label>&nbsp;</label>
                                                <button type="button" className="btn btn-primary btn-block" onClick={(e) => this.handleSubmit(e)}>PROCESS</button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div class="form-group">
                                                <label>&nbsp;</label>
                                                <button type="button" className="btn btn-danger btn-block" onClick={(e) => this.HandleReset(e)}>RESET</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> {/* end col */}
            </div>
            
        )
    }
}


const mapStateToPropsCreateItem = (state) => {
    
    return {
    coin:state.coinReducer.data_type,
    isLoading: state.coinReducer.isLoading,
    auth:state.auth,
}};

export default (connect(mapStateToPropsCreateItem)(Form));