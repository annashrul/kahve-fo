import React, {Component} from 'react'
import moment from 'moment'
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
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
            if(item.mining_active===1){
              if(item.status===1){
                let start = moment(item.start_date);
                let now = moment();
                let end = moment(item.start_date).add((nextProps.number_of_month*item.contract), 'days');
                const timer = this.calculateCountdown(start, end, now);
                dates.push(timer);
                mining.push({
                  balance: (((23-(parseInt(timer.hours,10))) * 3600) + ((60-parseInt(timer.min,10)) * 60)+(60-parseInt(timer.sec,10)))*parseFloat(item.daily_earning) / 86400,
                })
              }else{
                dates.push({
                  years: 0,
                  days: 0,
                  hours: 0,
                  min: 0,
                  sec: 0,
                  millisec: 0,
                });
              }
            }else{
              dates.push({
                years: 0,
                days: (nextProps.number_of_month * item.contract),
                hours: 0,
                min: 0,
                sec: 0,
                millisec: 0,
              });
            }
            // console.log("HOUR",23 - parseInt(timer.hours))
            // console.log("HOUR", parseInt(timer.hours))
            // console.log("MIN", 60 - parseInt(timer.min))
            // console.log("SEC", 60 - parseInt(timer.sec))
          }
          return null
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
                                  const label=item.status===1?<span class="badge badge-success font-13 mb-2">Active</span>:(item.status===2?<span class="149	badge badge-danger font-13 mb-2">Done</span>:<span class="badge badge-secondary font-13 mb-2">Not Active</span>)
                                  if(item.status>0) active=item.slot_no
                                  // console.log(item.status);
                                  const contract = item.contract * this.props.number_of_month;
                                  return (
                                    <tr style={item.status===0?{background:'#eeeeee'}:{}}>
                                      <th style={{whiteSpace:'nowrap'}} scope="row">Slot {item.slot_no}</th>
                                      <td style={{whiteSpace:'nowrap'}} onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(item.amount===null?'-':parseFloat(item.amount).toFixed(8));Toast.fire({icon: 'success',title: `Data has been copied.`})}}><small><i class="zmdi zmdi-copy"/> </small> {item.amount===null?'-':parseFloat(item.amount).toFixed(8)} <small>{item.symbol===null?'-':"("+item.symbol+")"}</small></td>
                                      <td style={{whiteSpace:'nowrap'}}>{item.contract===null?'-':contract+' Days'} </td>
                                      <td style={{whiteSpace:'nowrap'}} onClick={(e) => {e.preventDefault();navigator.clipboard.writeText(item.daily_earning===null?'-':parseFloat(item.daily_earning).toFixed(8));Toast.fire({icon: 'success',title: `Data has been copied.`})}}><small><i class="zmdi zmdi-copy"/> </small> {item.daily_earning===null?'-':parseFloat(item.daily_earning).toFixed(8)} <small>{item.symbol===null?'-':"("+item.symbol+")"}</small></td>
                                      <td style={{whiteSpace:'nowrap'}}>{item.start_date===null?'-':moment(item.start_date).format('Y-M-D HH:mm:ss')}</td>
                                      <td style={{whiteSpace:'nowrap'}}>{
                                        this.state.date[index]!==undefined?
                                        this.addLeadingZeros(this.state.date[index].days)+" D "+
                                        this.addLeadingZeros(this.state.date[index].hours)+" H "+
                                        this.addLeadingZeros(this.state.date[index].min)+" M "+
                                        this.addLeadingZeros(this.state.date[index].sec)+" S":'-'
                                      }</td>
                                      <td>{label} {item.status===0 && active+1===item.slot_no?<Link to="/invest"> <span className="badge badge-warning font-13 mb-2"> Invest</span></Link>:""} {item.status===1&&item.mining_active===0 && active===item.slot_no?<abbr title="Mining will start automatically after start date."><span class="font-13 mb-2">Mining off <i className="fa fa-warning"/></span></abbr>:""}</td>

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
