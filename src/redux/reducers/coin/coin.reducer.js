import {COIN} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    isLoadingPost:false,
    status:"",
    msg:"",
    data:[],
    data_type:[],
};

export const coinReducer = (state=initialState,action) => {
    switch (action.type) {
        case COIN.SUCCESS_TYPE:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_type:action.data.result
            });
        case COIN.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result,
            });
        case COIN.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case COIN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case COIN.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        default:
            return state
    }
};