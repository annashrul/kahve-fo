import React, {Component} from 'react'
class Charts extends Component {
  render(){
        return(
             <div className="col-md-6 col-sm-6 box-margin">
                <div className="card">
                    <div className="card-body" >
                        <h4 className="card-title">{this.props.title}</h4>
                          {
                            this.props.isWd?(
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
                                          const label=item.status===1?<span class="badge badge-success">Paid</span>:(item.status===2?<span class="149	badge badge-danger">Cancel</span>:<span class="badge badge-secondary">Pending Payment</span>)

                                          return(
                                            <tr>
                                              <td>{item.kd_trx}</td>
                                              <td>{item.amount} {item.symbol}</td>
                                              <td>{label}</td>
                                              <td>{item.created_at}</td>
                                            </tr>
                                          )
                                        }):""
                                    }
                                  </tbody>
                            </table>
                            ):(
                              <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Name</th>
                                      <th scope="col">Join Date</th>
                                      <th scope="col">Profit</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      this.props.data !== undefined ?
                                        this.props.data.map(item=>{
                                          // const label=item.status===1?<span class="badge badge-success">Paid</span>:(item.status===2?<span class="149	badge badge-danger">Cancel</span>:<span class="badge badge-secondary">Pending Payment</span>)

                                          return(
                                            <tr>
                                              <td>{item.name}</td>
                                              <td>{item.created_at}</td>
                                              <td>0</td>
                                            </tr>
                                          )
                                        }):""
                                    }
                                  </tbody>
                            </table>
                            )
                          }
                          
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;