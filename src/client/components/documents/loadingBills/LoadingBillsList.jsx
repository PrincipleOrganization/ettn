import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { catalogs } from '../../../utils';

const formatDate = date => (
  moment(date).format('D/M/YYYY H:m:s')
);

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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(activeRow) {
    this.setState({ activeRow });
  }

  handleDoubleClick(id) {
    console.log(id);
  }

  render() {
    const loadingBillsIsFetched = this.props.loadingBills.isFetched;
    const pointsIsFetched = this.props.points.isFetched;
    const clientsIsFetched = this.props.clients.isFetched;
    const driversIsFetched = this.props.drivers.isFetched;
    const vehiclesIsFetched = this.props.vehicles.isFetched;
    const nomenclatureIsFetched = this.props.nomenclature.isFetched;
    const usersIsFetched = this.props.users.isFetched;

    let elementToRender = 'Loading...';
    if (loadingBillsIsFetched &&
      pointsIsFetched &&
      clientsIsFetched &&
      driversIsFetched &&
      vehiclesIsFetched &&
      nomenclatureIsFetched &&
      usersIsFetched) {
      const data = this.props.loadingBills.data;

      const rows = data.map(item => (
        <tr
          key={item.id}
          className={this.state.activeRow === item.id ? 'active' : ''}
          onClick={() => this.handleClick(item.id)}
          onDoubleClick={() => this.handleDoubleClick(item.id)}
        >
          <td>{item.number.toString()}</td>
          <td>{ formatDate(item.createdAt) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.drivers.data, item.driver) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.vehicles.data, item.vehicle) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.vehicles.data, item.trailer) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.clients.data, item.carrier) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.clients.data, item.sender) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.clients.data, item.customer) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.clients.data, item.recipient) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.points.data, item.shippingPoint) }</td>
          <td>{item.gross.toString()}</td>
          <td>{item.tara.toString()}</td>
          <td>{item.net.toString()}</td>
          <td>{ generateGoodsString(this.props.nomenclature.data, item.goods) }</td>
          <td>{ catalogs.getCatalogNameById(this.props.users.data, item.author) }</td>
        </tr>
      ));

      elementToRender = (
        <div>
          <h4>Товарно-транспортні накладні</h4>

          <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата</th>
                <th>Водій</th>
                <th>Транспортний Засіб</th>
                <th>Причеп</th>
                <th>Перевізник</th>
                <th>Замовник</th>
                <th>Відправник</th>
                <th>Отримувач</th>
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

  clients: PropTypes.shape({
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
};

export default LoadingBillsList;
