import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

import { fetchClients, deleteClient } from '../../actions/clients';
import { fetchDrivers, deleteDriver } from '../../actions/drivers';
import { fetchNomenclature, deleteNomenclature } from '../../actions/nomenclature';
import { fetchPoints, deletePoint } from '../../actions/points';
import { fetchScales, deleteScale } from '../../actions/scales';
import { fetchUsers, deleteUser } from '../../actions/users';
import { fetchVehicles, deleteVehicle } from '../../actions/vehicles';
import { fetchLoadingBills, deleteLoadingBill } from '../../actions/loadingBills';

import { Spinner, Icon, SearchPanel, ListToolbar } from '../elements';
import { format } from '../../utils';

import { CSS_OBJECT_HEADER } from '../../constants';

class ElementsCleaner extends Component {
  constructor(props) {
    super(props);

    this.baseUrl = '/settings';
    this.table = null;

    this.handleClean = this.handleClean.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.generateData = this.generateData.bind(this);
  }

  componentDidMount() {
    this.props.fetchClients();
    this.props.fetchDrivers();
    this.props.fetchNomenclature();
    this.props.fetchPoints();
    this.props.fetchScales();
    this.props.fetchUsers();
    this.props.fetchVehicles();
    this.props.fetchLoadingBills();
  }

  handleClean() {
    const { data, selectedRowKeys: selected } = this.table.state;
    for (let i = 0; i < selected.length; i += 1) {
      const index = selected[i];
      const { id, method } = data[index];
      method(id);
    }
  }

  handleRefresh() {
    this.props.fetchClients();
    this.props.fetchDrivers();
    this.props.fetchNomenclature();
    this.props.fetchPoints();
    this.props.fetchScales();
    this.props.fetchUsers();
    this.props.fetchVehicles();
    this.props.fetchLoadingBills();
  }

  generateData() {
    const data = [];
    let index = 0;

    // Documents
    const loadingBills = this.props.loadingBills.data;
    for (let i = 0; i < loadingBills.length; i += 1) {
      const { id, mark, number, createdAt } = loadingBills[i];
      if (mark) {
        data.push({
          i: index,
          id,
          title: `Товарно-транспортна накладна - ${number} від ${format.formatDate(createdAt)}`,
          method: this.props.deleteLoadingBill,
        });
        index += 1;
      }
    }

    // Catalogs
    const catalogs = {
      clients: {
        data: this.props.clients.data,
        title: 'Клієнт',
        method: this.props.deleteClient,
      },
      drivers: {
        data: this.props.drivers.data,
        title: 'Водій',
        method: this.props.deleteDriver,
      },
      nomenclature: {
        data: this.props.nomenclature.data,
        title: 'Номенклатура',
        method: this.props.deleteNomenclature,
      },
      points: {
        data: this.props.points.data,
        title: 'Пункт',
        method: this.props.deletePoint,
      },
      scales: {
        data: this.props.scales.data,
        title: 'Ваги',
        method: this.props.deleteScale,
      },
      users: {
        data: this.props.users.data,
        title: 'Користувач',
        method: this.props.deleteUser,
      },
      vehicles: {
        data: this.props.vehicles.data,
        title: 'Транспортний засіб',
        method: this.props.deleteVehicle,
      },
    };
    const keys = Object.keys(catalogs);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const catalog = catalogs[key];
      for (let j = 0; j < catalog.data.length; j += 1) {
        const { id, mark, name } = catalog.data[j];
        if (mark) {
          data.push({
            i: index,
            id,
            title: `${catalog.title} - ${name}`,
            method: catalog.method,
          });
          index += 1;
        }
      }
    }

    return data;
  }

  renderToolbar(props) {
    return (
      <ListToolbar
        {...props}
        mainButtons={(
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleClean}
            >
              <Icon.Remove />
              Видалити
            </button>
          </div>
        )}
        secondaryButtons={(
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.handleRefresh}
            >
              <Icon.Refresh />
              Оновити
            </button>
          </div>
        )}
      />
    );
  }

  renderTable() {
    const data = this.generateData();
    const options = {
      clearSearch: true,
      searchPanel: props => (<SearchPanel {...props} />),
      toolBar: props => (this.renderToolbar(props)),
    };
    return (
      <BootstrapTable
        ref={(table) => {this.table = table;}}
        data={data}
        selectRow={{ mode: 'checkbox' }}
        options={options}
        hover
        search
        multiColumnSearch
      >
        <TableHeaderColumn
          dataField="title"
        >
          Елемент
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="i"
          hidden
          isKey
        >
          index
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }

  render() {
    const isFetchedClients = this.props.clients.isFetched;
    const isFetchedDrivers = this.props.drivers.isFetched;
    const isFetchedNomenclature = this.props.nomenclature.isFetched;
    const isFetchedPoints = this.props.points.isFetched;
    const isFetchedScales = this.props.scales.isFetched;
    const isFetchedUsers = this.props.users.isFetched;
    const isFetchedVehicles = this.props.vehicles.isFetched;
    const isFetchedLoadingBills = this.props.loadingBills.isFetched;

    let elementsToRender = <Spinner />;
    if (isFetchedClients
      && isFetchedDrivers
      && isFetchedNomenclature
      && isFetchedPoints
      && isFetchedScales
      && isFetchedUsers
      && isFetchedVehicles
      && isFetchedLoadingBills) {
      elementsToRender = (
        <div className="elements-cleaner">
          <p className={CSS_OBJECT_HEADER}>
            <Link to={this.baseUrl}>Налаштування</Link> / Видалення елементів
          </p>
          {this.renderTable()}
        </div>
      );
    }
    return (
      <div>
        {elementsToRender}
      </div>
    );
  }
}

ElementsCleaner.propTypes = {
  clients: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  drivers: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  nomenclature: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  points: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  scales: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  users: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  vehicles: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  loadingBills: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,
  fetchClients: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  deleteDriver: PropTypes.func.isRequired,
  fetchNomenclature: PropTypes.func.isRequired,
  deleteNomenclature: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  deletePoint: PropTypes.func.isRequired,
  fetchScales: PropTypes.func.isRequired,
  deleteScale: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
  fetchLoadingBills: PropTypes.func.isRequired,
  deleteLoadingBill: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(state => ({
  clients: state.clients,
  drivers: state.drivers,
  nomenclature: state.nomenclature,
  points: state.points,
  scales: state.scales,
  users: state.users,
  vehicles: state.vehicles,
  loadingBills: state.loadingBills,
}), {
  fetchClients,
  deleteClient,
  fetchDrivers,
  deleteDriver,
  fetchNomenclature,
  deleteNomenclature,
  fetchPoints,
  deletePoint,
  fetchScales,
  deleteScale,
  fetchUsers,
  deleteUser,
  fetchVehicles,
  deleteVehicle,
  fetchLoadingBills,
  deleteLoadingBill,
})(ElementsCleaner);
