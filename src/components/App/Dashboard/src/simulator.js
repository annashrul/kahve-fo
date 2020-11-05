import React, {Component} from 'react'

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            min:0.025,
            max:0.25,
            monthly:0,
            daily:0,
            weekly:0,
            twoMonths:0,
            totals:0,
            err:false
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event) => {
        let column = event.target.name;
        let value = event.target.value;
        if (column === 'amount'){
            if(value>this.state.max) value=this.state.max;
            if(value==='') value=0;
            const monthly=(parseFloat(value)*(45/100))
            this.setState({
                monthly: (monthly),
                daily: (monthly/30),
                weekly: (monthly/4),
                twoMonths: (monthly*2),
                totals: (monthly*5),
                err: parseFloat(value)<this.state.min?true:false
            })
        }
        this.setState({
            [column]: value
        });
    }
    render(){
        return(
             <div className="col-md-6 col-sm-12 box-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label>Your Investment:</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            min={this.state.min}
                                            max={this.state.max}
                                            step={0.0001}
                                            readOnly={false}
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            onChange={(e) => this.handleChange(e)}
                                            value={this.state.amount}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">₿</span>
                                        </div>
                                    </div>
                                    <label id="password-error" className="error mt-2 text-danger" style={this.state.err?{fontSize:'.8em',display:'block'}:{fontSize:'.8em',display:'none'}} for="password">Min invest {this.state.min} and Max invest {this.state.max}.</label>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-borderless">
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>Contract Period</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>150 Days</td>
                                        </tr>
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>Monthly income</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>{this.state.monthly.toFixed(8)} ₿</td>
                                        </tr>
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>Daily Earnings</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>{this.state.daily.toFixed(8)} ₿</td>
                                        </tr>
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>Weekly Earnings</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>{this.state.weekly.toFixed(8)} ₿</td>
                                        </tr>
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>2 Months Earnings</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>{this.state.twoMonths.toFixed(8)} ₿</td>
                                        </tr>
                                        <tr>
                                            <th style={{border:'none',width:"30%"}}>Total Earnings <br/>(150 days)</th>
                                            <td style={{border:'none'}}>:</td>
                                            <td style={{border:'none'}}>{this.state.totals.toFixed(8)} ₿</td>
                                        </tr>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;