import React, {Fragment} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import GlobalStyle from '../common/styles/GlobalStyle'
import Holidays from '../pages/Holidays'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import NotFound from '../pages/NotFound'

const Routes = () =>
  <Router>
    <Fragment>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Holidays} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Router>

export default Routes
