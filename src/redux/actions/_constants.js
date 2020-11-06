/*****************
 * isLading
*****************/
export const LOADING = {
  IS_LOADING: "IS_LOADING"
}

/****************
      TOKEN
*****************/
export const TOKEN = {
  GET: "GET_TOKEN"
}

export const HEADERS ={
  URL: atob(document.getElementById("hellyeah").value),
  TOKEN:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwY2RiN2M5OC0wNWNmLTQ4NDgtOGM3Yy0yZTFiYTczZGUwNmYiLCJpYXQiOjE1NzAxNzM0ODYsImV4cCI6MTU3MDc3ODI4Nn0.1NiWtt2luG83am8FJSvWpL5p35Oxd8GSJJTwhFmAdgw",
  USERNAME: "netindo",
  PASSWORD: "$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO"
}

/****************
      PASSWORD MODAL ADD LOCATION
*****************/
export const LOC_VERIF ={
  password: "bmV0aW4xMjM0YSE="
}

/****************
      MODAL
*****************/
export const MODALS = {
  IS_MODAL_OPEN: 'IS_MODAL_OPEN',
  MODAL_TYPE : 'MODAL_TYPE'
}

/****************
      AUTH
*****************/
export const AUTH = {
  FETCH_DATAS:'FETCH_DATAS',
  GET_ERRORS:'GET_ERRORS',
  TEST_DISPATCH:'TEST_DISPATCH',
  SET_CURRENT_USER:'SET_CURRENT_USER',
  SET_LOGGED_USER:'SET_LOGGED_USER'
}
export const REGISTER = {
  LOADING: 'SET_REGISTER_LOADING',
  PROCESS: 'SET_REGISTER_PROCESS',
  SUCCESS: 'SET_REGISTER_SUCCESS',
  FAILED: 'SET_REGISTER_FAILED',
  SETEMAIL: 'SET_EMAIL',
}

/****************
    USERS
*****************/
export const PROFILE = {
  LOADING: 'SET_PROFILE_LOADING',
  SUCCESS: 'SUCCESS_PROFILE',
  FAILED: 'FAILED_PROFILE',
  DETAIL: 'SUCCESS_PROFILE_DETAIL',
}

/****************
 DASHBOARD
 *****************/
export const DASHBOARD = {
    LOADING: 'SET_DASHBOARD_LOADING',
    SUCCESS: 'SET_DASHBOARD_SUCCESS',
    SUCCESS_NEWEST: 'SET_DASHBOARD_SUCCESS_NEWEST',
    FAILED: 'SET_DASHBOARD_FAILED',
    DETAIL: 'SET_DASHBOARD_DETAIL',
    POST_LOADING: 'SET_DASHBOARD_POST_LOADING'
}
/****************
 SITE SECTION
 *****************/
export const SITE = {
    LOADING: 'SET_SITE_LOADING',
    SUCCESS: 'SET_SITE_SUCCESS',
    SUCCESS_LIST: 'SET_SITE_SUCCESS_LIST',
    SUCCESS_FOLDER: 'SET_SITE_SUCCESS_FOLDER',
    SUCCESS_FAQ: 'SET_SITE_SUCCESS_FAQ',
    SUCCESS_TABLES: 'SET_SITE_SUCCESS_TABLES',
    FAILED: 'SET_SITE_FAILED',
    DETAIL: 'SET_SITE_DETAIL',
    SUCCESS_CHECK: 'SET_SITE_SUCCESS_CHECK',
    TRIGGER_ECAPS: 'SET_TRIGGER_ECAPS',
    DOWNLOAD_TXT: 'SET_DOWNLOAD_TXT',
    TRIGGER_MOBILE_ECAPS: 'SET_TRIGGER_MOBILE_ECAPS'
}

/****************
 SLOT
 *****************/
export const SLOT = {
    LOADING: 'SET_SLOT_LOADING',
    SUCCESS: 'SET_SLOT_SUCCESS',
    SUCCESS_NEWEST: 'SET_SLOT_SUCCESS_NEWEST',
    FAILED: 'SET_SLOT_FAILED',
    DETAIL: 'SET_SLOT_DETAIL',
    POST_LOADING: 'SET_SLOT_POST_LOADING'
}


/****************
 TRANSFER
 *****************/
export const TRANSFER = {
  LOADING: 'SET_TRANSFER_LOADING',
  SUCCESS: 'SET_TRANSFER_SUCCESS',
  FAILED: 'SET_TRANSFER_FAILED',
  LOADING_POST: 'SET_TRANSFER_LOADING_POST',
  SUCCESS_REPORT: 'SET_TRANSFER_SUCCESS_REPORT',
  SUCCESS_CONFIG: 'SET_TRANSFER_SUCCESS_CONFIG',

}

/****************
 WITHDRAW
 *****************/
export const WITHDRAW = {
  LOADING: 'SET_WITHDRAW_LOADING',
  SUCCESS: 'SET_WITHDRAW_SUCCESS',
  FAILED: 'SET_WITHDRAW_FAILED',
  LOADING_POST: 'SET_WITHDRAW_LOADING_POST',
  SUCCESS_REPORT: 'SET_WITHDRAW_SUCCESS_REPORT',
  SUCCESS_CONFIG: 'SET_WITHDRAW_SUCCESS_CONFIG',

}

/****************
 TRANSACTION
 *****************/
export const TRANSACTION = {
  LOADING: 'SET_TRANSACTION_LOADING',
  FAILED: 'SET_TRANSACTION_FAILED',
  SUCCESS_REPORT: 'SET_TRANSACTION_SUCCESS_REPORT',

}

/****************
 INVEST
 *****************/
export const INVEST = {
  LOADING: 'SET_INVEST_LOADING',
  SUCCESS: 'SET_INVEST_SUCCESS',
  FAILED: 'SET_INVEST_FAILED',
  LOADING_POST: 'SET_INVEST_LOADING_POST',
  SUCCESS_REPORT: 'SET_INVEST_SUCCESS_REPORT',
  SUCCESS_CONFIG: 'SET_INVEST_SUCCESS_CONFIG',

}

/****************
 COIN
 *****************/
export const COIN = {
  LOADING: 'SET_COIN_LOADING',
  SUCCESS: 'SET_COIN_SUCCESS',
  FAILED: 'SET_COIN_FAILED',
  LOADING_POST: 'SET_COIN_LOADING_POST',
  SUCCESS_TYPE: 'SET_COIN_SUCCESS_TYPE',

}