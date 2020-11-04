import {PROFILE} from "../../actions/_constants";

const initialState = {
    isLoading:false,
    isLoadingPost:false,
    status:"",
    msg:"",
    data:[],
    data_detail:[],
};

export const profileReducer = (state=initialState,action) => {
    switch (action.type) {
        case PROFILE.SUCCESS:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result,
            });
        case PROFILE.DETAIL:
            return Object.assign({}, state,{
                status:action.data.status,
                msg:action.data.msg,
                data_detail:action.data.result,
            });
        case PROFILE.FAILED:
            return Object.assign({}, state, {
                status:action.data.status,
                msg:action.data.msg,
                data:action.data.result
            });
        case PROFILE.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        default:
            return state
    }
};