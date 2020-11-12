import React, {Component} from 'react'
import {Link} from "react-router-dom"

class Info extends Component {
    render(){
        return(
            <div className="col-6">
                <div className="dashboard-infor-mation d-flex flex-wrap align-items-center mb-3">
                    <div className="dashboard-clock">
                        <div id="dashboardDate" style={{marginBottom:'10px'}}><h5>Active Balance</h5></div>
                        {
                            this.props.data!==undefined?
                                        this.props.data.length>0?
                                        this.props.data.map(item=>{
                                            return(
                                                <span>{parseFloat(item.total).toFixed(8)} <small>({item.coin})</small><br/></span>
                                            )
                                        }):(
                                                0
                                            )
                                   
                            :""
                        }
                        <Link to="/Withdraw"> <span className="badge badge-success font-14"> Withdraw</span></Link>
                    </div>
                    {/* <div className="dashboard-btn-group d-flex align-items-center">
                        <button type="button" onClick={(e)=>this.props.handleSubmit(e)} className="btn btn-primary ml-1 float-right"><i className="fa fa-refresh"></i></button>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Info;