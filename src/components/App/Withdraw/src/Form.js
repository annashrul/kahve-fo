import React, {Component} from 'react'
import {storeWd} from 'redux/actions/site.action';
import Swal from 'sweetalert2';
import Select from 'react-select';
import connect from "react-redux/es/connect/connect";
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amount: "",
            id_wallet: "",
            coin_type: "",
            coin_type_data: [],
            error:{
                amount: "",
                id_wallet: "",
                coin_type: "",
            },
         };
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.HandleChangeCoin = this.HandleChangeCoin.bind(this)
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.coin.data) {
            let c = []
            let coin = nextProps.coin.data;
            if(coin!==undefined){
                coin.map((i) => {
                    c.push({
                        value: i.id,
                        label: i.title
                    });
                    return true;
                })
                this.setState({
                    coin_type: {"value":coin[0].id,"label":coin[0].title},
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
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            amount: this.state.amount,
            id_wallet: this.state.id_wallet,
            coin_type: "c2f9fc02-5193-466e-acd8-8d69069d3fbb",
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
                this.props.dispatch(storeWd(parsedata));
            }
        })
    }

    render(){
        console.log("ccccccccc",this.state.coin_type)
        return(
            <div className="card">
                <div className="card-header bg-transparent">
                    <h3>Withdraw</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                {/* <label className="control-label font-12">
                                    &nbsp;
                                </label> */}
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
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="control-label font-12">
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    readOnly={false}
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    onChange={(e) => this.HandleInput(e)}
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
                                    Wallet Address
                                </label>
                                <input
                                    type="text"
                                    readOnly={false}
                                    className="form-control"
                                    id="id_wallet"
                                    name="id_wallet"
                                    onChange={(e) => this.HandleInput(e)}
                                    value={this.state.id_wallet}
                                />
                                <div className="invalid-feedback"
                                        style={this.state.error.id_wallet !== "" ? {display: 'block'} : {display: 'none'}}>
                                    {this.state.error.id_wallet}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div class="form-group">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-primary btn-block" onClick={(e) => this.HandleSubmit(e)}>PROCESS</button>
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