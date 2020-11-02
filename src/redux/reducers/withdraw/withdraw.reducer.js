import {WITHDRAW} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    isLoadingPost:false,
    status:"",
    msg:"",
    data:[],
    data_report:[],
    data_config:[],
};

export const withdrawReducer = (state=initialState,action) => {
    switch (action.type) {
        case WITHDRAW.SUCCESS_REPORT:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report:action.data.result
            });
        case WITHDRAW.SUCCESS_CONFIG:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_config:action.data.result
            });
        case WITHDRAW.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result,
            });
        case WITHDRAW.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case WITHDRAW.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case WITHDRAW.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        default:
            return state
    }
};