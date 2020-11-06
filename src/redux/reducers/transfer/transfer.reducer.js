import {TRANSFER} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    isLoadingPost:false,
    status:"",
    msg:"",
    data:[],
    data_report:[],
    data_config:[],
};

export const transferReducer = (state=initialState,action) => {
    switch (action.type) {
        case TRANSFER.SUCCESS_REPORT:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report:action.data.result
            });
        case TRANSFER.SUCCESS_CONFIG:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_config:action.data.result
            });
        case TRANSFER.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result,
            });
        case TRANSFER.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case TRANSFER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case TRANSFER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        default:
            return state
    }
};