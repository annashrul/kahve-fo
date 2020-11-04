import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";

import { statusQ} from '../../../../helper';
import Paginationq from "helper";
import Preloader from "Preloader";
import { FetchWithdrawReport } from '../../../../redux/actions/withdraw/withdraw.action';

class List extends Component {
    // constructor(props){
    //     super(props);
    //     this.approve = this.approve.bind(this);
    //     this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSearch = this.handleSearch.bind(this);
    //     this.HandleChangeSort = this.HandleChangeSort.bind(this);
    //     this.HandleChangeFilter = this.HandleChangeFilter.bind(this);
    //     this.HandleChangeStatus = this.HandleChangeStatus.bind(this);
    //     this.HandleChangeSearchBy = this.HandleChangeSearchBy.bind(this);
    //     this.state={
    //         detail:{},
    //         where_data:"",
    //         any:"",
    //         location:"",
    //         location_data:[],
    //         startDate:moment(new Date()).format("yyyy-MM-DD"),
    //         endDate:moment(new Date()).format("yyyy-MM-DD"),
    //         sort:"",
    //         sort_data:[],
    //         filter:"",
    //         filter_data:[],
    //         status:"",
    //         status_data:[],
    //         search_by:"kd_trx",
    //         search_by_data:[
    //             {value: "kd_trx", label:'Kode Trx'},
    //             {value: "nama", label:'Customer'},
    //         ],
    //     }
    // }
    
    handlePageChange(pageNumber){
        // localStorage.setItem("page_piutang_report",pageNumber);
        this.props.dispatch(FetchWithdrawReport(pageNumber))
    }
    render(){const centerStyle = {verticalAlign: "middle", textAlign: "center"};
    const leftStyle = {verticalAlign: "middle", textAlign: "left"};
    // const rightStyle = {verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
    const {
        per_page,
        last_page,
        current_page,
        data
    } = this.props.withdrawReport;
        return(
            <div>
                <h3>Recently Withdraw</h3>
                <div style={{overflowX: "auto"}}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Users</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Coin</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Amount</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Status</th>
                            <th className="text-black" style={ centerStyle} rowSpan="2">Kode TRX</th>
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
                                                        <td style={ centerStyle}>{v.users}</td>
                                                        <td style={ centerStyle}>{v.coin}</td>
                                                        <td style={ leftStyle}>{v.amount}</td>
                                                        <td style={ centerStyle}>{statusQ(v.status===0?'warning':v.status===1?'success':'danger',v.status===0?'Process':v.status===1?'Success':'Void')}</td>
                                                        <td style={ centerStyle}>{v.kd_trx}</td>

                                                    </tr>
                                                )
                                            })
                                            : "No data." : "No data."
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
        withdrawReport:state.withdrawReducer.data_report,
        isLoading: state.withdrawReducer.isLoading,
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(List);