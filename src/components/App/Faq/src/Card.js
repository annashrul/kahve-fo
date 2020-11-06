import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import { FetchFaq } from '../../../../redux/actions/site.action';
import Paginationq from "helper";
import Preloader from "Preloader";

class Card extends Component {

    handlePageChange(pageNumber){
        // localStorage.setItem("page_piutang_report",pageNumber);
        this.props.dispatch(FetchFaq(pageNumber))
    }
    render(){
        const {
            per_page,
            last_page,
            current_page,
            data
        } = this.props.dataFaq;
        return(
            <div>
                {
                !this.props.isLoading?
                <div>
                    <div className="row">
                        {
                            (
                                typeof data === 'object' ? data.length>0?
                                    data.map((v,i)=>{
                                        return(
                                            <div className="col-md-4 mb-4" key={i}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="single-conatct--area d-flex justify-content-between">
                                                        <div className="single-contact-area d-flex">
                                                            <div>
                                                                <div className="user-img mr-3 text-center bg-primary p-2 rounded-circle"><h3 className=" text-white">{i+1 + (10 * (parseInt(current_page,10)-1))}</h3></div>
                                                            </div>
                                                            <div>
                                                                <h4 className="mb-1 font-18 text-justify">{v.question}</h4>
                                                                <div className="contact-address mt-15">
                                                                    <h5 class="text-dark font-weight-bold font-12 text-primary">Answer :</h5>
                                                                    <p className="mb-2 font-weight-bold font-15 text-justify">{v.answer}</p>
                                                                </div>
                                                            </div>
                                                        </div>
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
                    
                    <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                        <Paginationq
                            current_page={current_page}
                            per_page={per_page}
                            total={parseInt((per_page*last_page),10)}
                            callback={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
                :
                <Preloader/>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
    return {
        dataFaq:state.siteReducer.data_faq,
        isLoading:state.siteReducer.isLoading,
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(Card);