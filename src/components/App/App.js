import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import store from '../../redux/store';
import setAuthToken from '../../utils/setAuthToken';
import {setCurrentUser, setLoggedin,logoutUser} from '../../redux/actions/authActions';

import Routes from 'components/Routes/Routes';
import { DBConfig } from 'DBConfig';
import { initDB } from 'react-indexed-db';
 import {get} from "components/model/app.model";
import axios from 'axios';
import moment from 'moment'

initDB(DBConfig);

axios.defaults.headers.common['identities'] = `netindo`;
axios.defaults.headers.common['sercet-id'] = `$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO`;
axios.defaults.headers.common['connectifity-agent'] = `apps`;
// Check token in localStorage
  if (localStorage.kahvebit) {
    setAuthToken(atob(localStorage.kahvebit));
    store.dispatch(setLoggedin(true))
    const sess = get('sess');
      sess.then(res => {
        if (res.length!==0) {
          // Set auth token header auth
          setAuthToken(res[0].token);
          store.dispatch(setCurrentUser(res[0]))

          // Decode auth token and get user info
          // let decoded = jwt_decode(localStorage.jwtToken);
          // Dispatch user info
          // Check for expire token
          // const currentTime = Date.now() /1000;
          // if(decoded.exp < currentTime){
          //   // Logout User
          //   store.dispatch(logoutUser());
          //   // TODO: Clear current profile
          //   // Redirect to login
          //   window.location.href = '/login';
          // }
        }else{
          store.dispatch(logoutUser());
          localStorage.removeItem('kahvebit')
          // TODO: Clear current profile
          // Redirect to login
          window.location.href = '/login';
        }
    })
  }

class App extends Component {

  setTime(){

    let currentdate = new Date();
    let hours = currentdate.getHours();    

      // correct for number over 24, and negatives
    if( hours >= 24 ){ hours -= 24; }
    if( hours < 0   ){ hours += 12; }

    // add leading zero, first convert hours to string
    hours = hours + "";
    if( hours.length === 1 ){ hours = "0" + hours; }

    // minutes are the same on every time zone
    let minutes = currentdate.getMinutes();

    // add leading zero, first convert hours to string
    minutes = minutes + "";
    if( minutes.length === 1 ){ minutes = "0" + minutes; }

    let seconds = currentdate.getSeconds();
    // console.log(window.location.href)
    // console.log(moment(currentdate).format('HH:mm:ss'))
    // console.log("cek statis",moment('15:59:59', 'HH:mm:ss')+" "+moment('16:59:59', 'HH:mm:ss'))
    // console.log("cek isBetween",moment(currentdate).isBetween(moment('15:59:59', 'HH:mm:ss'),moment('16:59:59', 'HH:mm:ss'),null,'[]'))
    // console.log("cek isAfter",moment(currentdate).isAfter(moment('15:59:59').format('HH:mm:ss')))
    // console.log("cek isBefore",moment(currentdate).isBefore(moment('15:59:59').format('HH:mm:ss')))
    if(String(hours+minutes+seconds)==="235959"||(moment(currentdate).isBetween(moment('23:59:59', 'HH:mm:ss'),moment('00:59:59', 'HH:mm:ss'),null,'[]'))){
      if(window.location.pathname!=='/'){
        store.dispatch(logoutUser());
        localStorage.removeItem('npos')
        // TODO: Clear current profile
        // Redirect to login
        window.location.href = '/';
      }
    } 
    // else if(moment(currentdate).isBetween(moment('15:59:59', 'HH:mm:ss'),moment('16:59:59', 'HH:mm:ss'),null,'[]')) {
    //   store.dispatch(logoutUser());
    //   localStorage.removeItem('npos')
    //   // TODO: Clear current profile
    //   // Redirect to login
    //   window.location.href = '/';
    // }
  }

  
  componentDidMount(){
    window.setInterval(function () {
        this.setTime();
    }.bind(this), 1000);
  }

  componentWillMount(){
      this.setTime()
  }

  render() {
    return (
      <Router>
            {Routes}
      </Router>
    );
  }
}

export default App;