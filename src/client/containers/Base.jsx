import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage';
import Nav from '../components/Nav';
import Points from '../components/catalogs/points/Points';
import Drivers from '../components/catalogs/drivers/Drivers';
import Vehicles from '../components/catalogs/vehicles/Vehicles';
import Clients from '../components/catalogs/clients/Clients';
import Nomenclature from '../components/catalogs/nomenclature/Nomenclature';
import Scales from '../components/catalogs/scales/Scales';
import LoadingBills from '../components/documents/loadingBills/LoadingBills';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authed) {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired,
};

const Base = ({ authed }) => (
  <Router>
    <div className="container-fluid">
      {authed ? <Nav /> : null}
      <Route
        exact
        path="/"
        render={() => {
          if (authed) {
            return <Redirect to="/loadingBills" />;
          }
          return <Redirect to="/login" />;
        }}
      />
      <Route
        path="/login"
        render={() => {
          if (authed) {
            return <Redirect to="/" />;
          }
          return <LoginPage />;
        }}
      />
      <PrivateRoute path="/loadingBills" component={LoadingBills} authed={authed} />
      <PrivateRoute path="/drivers" component={Drivers} authed={authed} />
      <PrivateRoute path="/vehicles" component={Vehicles} authed={authed} />
      <PrivateRoute path="/clients" component={Clients} authed={authed} />
      <PrivateRoute path="/points" component={Points} authed={authed} />
      <PrivateRoute path="/nomenclature" component={Nomenclature} authed={authed} />
      <PrivateRoute path="/scales" component={Scales} authed={authed} />
    </div>
  </Router>
);

Base.propTypes = {
  authed: PropTypes.bool.isRequired,
};

export default connect(state => ({
  authed: state.users.loggedIn,
}))(Base);
