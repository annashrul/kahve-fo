import React, {Component} from 'react'
import { connect } from 'react-redux'
import WrapperModal from '../_wrapper.modal'
import {
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import imgUpload from 'assets/upload.png';
import Dropzone from 'react-dropzone'
import Swal from 'sweetalert2';
import {ModalToggle} from "redux/actions/modal.action";
import { updateProfile } from '../../../../redux/actions/profile/profile.action';

class ModalProfile extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.state={
            files:"",
            confirm:false,
            id_card:"",
            name:"",
            email:"",
            password:"",
            error:{
                id_card:"",
                name:"",
                email:"",
                password:"",
            }
        }
        this.handleChange = this.handleChange.bind(this)

    }

    componentWillReceiveProps(nextProps){
        let getDetail = nextProps.detail;
        
        this.setState({
            name:getDetail.name,
            email:getDetail.email,
        })
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
            // let parsedata = {}
            // parsedata['pict'] = reader.result;
            // Swal.fire({
            //     title: 'Upload?',
            //     type: 'info',
            //     showCancelButton: true,
            //     showConfirmButton: true
            // }).then((result)=>{
            //     if(result.dismiss === 'cancel'){
            //         Swal.close()
            //     } else {
            //         // this.props.dispatch(storeAppove(this.props.config.profile_detail.id,parsedata))
            //         // this.props.valid(reader.result)
                    
            //         // window.scrollTo(0, 0);
            //         // const bool = !this.props.isOpen;
            //         // this.props.dispatch(ModalToggle(bool));
            //     }
            // });
        }
    }

    handleChange = (event) => {
        let column=event.target.name;
        let value=event.target.value;
        this.setState({ [column]: value });
    }
    handleConfirm(e){
        this.setState({
            confirm:!this.state.confirm
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        let parsedata=[];
        parsedata = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        };
        if(parsedata['name']===''||parsedata['name']===undefined){
            delete parsedata['name'];
        }
        if(parsedata['email']===''||parsedata['email']===undefined){
            delete parsedata['email'];
        }
        if(parsedata['password']===''||parsedata['password']===undefined){
            delete parsedata['password'];
        }
        // else{
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
                    this.props.dispatch(updateProfile(parsedata,this.props.param,this.props.auth.user.id));
                    
                    const bool = !this.props.isOpen;
                    this.props.dispatch(ModalToggle(bool));
                }
            })
        // }
    }
    toggle = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };
    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formProfile"} size="lg">
                <ModalHeader toggle={this.toggle}>Edit Your Profile</ModalHeader>
                <ModalBody>
                    <br/>
                    <div className="card p-4 img-thumbnail">
                        <div className="card-body" style={{display:this.state.confirm?'none':''}}>
                        <form autoComplete="new-password">
                                <div className="form-group" style={{display:'none'}}>
                                    <label htmlFor="id_card">ID Card</label>
                                    <input className="form-control" type="text" id="id_card" name="id_card" value={this.state.id_card} onChange={(e) => this.handleChange(e)} placeholder="Enter ID Card" required />
                                    <div className="invalid-feedback"
                                        style={this.state.error.id_card !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.id_card}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Enter your Name" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.name !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="Enter your Email" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.email !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.email}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label><br/>
                                    <small className="text-danger">* Leave this field blank if you don't want to change the password</small>
                                    <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} autoComplete="new-password" placeholder="Enter your Password" />
                                    <div className="invalid-feedback"
                                        style={this.state.error.password !== "" ? {display: 'block'} : {display: 'none'}}>
                                        {this.state.error.password}
                                    </div>
                                </div>
                                <div className="form-group mb-0 mt-15">
                                    <button className="btn btn-primary btn-block" type="submit" onClick={(e)=>this.handleSubmit(e)}>UPDATE</button>
                                </div>
                                </form>
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
                </ModalBody>
            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,

    }
}
export default connect(mapStateToProps)(ModalProfile);