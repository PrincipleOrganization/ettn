import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { catalogs, format } from '../../../utils';
import { CSS_TABLE_CLASS, CSS_OBJECT_HEADER } from '../../../constants';

import { fetchUsers } from '../../../actions/users';
import { fetchLoadingBills, deleteLoadingBill } from '../../../actions/loadingBills';
import { fetchPoints } from '../../../actions/points';
import { fetchDrivers } from '../../../actions/drivers';
import { fetchVehicles } from '../../../actions/vehicles';
import { fetchScales } from '../../../actions/scales';
import { fetchNomenclature } from '../../../actions/nomenclature';

const generateGoodsString = (catalog, goods) => {
  let goodsString = '';
  for (let i = 0; i < goods.length; i += 1) {
    if (goods[i].nomenclature) {
      goodsString += `${catalogs.getCatalogNameById(catalog, goods[i].nomenclature)}, `;
    }
  }
  if (goodsString) {
    goodsString = goodsString.substring(0, goodsString.length - 2);
  }
  return goodsString;
};

class LoadingBillsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRow: '',
    };

    this.refresh = this.refresh.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.fetchUsers();
    this.props.fetchDrivers();
    this.props.fetchPoints();
    this.props.fetchVehicles();
    this.props.fetchNomenclature();
    this.props.fetchScales();
    this.props.fetchLoadingBills();
  }

  handleClick(activeRow) {
    this.setState({ activeRow });
  }

  handleDoubleClick(id) {
    this.props.history.push(`/loadingBills/${id}`);
  }

  handleCreate() {
    this.props.history.push('/loadingBills/new');
  }

  handleDelete() {
    const { activeRow } = this.state;
    if (activeRow) {
      this.props.deleteLoadingBill(activeRow);
      this.setState({ activeRow: '' });
    }
  }

  render() {
    const loadingBillsIsFetched = this.props.loadingBills.isFetched;
    const pointsIsFetched = this.props.points.isFetched;
    const driversIsFetched = this.props.drivers.isFetched;
    const vehiclesIsFetched = this.props.vehicles.isFetched;
    const nomenclatureIsFetched = this.props.nomenclature.isFetched;
    const scalesIsFetched = this.props.scales.isFetched;
    const usersIsFetched = this.props.users.isFetched;

    let elementToRender = 'Loading...';
    if (loadingBillsIsFetched &&
      pointsIsFetched &&
      driversIsFetched &&
      vehiclesIsFetched &&
      nomenclatureIsFetched &&
      scalesIsFetched &&
      usersIsFetched) {
      const data = this.props.loadingBills.data;

      const rows = data.map(item => (
        <tr
          key={item.id}
          className={this.state.activeRow === item.id ? 'active' : ''}
          onClick={() => this.handleClick(item.id)}
          onDoubleClick={() => this.handleDoubleClick(item.id)}
        >
          <td>{item.number}</td>
          <td>{ format.formatDate(item.createdAt) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.drivers.data, item.driver) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.vehicles.data, item.vehicle) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.vehicles.data, item.trailer) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.points.data, item.shippingPoint) }</td>
          <td>{item.gross}</td>
          <td>{item.tara}</td>
          <td>{item.net}</td>
          <td>{ generateGoodsString(this.props.nomenclature.data, item.goods) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.users.data, item.author) }</td>
        </tr>
      ));

      const toolbar = (
        <div className="btn-toolbar object-toolbar" role="toolbar">
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleCreate}
            >
              Створити
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this.refresh}
            >
              Оновити
            </button>
            <button
              type="button"
              className={`btn btn-default ${this.state.activeRow ? '' : 'disabled'}`}
              onClick={this.handleDelete}
            >
              Видалити
            </button>
          </div>
        </div>
      );

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>Товарно-транспортні накладні</p>

          {toolbar}

          <table className={CSS_TABLE_CLASS}>
            <thead>
              <tr>
                <th>#</th>
                <th>Дата</th>
                <th>Водій</th>
                <th>Транспортний Засіб</th>
                <th>Причеп</th>
                <th>Пункт погрузки</th>
                <th>Брутто</th>
                <th>Тара</th>
                <th>Нетто</th>
                <th>Номенклатура</th>
                <th>Автор</th>
              </tr>
            </thead>

            <tbody>{ rows }</tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        { elementToRender }
      </div>
    );
  }
}

LoadingBillsList.propTypes = {
  history: PropTypes.shape().isRequired,

  loadingBills: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  users: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  points: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  drivers: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  vehicles: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  nomenclature: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  scales: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetched: PropTypes.bool.isRequired,
  }).isRequired,

  fetchUsers: PropTypes.func.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  fetchScales: PropTypes.func.isRequired,
  fetchNomenclature: PropTypes.func.isRequired,
  fetchLoadingBills: PropTypes.func.isRequired,
  deleteLoadingBill: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
  loadingBills: state.loadingBills,
  drivers: state.drivers,
  points: state.points,
  vehicles: state.vehicles,
  scales: state.scales,
  nomenclature: state.nomenclature,
}), {
  fetchUsers,
  fetchDrivers,
  fetchPoints,
  fetchVehicles,
  fetchNomenclature,
  fetchScales,
  fetchLoadingBills,
  deleteLoadingBill,
})(LoadingBillsList);
