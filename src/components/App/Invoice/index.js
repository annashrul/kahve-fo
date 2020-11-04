import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout'
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2';
import imgUpload from 'assets/upload.png';
import { storeAppove } from '../../../redux/actions/invest/invest.action';

class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm:false,
            files:''
        }
        
        this.handleConfirm = this.handleConfirm.bind(this)
    }
    getUpload(data,param){
        var reader = new FileReader();
        reader.readAsDataURL(data[0]);
        // if(data[0].name.toString().substring(data[0].name.length - 4) === '.png'){
            
             
            reader.onloadstart = () =>
                this.setState({
                    isLoad:param
                });
            reader.onabort = () =>
                Swal.fire({
                    title:'Kesalahan',
                    text:'File Dibatalkan!',
                    icon:'error'
                });
            reader.onerror = () =>
                Swal.fire({
                    title:'Kesalahan',
                    text:'File Error!',
                    icon:'error'
                });
            reader.onload = () =>
                
                 
            reader.onloadend = () => {
                 
                // this.setState({
                //     files:reader.result,
                // });

                let parsedata = {}
                parsedata['pict'] = reader.result;
                Swal.fire({
                    title: 'Upload?',
                    type: 'info',
                    showCancelButton: true,
                    showConfirmButton: true
                }).then((result)=>{
                    if(result.dismiss === 'cancel'){
                        Swal.close()
                    } else {
                        this.props.dispatch(storeAppove(this.props.config.invest_detail.id,parsedata))
                    }
                });
            }
        // } else {
        //     Swal.fire({
        //         title:'Kesalahan',
        //         text:'Format File Tidak Diperbolehkan!',
        //         icon:'error'
        //     })
        // }
        // this.setState({
        //     isUpload:param==='close'?'':param
        // })
    }
    componentDidUpdate() {
        if (this.props.config.length<=0) {
            this.props.history.push({
                pathname: '/invest',
                data: this.props.config
            })
        }
    }
    handleConfirm(e){
        this.setState({
            confirm:!this.state.confirm
        })
    }
    render() {
        console.log("auth",this.props.auth)
        console.log("detail",this.props)
        console.log("files",this.state.files)
        return (
            <Layout page="Invest">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                <div className="col-sm-6 pb-4">
                                    <div className="media align-items-center">
                                    {/* Logo */}
                                    <div className="card-body-login mb-30">
                                        <img src="img/core-img/small-logo.png" alt />
                                    </div>
                                    </div>
                                    <div className="mb-1 font-15">Office 154, 330 North Brand Boulevard</div>
                                    <div className="mb-1 font-15">Glendale, CA 91203, USA</div>
                                    <div className="font-15">+0 (123) 456 7891, +9 (876) 543 2198</div>
                                </div>
                                <div className="col-sm-6 text-right pb-4">
                                    <h6 className="font-15 mb-3">INVOICE : {this.props.config.length<=0?'':this.props.config.invest_detail.kd_trx}</h6>
                                    <div className="mb-1 font-15">Date: <strong className="font-weight-semibold">January 12, 2015</strong></div>
                                    <div className="font-15">Due date: <strong className="font-weight-semibold">May 12, 2015</strong></div>
                                </div>
                                </div>
                                <hr className="mb-4" />
                                <div className="row">
                                <div className="col-sm-6 mb-4">
                                    <div className="mb-2"><strong>Invoice To:</strong></div>
                                    <div className="font-14 mb-1">{this.props.auth.user.name}</div>
                                    <div className="font-14">{this.props.auth.user.email}</div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                    <div className="mb-2"><strong>Payment Details:</strong></div>
                                    <table>
                                    <tbody>
                                        <tr>
                                        <td className="pr-3 font-14">Total Due:</td>
                                        <td className="font-14"><strong>{this.props.config.length<=0?'':this.props.config.invest_detail.amount}</strong></td>
                                        </tr>
                                        <tr>
                                        <td className="pr-3 font-14">Coin Type:</td>
                                        <td className="font-14">{this.props.config.length<=0?'':this.props.config.coin}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                                    <div class="alert alert-warning text-center" role="alert">
                                        <strong>Note - </strong> you <span className="text-danger">cannot</span> re-invest until this payment is completed!
                                    </div>
                                    <br/>
                                    <div className="card p-4 img-thumbnail">
                                        <div className="text-right" style={{display:this.state.confirm?'':'none'}}>
                                        <button className="btn btn-circle btn-danger float-right" onClick={(e)=>this.handleConfirm(e)}><i className="fa fa-times"></i></button>
                                        </div>
                                        <div className="card-body text-center" style={{display:this.state.confirm?'none':''}}>
                                            <h4 className="mb-10 font-24">Information</h4>
                                            <h6 className="mb-30">Immediately transfer an amount of <span className="text-success">{this.props.config.length<=0?'':this.props.config.invest_detail.amount} {this.props.config.length<=0?'':this.props.config.coin}</span> to the wallet address:</h6>
                                            <h2>{this.props.config.length<=0?'':this.props.config.invest_detail.wallet_address}</h2>
                                            <br/>
                                            <button className="btn btn-lg btn-info" onClick={(e)=>this.handleConfirm(e)}>CONFIRM</button>
                                        </div>
                                        <div className="card-body text-center" style={{display:this.state.confirm?'':'none'}}>
                                            <Dropzone onDrop={acceptedFiles => this.getUpload(acceptedFiles,'barang')}>
                                            {({getRootProps, getInputProps}) => (
                                                <div className="container text-center" style={{padding: '1rem',cursor: 'pointer'}}>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} accept="image/*" />
                                                        <img className="card-img-top img-responsive mb-3" src={imgUpload} alt="" style={{width:'200px',borderRadius: '30px',padding: '2rem', borderStyle: 'dashed'}} />
                                                        <p>Drag 'n' drop some files images here, or click to select files</p>
                                                    </div>
                                                </div>
                                            )}
                                            </Dropzone>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/* <div className="col-12">
                            <div class="alert alert-danger" role="alert">
                                <strong>Error - </strong> A simple danger alert—check it out!
                            </div>
                        </div> */}
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{
        config:state.investReducer.data_config,
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Invest);