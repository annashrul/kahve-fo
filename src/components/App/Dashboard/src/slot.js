import React, {Component} from 'react'
import moment from 'moment'
class Charts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date:[],
      miner:[]
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.data !== undefined){
      this.interval = setInterval(() => {
        let dates=[];
        let mining=[]
        nextProps.data.map(item => {
          if (item.start_date!==null){
            let start = moment(item.start_date);
            let now = moment();
            let end = moment(item.start_date).add((nextProps.number_of_month*item.contract), 'days');
            const timer = this.calculateCountdown(start, end, now);
            dates.push(timer);
            mining.push({
              balance: (((23-(parseInt(timer.hours))) * 3600) + ((60-parseInt(timer.min)) * 60)+(60-parseInt(timer.sec)))*parseFloat(item.daily_earning) / 86400,
            })
            // console.log("HOUR",23 - parseInt(timer.hours))
            // console.log("HOUR", parseInt(timer.hours))
            // console.log("MIN", 60 - parseInt(timer.min))
            // console.log("SEC", 60 - parseInt(timer.sec))
          }
        })
        this.props.counter(mining);
        if(dates.length>0){
          this.setState({
            date: dates,
            miner: mining
          })
        }else this.stop()
      }, 1000);
    }
  }

   componentWillUnmount() {
     this.stop();
   }

  calculateCountdown(start,end,now) {
    let diff = (Date.parse(new Date(end)) - Date.parse(new Date(now))) / 1000;

      // clear countdown when date is reached
      if (diff <= 0) return false;

      const timeLeft = {
          years: 0,
          days: 0,
          hours: 0,
          min: 0,
          sec: 0,
          millisec: 0,
      };

      // calculate time difference between now and expected date
      if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
          timeLeft.years = Math.floor(diff / (365.25 * 86400));
          diff -= timeLeft.years * 365.25 * 86400;
      }
      if (diff >= 86400) { // 24 * 60 * 60
          timeLeft.days = Math.floor(diff / 86400);
          diff -= timeLeft.days * 86400;
      }
      if (diff >= 3600) { // 60 * 60
          timeLeft.hours = Math.floor(diff / 3600);
          diff -= timeLeft.hours * 3600;
      }
      if (diff >= 60) {
          timeLeft.min = Math.floor(diff / 60);
          diff -= timeLeft.min * 60;
      }
      timeLeft.sec = diff;

      return timeLeft;
  }
  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
      value = String(value);
      while (value.length < 2) {
          value = '0' + value;
      }
      return value;
  }

  render(){
    let active=0;
        return(
             <div className="col-md-12 col-sm-12 box-margin">
                <div className="card">
                    <div className="card-body" style={{overflowX: 'auto'}}>
                        <h4 className="card-title">{this.props.title}</h4>
                        <div className="table-responsive"> 
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Invest</th>
                                <th scope="col">Contract</th>
                                <th scope="col">Daily Earning</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Time Left</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                this.props.data!==undefined?
                                this.props.data.map((item,index)=>{
                                  const label=item.status===1?<span class="badge badge-success">Active</span>:(item.status===2?<span class="149	badge badge-danger">Done</span>:<span class="badge badge-secondary">Not Active</span>)
                                  if(item.status===1) active=item.slot_no
                                  const contract = item.contract * this.props.number_of_month;
                                  return (
                                    <tr style={item.status==0?{background:'#eeeeee'}:{}}>
                                      <th scope="row">Slot {item.slot_no}</th>
                                      <td>{item.amount===null?'-':parseFloat(item.amount).toFixed(8)} <small>{item.symbol===null?'-':"("+item.symbol+")"}</small></td>
                                      <td>{item.contract===null?'-':contract+' Days'} </td>
                                      <td>{item.daily_earning===null?'-':parseFloat(item.daily_earning).toFixed(8)} <small>{item.symbol===null?'-':"("+item.symbol+")"}</small></td>
                                      <td>{item.start_date===null?'-':moment(item.start_date).format('Y-M-D HH:mm:ss')}</td>
                                      <td>{
                                        this.state.date[index]!==undefined?
                                        this.addLeadingZeros(this.state.date[index].days)+" D "+
                                        this.addLeadingZeros(this.state.date[index].hours)+" H "+
                                        this.addLeadingZeros(this.state.date[index].min)+" M "+
                                        this.addLeadingZeros(this.state.date[index].sec)+" S":'-'
                                      }</td>
                                      <td>{label} {item.status===0 && active+1===item.slot_no?<a href="/invest" class="badge badge-warning">Invest</a>:""}</td>

                                    </tr>
                                  )
                                }):""
                              }
                              
                            </tbody>
                          </table>
                            {/* <td>{this.state.miner[index]!==undefined?this.state.miner[index].balance:""}</td> */}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;
