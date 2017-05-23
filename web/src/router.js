import React from 'react';
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'
import User from './routes/User'
import Account from './routes/Account'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/user" component={User} />
      <Route path="/account" component={Account} />
    </Router>
  );
}

export default RouterConfig;
