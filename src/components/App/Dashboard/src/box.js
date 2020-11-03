import React, {Component} from 'react'
import moment from 'moment'
class Charts extends Component {
  render(){
        return(
             <div className="col-md-6 box-margin">
                <div className="card">
                    <div className="card-body" >
                        <h4 className="card-title">{this.props.title}</h4>
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
                            
                          </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;