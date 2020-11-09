import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import { FetchFaq } from '../../../../redux/actions/site.action';
import Paginationq from "helper";
import Preloader from "Preloader";
import { Card, CardBody, ListGroup, ListGroupItem, UncontrolledCollapse } from 'reactstrap';

class List extends Component {

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
                    <ListGroup>
                        {
                            (
                                typeof data === 'object' ? data.length>0?
                                    data.map((v,i)=>{
                                        return(
                                            <ListGroupItem key={i} tag="kahve" style={{cursor:'pointer'}} id={'collapse'+v.id}>
                                                <h5>{v.question}</h5>
                                                <UncontrolledCollapse toggler={'#collapse'+v.id}>
                                                <Card>
                                                    <CardBody>
                                                        <h5 class="text-dark font-weight-bold font-12 text-primary">Answer :</h5>
                                                        <p className="text-justify">{v.answer}</p>
                                                    </CardBody>
                                                </Card>
                                                </UncontrolledCollapse>
                                            </ListGroupItem>
                                        )
                                    })
                                    : "No data." : "No data."
                            )
                        }
                    </ListGroup>
                    
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
export default connect(mapStateToProps)(List);