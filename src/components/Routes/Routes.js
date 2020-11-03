import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Landing from '../App/Landing/';
import Withdraw from '../App/Withdraw';
// import Transfer from '../App/Landing/transfer';
// import Contact from '../App/Landing/contact-us';
// import Faq from '../App/Landing/faq';
// import Payouts from '../App/Landing/payouts';
import Dashboard from '../App/Dashboard';
const Routes = (
    <div>
        <Switch>
            <Route path="/" exact strict component={Landing} />

            <Route path="/withdraw" exact strict component={Withdraw} />
            {/* <Route path="/transfer" exact strict component={Transfer} /> */}
            {/* <Route path="/contact" exact strict component={Contact} /> */}
            {/* <Route path="/faq" exact strict component={Faq} /> */}
            {/* <Route path="/payouts" exact strict component={Payouts} /> */}
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/dashboard" exact strict component={Dashboard} />
            {/* DASHBOARD SECTION END */}
           
            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;