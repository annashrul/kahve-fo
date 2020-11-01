import React, {Component} from 'react'
import moment from 'moment'
class Charts extends Component {
  render(){
        return(
             <div className="col-md-4 box-margin">
                <div className="card">
                    <div className="card-body" style={this.props.status===0?{background:"#eeeeee"}:{}}>
                        <h4 className="card-title">{this.props.title} <small style={{fontSize:".7em"}}>{this.props.symbol===null?"":"("+this.props.symbol+")"}</small></h4>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Profit</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.props.data.map(item=>{
                                const label=item.status===1?<span class="badge badge-info">Active</span>:(item.status===2?<span class="badge badge-success">Paid</span>:<span class="badge badge-secondary">Not Active</span>)

                                return (
                                  <tr style={item.status==0?{background:'#eeeeee'}:{}}>
                                    <th scope="row">{moment(item.start_date).format("MMM")}</th>
                                    <td>{item.amount===null?'-':item.amount}</td>
                                    <td>{item.start_date===null?'-':moment(item.start_date).format('Y-M-D h:m:s')}</td>
                                    <td>{label}</td>

                                  </tr>
                                )
                              })
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