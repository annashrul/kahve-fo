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

    if(String(hours)==="00"||(moment(currentdate).isBetween(moment('00', 'HH'),moment('01', 'HH'),null,'[]'))){
      if(window.location.pathname!=='/'){
        store.dispatch(logoutUser());
        localStorage.removeItem('kahvebit')
        // TODO: Clear current profile
        // Redirect to login
        window.location.href = '/';
      }
    } 
  }

  
  componentDidMount(){
    window.setInterval(function () {
        this.setTime();
    }.bind(this), 1000);
  }

  componentWillMount(){
      this.setTime()
      this.initFetch()
  }

  initFetch() {
    fetch(HEADERS.URL + `site/get`)
      .then(res => res.json())
      .then(
        (data) => {
          if(data.result.isActive){
            if (window.location.pathname !== '/') {
              store.dispatch(logoutUser());
              localStorage.removeItem('kahvebit')
              // TODO: Clear current profile
              // Redirect to login
              window.location.href = '/';
            }
          }
        },
        (error) => {
        }
      )
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