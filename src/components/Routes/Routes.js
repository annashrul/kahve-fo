import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Landing from '../App/Landing/';
import Dashboard from '../App/Dashboard';
const Routes = (
    <div>
        <Switch>
            <Route path="/" exact strict component={Landing} />
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/dashboard" exact strict component={Dashboard} />
            {/* DASHBOARD SECTION END */}
           
            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;