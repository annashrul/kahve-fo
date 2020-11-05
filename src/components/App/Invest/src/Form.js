import React, {Component} from 'react'
import Swal from 'sweetalert2';
import Stepper from 'react-stepper-horizontal';
import connect from "react-redux/es/connect/connect";
import { CustomInput } from 'reactstrap';
import { storeInvest } from '../../../../redux/actions/invest/invest.action';
import imgUpload from 'assets/upload.png';
import Dropzone from 'react-dropzone'
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            files: "",
            confirm: false,
            isUpload: false,
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
            steps: [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}],
            currentStep: 0,
        };
        this.onClickNext = this.onClickNext.bind(this);
         this.handleChange = this.handleChange.bind(this)
         this.handleSlider = this.handleSlider.bind(this)
         this.getUpload = this.getUpload.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.HandleChangeCoin = this.HandleChangeCoin.bind(this)
    }
    
    getUpload(data,param){
        var reader = new FileReader();
        reader.readAsDataURL(data[0]);
        reader.onloadstart = () =>
            this.setState({
                isLoad:param
            });
        reader.onabort = () =>
            Swal.fire({
                title:'Error',
                text:'File Canceled!',
                icon:'error'
            });
        reader.onerror = () =>
            Swal.fire({
                title:'Error',
                text:'File Error!',
                icon:'error'
            });
        reader.onload = () =>
            
                
        reader.onloadend = () => {
            this.setState({files:reader.result, isUpload:true})
        }
    }

    handleConfirm(e){
        this.setState({
            confirm:!this.state.confirm
        })
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
    handleSlider = (e) => {
        
        this.setState({ amount: e.target.value });
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
            pict: this.state.files,
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

    onClickNext() {
        const { 
            // steps,
            currentStep } = this.state;
        if(currentStep===0){
            this.setState({
                currentStep: currentStep + 1,
            });
        } 
        else if(currentStep>0&&this.state.amount!==''){
            this.setState({
                currentStep: currentStep + 1,
            });
        }
        else if(this.state.amount===''){
            let err = Object.assign({}, this.state.error, {
                amount: "Amount can't be null"
            });
            this.setState({
                error:err
            });
        }
    }
    render(){
        const { steps, currentStep } = this.state;
        
        return(
            <div className="card">
                <div className="card-header bg-transparent">
                    <h3 style={{display:this.props.config.active_invest===1?'none':''}}>Invest Available for Slot Number #{this.props.config.slot===undefined?0:this.props.config.slot.slot_no}</h3>
                    <h3 style={{display:this.props.config.active_invest===1?'':'none'}}>This form can be opened after your transaction is approved! </h3>
                </div>
                {
                    this.props.config.active_invest===1?
                    '':
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <Stepper steps={ steps } activeStep={ currentStep } />
                            </div>
                            <div className="col-md-12" style={{display:currentStep===0?'':'none'}}>
                                <div className="ribbon-wrapper card">
                                    <div className="ribbon ribbon-warning">IMPORTANT!</div>
                                    <div class="alert alert-danger" role="alert">
                                        <ul>
                                            <li style={{listStyle:'outside'}}>Before you confirm your investment on this website, please transfer / send bitcoin via  <a href="https://indodax.com" target="_blank" rel="noopener noreferrer" className="font-15 text-light">Indodax <i class="zmdi zmdi-open-in-new"></i></a> to the wallet id below :</li>
                                            <li className="text-center"><h5 className="text-light">{this.props.config.invest_detail===undefined?'':this.props.config.invest_detail.wallet_address}</h5></li>
                                            <li style={{listStyle:'outside'}}>Minimum Invest {this.props.config.min +" "+ this.props.config.coin}</li>
                                            <li style={{listStyle:'outside'}}>Maximum Invest {this.props.config.max +" "+ this.props.config.coin}</li>
                                            <li className="text-center"><br/><h5 className="text-light">DO NOT CONTINUE THE NEXT STEP, BEFORE YOU ARE SUCCESSFUL SENDING THE COIN FROM INDODAX TO OUR WALLET</h5></li>
                                        </ul>
                                    </div>
                                    <div class="form-group">
                                        <small>#note : After Indodax receives your coin sending process, please click the button below:</small>
                                        <button type="button" className="btn btn-warning btn-lg btn-block text-light" onClick={ this.onClickNext }>I agree, continue investment</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12" style={{display:currentStep===1?'':'none'}}>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div class="alert alert-warning text-light" role="alert">
                                                <ul>
                                                    <li style={{listStyle:'outside'}}>Insert coins according to the amount you have sent on  <a href="https://indodax.com" target="_blank" rel="noopener noreferrer" className="font-15 text-light">Indodax <i class="zmdi zmdi-open-in-new"></i></a>.</li>
                                                    <li style={{listStyle:'outside'}}>An error when entering the number of coins will result in a change in the amount of mining.</li>
                                                </ul>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label font-12">
                                                    Amount
                                                </label>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <small>{this.props.config.min}</small>
                                                    <small>{this.props.config.max}</small>
                                                </div>
                                                <CustomInput type="range" min={this.props.config.min} max={this.props.config.max} step="0.00000001" value={this.state.amount} onChange={(e)=>this.handleSlider(e)} />
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        min={this.props.config.min}
                                                        max={this.props.config.max}
                                                        step="0.00000001"
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
                                            <div className="col-md-6 offset-6">
                                                <div class="form-group">
                                                    <button type="button" className="btn btn-info btn-block" onClick={(e) => this.onClickNext(e)}>NEXT</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12" style={{display:currentStep===2?'':'none'}}>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        {/* <div className="col-md-12"> */}
                                            <div className="card p-4 img-thumbnail">
                                                <div className="text-center" style={{display:this.state.confirm?'none':''}}>
                                                    <h4 className="mb-10 font-24">Information</h4>
                                                    <h6 className="mb-30">Immediately transfer from <a href="https://indodax.com" target="_blank" rel="noopener noreferrer" className="font-15 text-info">Indodax <i class="zmdi zmdi-open-in-new"></i></a> an amount of <span className="text-success">{this.props.config.length<=0?'':this.props.config.invest_detail.amount} {this.props.config.length<=0?'':this.props.config.coin}</span> to the wallet address:</h6>
                                                    <h2>{this.props.config.length<=0?'':this.props.config.invest_detail.wallet_address}</h2>
                                                    <br/>
                                                    <button className="btn btn-lg btn-info" onClick={(e)=>this.handleConfirm(e)}>CONFIRM</button>
                                                </div>
                                                <div className="text-center" style={{display:this.state.confirm?'':'none'}}>
                                                    <Dropzone onDrop={acceptedFiles => this.getUpload(acceptedFiles,'barang')}>
                                                    {({getRootProps, getInputProps}) => (
                                                        <div className="container text-center" style={{padding: '0.5rem',cursor: 'pointer'}}>
                                                            <div {...getRootProps()}>
                                                                <input {...getInputProps()} accept="image/*" />
                                                                <img className="card-img-top img-responsive mb-3" src={this.state.files===''?imgUpload:this.state.files} alt="" style={{width:'200px',borderRadius: '30px',padding: '2rem', borderStyle: 'dashed'}} />
                                                                <p>Drag 'n' drop some files images here, or click to select files</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    </Dropzone>
                                                </div>
                                            </div>
                                        {/* </div> */}
                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <button type="button" className="btn btn-danger btn-block" onClick={(e) => this.HandleReset(e)}>RESET</button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <button type="button" className="btn btn-primary btn-block" onClick={(e) => this.handleSubmit(e)} disabled={!this.state.isUpload}>PROCESS</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            
                }
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