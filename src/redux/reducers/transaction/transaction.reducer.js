import {TRANSACTION} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    status:"",
    msg:"",
    data:[],
    data_report:[],
};

export const transactionReducer = (state=initialState,action) => {
    switch (action.type) {
        case TRANSACTION.SUCCESS_REPORT:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report:action.data.result
            });
        case TRANSACTION.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case TRANSACTION.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
};