import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Holidays from '../pages/Holidays'
import PrivacyPolicy from '../pages/PrivacyPolicy'

const Routes = () =>
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Holidays} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route component={Holidays} />
      </Switch>
    </Fragment>
  </Router>

export default Routes
