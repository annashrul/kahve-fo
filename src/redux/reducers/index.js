import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {withdrawReducer} from './withdraw/withdraw.reducer';
import {coinReducer} from './coin/coin.reducer';

export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    withdrawReducer,
    coinReducer,

    auth: authReducer,
    errors : errorsReducer
});