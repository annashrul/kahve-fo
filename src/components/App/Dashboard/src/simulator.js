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
            err:false,
            threeMonths:0,
            fourMonths: 0,
            fiveMonths:0
        };
        this.handleChange = this.handleChange.bind(this)
    }
// number_of_month
// contract
// monthly_profit
    handleChange = (event) => {
        let column = event.target.name;
        let value = event.target.value;
        if (column === 'amount'){
            if(value>this.state.max) value=this.state.max;
            if(value==='') value=0;
            const monthly=(parseFloat(value)*(parseFloat(this.props.monthly_profit)/100))
            this.setState({
                monthly: (monthly),
                daily: (monthly/30),
                twoMonths: (monthly*2),
                threeMonths: (monthly*3),
                fourMonths: (monthly*4),
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
                                            maxLength="8"
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
                                            <span className="input-group-text">???</span>
                                        </div>
                                    </div>
                                    <label id="password-error" className="error mt-2 text-danger" style={this.state.err?{fontSize:'.8em',display:'block'}:{fontSize:'.8em',display:'none'}} for="password">Min invest {this.state.min} and Max invest {this.state.max}.</label>
                                </div>
                                <div className="">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">Contract Period</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{parseInt(this.props.number_of_month,10)*parseInt(this.props.contract,10)} Days</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">Monthly income</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.monthly.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">Daily Earnings</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.daily.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">2 Months Earnings</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.twoMonths.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">3 Months Earnings</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.threeMonths.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">4 Months Earnings</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.fourMonths.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                            <tr>
                                                <th style={{width:"30%"}}><label className="text-dark font-14">5 Months Earnings</label></th>
                                                <td ><label className="text-dark font-14">:</label></td>
                                                <td ><label className="text-dark font-14">{this.state.totals.toFixed(8)}<br/>BTC</label></td>
                                            </tr>
                                        </tbody>
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