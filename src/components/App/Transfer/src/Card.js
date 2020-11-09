import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";

class Card extends Component {
    render(){
        return(
            <div>
                <div className="card img-thumbnail text-center pb-5 pt-5">
                    <div className="card-body">
                        <h3>You can easily transfer your active balance to someone you want to share</h3>
                        <p></p>
                        <p className="font-20">Write the wallet address destination that you will send coins correctly!</p>
                        <small className="text-danger">We are not responsible for transfer errors due to your mistake in writing your wallet address!</small>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
    return {
        auth:state.auth,
    }
}
export default connect(mapStateToProps)(Card);