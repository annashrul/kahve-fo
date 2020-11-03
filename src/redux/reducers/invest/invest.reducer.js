import {INVEST} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    isLoadingPost:false,
    status:"",
    msg:"",
    data:[],
    data_report:[],
    data_config:[],
};

export const investReducer = (state=initialState,action) => {
    switch (action.type) {
        case INVEST.SUCCESS_REPORT:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_report:action.data.result
            });
        case INVEST.SUCCESS_CONFIG:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_config:action.data.result
            });
        case INVEST.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result,
            });
        case INVEST.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case INVEST.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case INVEST.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        default:
            return state
    }
};