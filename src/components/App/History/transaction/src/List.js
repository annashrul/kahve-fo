import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import moment from 'moment'
import Paginationq from "helper";
import Preloader from "Preloader";
import { FetchTransactionReport } from 'redux/actions/transaction/transaction.action';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSimple : false
        }
        this.handleSimple = this.handleSimple.bind(this)
    }
    resize = () => this.forceUpdate()

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    handlePageChange(pageNumber){
        // localStorage.setItem("page_piutang_report",pageNumber);
        this.props.dispatch(FetchTransactionReport(pageNumber,'', this.props.auth.user.id))
    }
    handleSimple(e){
        this.setState({
            isSimple:!this.state.isSimple
        })
    }
    render(){
        const centerStyle = {verticalAlign: "middle", textAlign: "center"};
        const leftStyle = {verticalAlign: "middle", textAlign: "left"};
        
    const {
        per_page,
        last_page,
        current_page,
        data
    } = this.props.transactionReport;
        return(
            <div>
            {
                !this.props.isLoading?(
                <div >
                {/* <div className="card">
                    <div className="card-body pb-0 bg-light"> */}
                    <div className="d-flex align-items-center justify-content-between">
                        <h3>Your History</h3>
                        
                        <div class="new-checkbox" style={{display:window.screen.width >= 1280?'none':''}}>
                            <label class="switch">
                                <input type="checkbox" checked={this.state.isSimple} onChange={(e)=>this.handleSimple(e)}/>
                                <span class="slider"></span>
                            </label>
                        </div>

                    </div>
                        { (this.state.isSimple? window.screen.width : 1280) >=  1280?
                        
                            <div style={{overflowX: "auto"}}>
                                <table className="table table-hover">
                                    <thead className="bg-primary">
                                    <tr>
                                        <th className="text-white font-20" style={ centerStyle} width="5%" rowSpan="2">No</th>
                                        <th className="text-white font-20" style={ centerStyle} width="10%" rowSpan="2">Date/Time</th>
                                        <th className="text-white font-20" style={ centerStyle} width="65%" rowSpan="2">Note</th>
                                        <th className="text-white font-20" style={ centerStyle} width="20%" rowSpan="2">Value</th>
                                    </tr>
                                    </thead>
                                            <tbody className="bg-white">
                                            {
                                                (
                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            return(
                                                                <tr key={i}>
                                                                    <td style={ centerStyle}>{i+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                                    <td style={ centerStyle}>
                                                                        <h5 className="mb-1">{moment(v.created_at).format('HH:MM')}</h5>
                                                                        <p className="mb-0 text-muted">{moment(v.created_at).format('YYYY-DD-MM')}</p>
                                                                    </td>
                                                                    <td style={ leftStyle}>
                                                                        <p className="mb-0 text-muted">{v.note}</p>
                                                                        <h6 className="mb-1">{v.kd_trx}</h6>
                                                                    </td>
                                                                    <td style={ leftStyle}>
                                                                        <h6 className="mb-1 text-success">+ {v.amount_in}</h6>
                                                                        <p className="mb-0 text-danger">- {v.amount_out}</p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        : "No data." : "No data."
                                                )
                                            }
                                            </tbody>
                                </table>
                            </div>

                            :

                            <div id="profile-list-right" className="py-2" style={{zoom:'70%'}}>
                                {
                                    (
                                        typeof data === 'object' ? data.length>0?
                                            data.map((v,i)=>{
                                                return(
                                                    <div className="card rounded mb-2" key={i}>
                                                        <div className="card-body p-3">
                                                            <div className="media">
                                                                <div className="media-body text-center mr-2" style={{maxWidth:'100px',minWidth:'100px'}}>
                                                                    <h5 className="mb-1">{moment(v.created_at).format('HH:MM')}</h5>
                                                                    <p className="mb-0 text-muted">
                                                                    {moment(v.created_at).format('YYYY-DD-MM')}
                                                                    </p>
                                                                </div>
                                                                <div className="media-body text-left">
                                                                    <p className="mb-0 text-mute">{v.note}</p>
                                                                    <h6 className="mb-1 text-black">{v.kd_trx}</h6>
                                                                </div>
                                                                <div className="media-body text-right">
                                                                    <h6 className="mb-1 text-success">+</h6>
                                                                    <p className="mb-0 text-danger">
                                                                    -
                                                                    </p>
                                                                </div>
                                                                <div className="media-body text-right ml-1" style={{maxWidth:'200px',minWidth:'200px'}}>
                                                                    <h6 className="mb-1 text-success">{v.amount_in}</h6>
                                                                    <p className="mb-0 text-danger">
                                                                    {v.amount_out}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : "No data." : "No data."
                                    )
                                }
                            
                            </div>
                        }
                    {/* </div> */}
                    </div>
                ):<Preloader/>
            }
                <div style={{"marginTop":"20px","float":"right"}}>
                    <Paginationq
                        current_page={current_page}
                        per_page={per_page}
                        total={parseInt((per_page*last_page),10)}
                        callback={this.handlePageChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
    return {
        transactionReport:state.transactionReducer.data_report,
        isLoading: state.transactionReducer.isLoading,
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(List);