import React, {Component} from 'react'
import Swal from 'sweetalert2';
import Select from 'react-select';
import connect from "react-redux/es/connect/connect";
import { storeTransfer } from '../../../../redux/actions/transfer/transfer.action';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: "",
            wallet_address: "",
            coin_type: "",
            coin_type_data: [],
            config:[],
            error:{
                amount: "",
                wallet_address: "",
                coin_type: "",
            },
         };
         this.handleChange = this.handleChange.bind(this)
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
    HandleChangeCoin(cn){
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
            wallet_address: this.state.wallet_address,
            coin_type: this.state.coin_type
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
                this.props.dispatch(storeTransfer(parsedata));
            }
        })
    }

    render(){
        
        
        return(
            <div className="card">
                <div className="card-header bg-transparent">
                    <h3>Transfer</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label font-12">
                                    Coin Type
                                </label>
                                <Select
                                    isDisabled={true}
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
                        </div>
                        
                        <div className="col-md-12">
                            <div className="card mt-3">
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label font-12">
                                                Wallet Address Destination
                                            </label>
                                            <input
                                                type="text"
                                                readOnly={false}
                                                className="form-control"
                                                id="wallet_address"
                                                name="wallet_address"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.wallet_address}
                                            />
                                            <div className="invalid-feedback"
                                                    style={this.state.error.wallet_address !== "" ? {display: 'block'} : {display: 'none'}}>
                                                {this.state.error.wallet_address}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="control-label font-12">
                                                Amount
                                            </label>
                                            <input
                                                type="number"
                                                maxLength="8"
                                                readOnly={false}
                                                className="form-control"
                                                id="amount"
                                                name="amount"
                                                onChange={(e) => this.handleChange(e)}
                                                value={this.state.amount}
                                            />
                                            <div className="invalid-feedback"
                                                    style={this.state.error.amount !== "" ? {display: 'block'} : {display: 'none'}}>
                                                {this.state.error.amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="form-group">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-primary btn-block" onClick={(e) => this.handleSubmit(e)}>TRANSFER</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="form-group">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-danger btn-block" onClick={(e) => this.HandleReset(e)}>RESET</button>
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