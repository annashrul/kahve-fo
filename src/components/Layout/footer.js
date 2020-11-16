import React, { Component } from 'react';
import moment from 'moment'

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 text-center">
              <small><span className="badge-info">CAUTION</span> Trading crypto assets is a high risk activity. Crypto asset prices are highly volatile, where prices can change significantly from time to time. Please use extra judgment in making decisions to buy or sell crypto assets. Kahve is only responsible for the initial investment if the active balance is the same as your investment amount. All crypto asset trading decisions are independent decisions by the user.</small>
            </div>
            <div className="col-6 offset-3">
              <p className="text-center">&copy;&nbsp;{localStorage.getItem('site_title')===undefined||localStorage.getItem('site_title')===''?'':localStorage.getItem('site_title')} <a href="/" className="external">{moment().format('YYYY')}</a></p>
              {/* Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)*/}
            </div>
          </div>
        </div>
      </footer>
    )
  }
};
