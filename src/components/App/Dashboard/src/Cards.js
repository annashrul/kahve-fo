import React, {Component} from 'react'

class Cards extends Component {
    render(){
        const amount =this.props.isobj?
                        this.props.data!==undefined?(
                            <h2 style={{paddingLeft:5,marginTop:3}} >
                                {
                                    this.props.data.length>0?
                                    this.props.data.map(item=>{
                                        return(
                                            <div style={{fontSize:'.8rem'}}>{item.total} <small>({item.coin})</small><br/></div>
                                        )
                                    }):(
                                            <div style={{fontSize:'1.5rem'}}>0<br/></div>
                                        )
                                }
                            </h2>
                        )
                        :""
                    :(
                        <h2 style={{paddingLeft:5}} className="font-20">{this.props.data}</h2>
                    )
        return(
            <div className="col-md-6 col-xl-3 box-margin">
                <div className="card">
                    <div className="card-header bg-transparent border-bottom-0">{this.props.title}</div>
                    <div className="card-body">
                        <div className="row justify-content-between" style={{paddingLeft:12,paddingRight:12}}>
                            <h2><i className={this.props.icon}></i></h2>
                            {
                                amount
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;