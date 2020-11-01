import React, {Component} from 'react'
import moment from 'moment'
class Charts extends Component {
  render(){
        return(
             <div className="col-md-12 box-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>

                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Coin</th>
                              <th scope="col">Asset</th>
                              <th scope="col">Contract</th>
                              <th scope="col">Daily Earning</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">End Date</th>
                              <th scope="col">Assets End Date</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.props.data!==undefined?
                              this.props.data.map(item=>{
                                const label=item.status===1?<span class="badge badge-info">Active</span>:(item.status===2?<span class="badge badge-success">Paid</span>:<span class="badge badge-secondary">Not Active</span>)

                                return (
                                  <tr style={item.status==0?{background:'#eeeeee'}:{}}>
                                    <th scope="row">Slot {item.slot_no}</th>
                                    <td>{item.symbol===null?'-':item.symbol}</td>
                                    <td>{item.amount===null?'-':item.amount}</td>
                                    <td>{item.contract===null?'-':item.contract+' Month'} </td>
                                    <td>{item.daily_earning===null?'-':item.daily_earning}</td>
                                    <td>{item.start_date===null?'-':moment(item.start_date).format('Y-M-D h:m:s')}</td>
                                    <td>{item.start_date===null?'-':moment(item.start_date).add(item.contract, 'months').format('Y-M-D h:m:s')}</td>
                                    <td>{item.start_date===null?'-':moment(item.start_date).add(parseInt(item.contract)+1, 'months').format('Y-M-D h:m:s')}</td>
                                    <td>{label} {item.status===0?<a href="#" class="badge badge-warning">Deposit</a>:""}</td>

                                  </tr>
                                )
                              }):""
                            }
                            
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;