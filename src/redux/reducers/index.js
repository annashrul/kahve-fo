import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {withdrawReducer} from './withdraw/withdraw.reducer';
import {investReducer} from './invest/invest.reducer';
import {transactionReducer} from './transaction/transaction.reducer';
import {coinReducer} from './coin/coin.reducer';
import {transferReducer} from './transfer/transfer.reducer';
import {profileReducer} from './profile/profile.reducer';

export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    withdrawReducer,
    investReducer,
    transactionReducer,
    coinReducer,
    transferReducer,
    profileReducer,

    auth: authReducer,
    errors : errorsReducer
});