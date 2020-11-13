import React, {Component} from 'react'
import { statusQ } from '../../../../helper';
import moment from 'moment'
class Charts extends Component {
  render(){
        return(
             <div className="col-md-6 col-sm-6 box-margin">
                <div className="card">
                    <div className="card-body" style={{overflowX: 'auto'}}>
                        <h4 className="card-title">{this.props.title}</h4>
                          {
                            this.props.isWd?(
                              <div className="table-responsive">
                              <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Invoice no.</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      this.props.data !== undefined ?
                                        this.props.data.map(item=>{
                                          // const label=item.status===1?<span class="badge badge-success">Pending</span>:(item.status===2?<span class="149	badge badge-danger">Cancel</span>:<span class="badge badge-secondary">Pending Payment</span>)

                                          return(
                                            <tr>
                                              <td style={{whiteSpace:'nowrap'}}>{item.kd_trx}</td>
                                              <td style={{whiteSpace:'nowrap'}}>{parseFloat(item.amount).toFixed(8)} {item.symbol}</td>
                                              <td style={{whiteSpace:'nowrap'}}>{statusQ(item.status===0?'warning':item.status===1?'success':'danger',item.status===0?'Pending':item.status===1?'Success':'Void')}</td>
                                              <td style={{whiteSpace:'nowrap'}}>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</td>
                                            </tr>
                                          )
                                        }):""
                                    }
                                  </tbody>
                            </table>
                            </div>
                            ):(
                              <div className="table-responsive">
                              <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Name</th>
                                      <th scope="col">Join Date</th>
                                      <th scope="col">Bonus Referral</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      this.props.data !== undefined ?
                                        this.props.data.map(item=>{
                                          // const label=item.status===1?<span class="badge badge-success">Paid</span>:(item.status===2?<span class="149	badge badge-danger">Cancel</span>:<span class="badge badge-secondary">Pending Payment</span>)

                                          return(
                                            <tr>
                                              <td style={{whiteSpace:'nowrap'}}>{item.name}</td>
                                              <td style={{whiteSpace:'nowrap'}}>{moment(item.created_at).format('YYYY-MM-DD HH:mm')}</td>
                                              <td style={{whiteSpace:'nowrap'}}>{parseFloat(item.profit).toFixed(8)}</td>
                                            </tr>
                                          )
                                        }):""
                                    }
                                  </tbody>
                            </table>
                            </div>
                            )
                          }
                          
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;