import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Holidays from '../pages/Holidays'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import NotFound from '../pages/NotFound'

const Routes = () =>
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Holidays} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Router>

export default Routes
