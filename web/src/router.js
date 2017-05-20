import React from 'react';
import { Router, Route } from 'dva/router'
import IndexPage from './routes/IndexPage'
import Categories from './routes/Categories.js'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/categories" component={Categories} />
    </Router>
  );
}

export default RouterConfig;
