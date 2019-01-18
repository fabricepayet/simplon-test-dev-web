import React, { Fragment } from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AssignementsPage from './pages/AssignementsPage';
import UsersPage from './pages/UsersPage';

import Header from './components/Header';


const App = () => (
  <Fragment>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/users" component={UsersPage} />
      <Route exact path="/assignements" component={AssignementsPage} />
      <Redirect to="/assignements" />
    </Switch>
  </Fragment>
);

export default App;
