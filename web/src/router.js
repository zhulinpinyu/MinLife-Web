import React from 'react';
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'
import User from './routes/User'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/user" component={User} />
    </Router>
  );
}

export default RouterConfig;
