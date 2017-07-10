import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, logout, fetchUsers } from '../actions/users';
import { fetchLoadingBills } from '../actions/loadingBills';
import { fetchPoints } from '../actions/points';
import { fetchClients } from '../actions/clients';
import { fetchDrivers } from '../actions/drivers';
import { fetchVehicles } from '../actions/vehicles';
import { fetchNomenclature } from '../actions/nomenclature';

import LoginPage from './LoginPage';
import Nav from '../components/Nav';
import LoadingBillsList from '../components/documents/loadingBills/LoadingBillsList';

class Base extends Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.fetchUsers();
    this.props.fetchDrivers();
    this.props.fetchPoints();
    this.props.fetchClients();
    this.props.fetchVehicles();
    this.props.fetchNomenclature();
    this.props.fetchLoadingBills();
  }

  render() {
    const { loggedIn, user } = this.props.users;
    let elementToRender = <LoginPage login={this.props.login} />;
    if (loggedIn) {
      const users = {
        data: this.props.users.data,
        isFetched: this.props.users.isFetched,
      };
      elementToRender = (
        <div>
          <Nav user={user} logout={this.props.logout} refresh={this.refresh} />
          <LoadingBillsList
            loadingBills={this.props.loadingBills}
            drivers={this.props.drivers}
            points={this.props.points}
            clients={this.props.clients}
            vehicles={this.props.vehicles}
            nomenclature={this.props.nomenclature}
            users={users}
          />
        </div>
      );
    }
    return (
      <div className="container-fluid">
        {elementToRender}
      </div>
    );
  }
}

Base.propTypes = {
  users: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    loggedIn: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      role: PropTypes.role,
    }),
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  loadingBills: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  points: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  clients: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  drivers: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  vehicles: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  nomenclature: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
    e: PropTypes.string,
  }).isRequired,

  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,

  fetchUsers: PropTypes.func.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  fetchNomenclature: PropTypes.func.isRequired,
  fetchLoadingBills: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
  loadingBills: state.loadingBills,
  drivers: state.drivers,
  points: state.points,
  clients: state.clients,
  vehicles: state.vehicles,
  nomenclature: state.nomenclature,
}), {
  login,
  logout,
  fetchUsers,
  fetchDrivers,
  fetchPoints,
  fetchClients,
  fetchVehicles,
  fetchNomenclature,
  fetchLoadingBills,
})(Base);
