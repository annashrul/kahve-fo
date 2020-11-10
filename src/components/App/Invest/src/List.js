import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";

import { statusQ} from '../../../../helper';
import Paginationq from "helper";
import Preloader from "Preloader";
import { FetchInvestReport } from '../../../../redux/actions/invest/invest.action';

class List extends Component {
    handlePageChange(pageNumber){
        // localStorage.setItem("page_piutang_report",pageNumber);
        this.props.dispatch(FetchInvestReport(pageNumber))
    }
    render(){
        const centerStyle = {verticalAlign: "middle", textAlign: "center"};
        const leftStyle = {verticalAlign: "middle", textAlign: "left"};
    // const rightStyle = {verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
    const {
        per_page,
        last_page,
        current_page,
        data
    } = this.props.investReport;
        return(
            <div>
                <h3>Recently Invest</h3>
                <div style={{overflowX: "auto"}}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" style={ centerStyle} rowSpan="2">No</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Slot Number</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Coin</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Amount</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Status</th>
                            {/* <th className="text-black" style={ centerStyle} rowSpan="2">Kode TRX</th> */}
                        </tr>
                        </thead>
                        {
                            !this.props.isLoading?(
                                <tbody>
                                {
                                    (
                                        typeof data === 'object' ? data.length>0?
                                            data.map((v,i)=>{
                                                return(
                                                    <tr key={i}>
                                                        <td style={ centerStyle}>{i+1 + (10 * (parseInt(current_page,10)-1))}</td>
                                                        <td style={ centerStyle}>{v.slot_no}</td>
                                                        <td style={ centerStyle}>{v.coin}</td>
                                                        <td style={ leftStyle}>{v.amount}</td>
                                                        <td style={ centerStyle}>{statusQ(v.status===0?'warning':v.status===1?'success':'danger',v.status===0?'Pending':v.status===1?'Success':'Void')}</td>
                                                        {/* <td style={ centerStyle}>{v.kd_trx}</td> */}

                                                    </tr>
                                                )
                                            })
                                            : <tr><td colSpan="5" style={ centerStyle}>No data.</td></tr> : <tr><td colSpan="5" style={ centerStyle}>No data.</td></tr>
                                    )
                                }
                                </tbody>
                            ):<Preloader/>
                        }
                    </table>

                </div>
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
        investReport:state.investReducer.data_report,
        isLoading: state.investReducer.isLoading,
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(List);