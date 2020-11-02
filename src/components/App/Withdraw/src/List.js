import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";

import Paginationq from "helper";
import Preloader from "Preloader";

class List extends Component {
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
                <div className="table-responsive" style={{overflowX: "auto"}}>
                    <table className="table table-hover table-bordered">
                        <thead className="bg-light">
                        <tr>
                            <th className="text-black" style={ centerStyle} rowSpan="2">#</th>
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
                                                        <td style={ leftStyle}>{v.kd_trx}</td>

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