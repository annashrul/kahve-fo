import React, {Component} from 'react'

class Charts extends Component {
    render(){
        return(
             <div className="col-md-12 box-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.title}</h4>
                        <div  style={{textAlign:'center'}}>
                            <h4>Your Balance,</h4><br/>
                            <h3>0.00128193293213</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts;