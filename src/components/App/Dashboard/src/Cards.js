import React, {Component} from 'react'
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

class Cards extends Component {
    render(){
        const amount =this.props.isobj?
                        this.props.data!==undefined?(
                            <h2 style={{paddingLeft:5,marginTop:3}} >
                                {
                                    this.props.data.length>0?
                                    this.props.data.map(item=>{
                                        return(
                                            <div style={this.props.data.length===1?{fontSize:'1.1rem'}:{fontSize:'.8rem'}}>{item.total} <small>({item.coin})</small><br/></div>
                                        )
                                    }):(
                                            <div style={{fontSize:'1.5rem'}}>0<br/></div>
                                        )
                                }
                            </h2>
                        )
                        :""
                    :(
                        <h2 style={{paddingLeft:5}} className="font-20">{this.props.data}</h2>
                    )
        return(
            <div className="col-md-6 col-xl-3 box-margin">
                <div className="card">
                    <div className="card-header bg-transparent border-bottom-0">{this.props.title}</div>
                    <div className="card-body">
                        <div className="row justify-content-between" style={{paddingLeft:12,paddingRight:12}}>
                            <h2><i className={this.props.icon}></i></h2>
                            {
                                amount
                            }
                        </div>
                    </div>
                    {
                        this.props.link!==undefined?(
                            <div className="card-footer bg-transparent border-top-0" style={{fontSize:".8em",paddingTop:0}}>
                                Your referral link: <a href="#" onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(this.props.link);Toast.fire({icon: 'success',title: `Link has been copied.`})}}>{this.props.link}</a><br/>
                                <i className="fa fa-warning"/> Invite your friend and get 0.0001 BTC !
                            </div>
                        ):""
                    }
                    {
                        this.props.miner?(
                            <div className="card-footer bg-transparent border-top-0" style={{fontSize:".8em",paddingTop:0}}>
                                <i className="fa fa-refresh"/> Mining is in progress!
                            </div>
                        ):""
                    }
                </div>
            </div>
        )
    }
}

export default Cards;