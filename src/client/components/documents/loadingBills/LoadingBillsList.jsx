import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { catalogs, format } from '../../../utils';
import { CSS_OBJECT_HEADER } from '../../../constants';

import { fetchUsers } from '../../../actions/users';
import { fetchLoadingBills, changeLoadingBill } from '../../../actions/loadingBills';
import { fetchPoints } from '../../../actions/points';
import { fetchDrivers } from '../../../actions/drivers';
import { fetchVehicles } from '../../../actions/vehicles';
import { fetchClients } from '../../../actions/clients';
import { fetchNomenclature } from '../../../actions/nomenclature';

import { Icon, Spinner, ListToolbar, SearchPanel } from '../../elements';

import { Types, deleteDialog } from '../methods';

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

const FastView = ({ data, handleOpen, handleDelete }) => (
  <form className="fast-view form-horizontal">
    <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
      <div className="btn-group btn-group-sm pull-left" role="group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpen}
        >
          <Icon.Open />
          Змінити
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={handleDelete}
        >
          <Icon.Remove />
          Видалити
        </button>
      </div>
    </div>

    <div>
      <div className="row">
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Перевізник: </strong>{data.carrier}
        </div>
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Замовник: </strong>{data.customer}
        </div>
      </div>

      <div className="row">
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Відправник: </strong>{data.sender}
        </div>
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Отримувач: </strong>{data.recipient}
        </div>
      </div>

      <div className="row">
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Причеп: </strong>{data.trailer}
        </div>
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Пункт погрузки: </strong>{data.point}
        </div>
      </div>

      <div className="row">
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Номенклатура: </strong>{data.goods}
        </div>
        <div className="fast-view-field col-xs-12 col-sm-6">
          <strong>Автор: </strong>{data.author}
        </div>
      </div>
    </div>
  </form>
);

FastView.propTypes = {
  data: PropTypes.shape({}).isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

class LoadingBillsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilters: false,
      typeSelector: null,
    };

    this.refresh = this.refresh.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMarkToRemove = this.handleMarkToRemove.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.fetchUsers();
    this.props.fetchClients();
    this.props.fetchDrivers();
    this.props.fetchPoints();
    this.props.fetchVehicles();
    this.props.fetchNomenclature();
    this.props.fetchLoadingBills();
  }

  handleDoubleClick(id) {
    this.props.history.push(`/loadingBills/${id}`);
  }

  handleCreate() {
    this.props.history.push('/loadingBills/new');
  }

  handleDelete(id, mark) {
    if (id) {
      const value = catalogs.getCatalogValueById(this.props.loadingBills.data, id);
      this.props.changeLoadingBill(id, { ...value, mark: !mark, verified: false });
    }
  }

  handleMarkToRemove(id) {
    const { mark } = catalogs.getCatalogValueById(this.props.loadingBills.data, id);
    if (id) {
      deleteDialog(this, id, mark, true);
    }
  }

  handleType(type) {
    let typeSelector = type;
    const currentTypeSelector = this.state.typeSelector;
    if (currentTypeSelector === typeSelector) {
      typeSelector = null;
    }
    this.setState({ typeSelector });
  }

  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  render() {
    const loadingBillsIsFetched = this.props.loadingBills.isFetched;
    const pointsIsFetched = this.props.points.isFetched;
    const driversIsFetched = this.props.drivers.isFetched;
    const vehiclesIsFetched = this.props.vehicles.isFetched;
    const nomenclatureIsFetched = this.props.nomenclature.isFetched;
    const usersIsFetched = this.props.users.isFetched;
    const clientsIsFetched = this.props.clients.isFetched;

    let elementToRender = <Spinner />;
    if (loadingBillsIsFetched &&
      pointsIsFetched &&
      driversIsFetched &&
      vehiclesIsFetched &&
      nomenclatureIsFetched &&
      clientsIsFetched &&
      usersIsFetched) {
      const data = this.props.loadingBills.data;

      const rows = [];
      let j = 0;
      for (let i = 0; i < data.length; i += 1) {
        const item = data[i];

        let icon = (item.verified) ? Icon.Check : null;
        icon = (item.mark) ? Icon.MarkToRemove : (icon);

        if (this.state.typeSelector) {
          if (this.state.typeSelector === item.type) {
            rows.push({
              i: j,
              id: item.id,
              icon,
              number: item.number,
              date: format.formatDate(item.createdAt),
              type: item.type,
              driver: catalogs.getCatalogNameById(this.props.drivers.data, item.driver),
              vehicle: catalogs.getCatalogNameById(this.props.vehicles.data, item.vehicle),
              trailer: catalogs.getCatalogNameById(this.props.vehicles.data, item.trailer),
              point: catalogs.getCatalogNameById(this.props.points.data, item.shippingPoint),
              recipient: catalogs.getCatalogNameById(this.props.clients.data, item.recipient),
              carrier: catalogs.getCatalogNameById(this.props.clients.data, item.carrier),
              customer: catalogs.getCatalogNameById(this.props.clients.data, item.customer),
              sender: catalogs.getCatalogNameById(this.props.clients.data, item.sender),
              gross: item.gross,
              tara: item.tara,
              net: item.net,
              goods: generateGoodsString(this.props.nomenclature.data, item.goods),
              author: catalogs.getCatalogNameById(this.props.users.data, item.author),
            });
            j += 1;
          }
        } else {
          rows.push({
            i: j,
            id: item.id,
            icon,
            number: item.number,
            date: format.formatDate(item.createdAt),
            type: item.type,
            driver: catalogs.getCatalogNameById(this.props.drivers.data, item.driver),
            vehicle: catalogs.getCatalogNameById(this.props.vehicles.data, item.vehicle),
            trailer: catalogs.getCatalogNameById(this.props.vehicles.data, item.trailer),
            point: catalogs.getCatalogNameById(this.props.points.data, item.shippingPoint),
            recipient: catalogs.getCatalogNameById(this.props.clients.data, item.recipient),
            carrier: catalogs.getCatalogNameById(this.props.clients.data, item.carrier),
            customer: catalogs.getCatalogNameById(this.props.clients.data, item.customer),
            sender: catalogs.getCatalogNameById(this.props.clients.data, item.sender),
            gross: item.gross,
            tara: item.tara,
            net: item.net,
            goods: generateGoodsString(this.props.nomenclature.data, item.goods),
            author: catalogs.getCatalogNameById(this.props.users.data, item.author),
          });
          j += 1;
        }
      }

      const formatter = (cell, row) => {
        let typeIcon = <Icon.Income />;
        if (row.type === Types.OUTCOME) {
          typeIcon = <Icon.Outcome />;
        }
        const { icon: CellIcon } = rows[row.i];
        let statusIcon = null;
        if (CellIcon) {
          statusIcon = <CellIcon />;
        }
        return (
          <span className="clearfix">
            <span className="pull-left">{typeIcon}{statusIcon}</span>
            <span className="pull-right">{cell}</span>
          </span>
        );
      };

      let specialButtons = null;
      if (this.state.showFilters) {
        specialButtons = (
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className={`btn btn-default loading-bill-type-selector ${this.state.typeSelector === Types.INCOME ? 'active' : ''}`}
              onClick={() => this.handleType(Types.INCOME)}
            >
              Прихід
            </button>
            <button
              type="button"
              className={`btn btn-default loading-bill-type-selector ${this.state.typeSelector === Types.OUTCOME ? 'active' : ''}`}
              onClick={() => this.handleType(Types.OUTCOME)}
            >
              Відвантаження
            </button>
          </div>
        )
      }

      const options = {
        page: 1,
        sizePerPage: 25,
        sizePerPageList: [{
          text: '25', value: 25,
        }, {
          text: '50', value: 50,
        }, {
          text: '100', value: 100,
        }, {
          text: '150', value: 150,
        }, {
          text: 'All', value: rows.length,
        }],
        prePage: 'Попередня',
        nextPage: 'Наступна',
        firstPage: 'Перша',
        lastPage: 'Остання',
        clearSearch: true,
        searchPanel: props => (<SearchPanel { ...props } />),
        toolBar: props => (
          <ListToolbar
            {...props}
            mainButtons={(
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleCreate}
                >
                  <Icon.Create />
                  Створити
                </button>
              </div>
            )}
            secondaryButtons={(
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.refresh}
                >
                  <Icon.Refresh />
                  Оновити
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  title="Фільтр"
                  onClick={this.toggleFilters}
                >
                  <Icon.Filter noMargin />
                </button>
              </div>
            )}
            specialButtons={specialButtons}
          />
        ),
      };

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>Товарно-транспортні накладні</p>

          <BootstrapTable
            data={rows}
            hover
            search
            multiColumnSearch
            pagination
            options={options}
            expandableRow={() => (true)}
            expandComponent={(row) => (
              <FastView
                data={row}
                handleOpen={() => this.handleDoubleClick(row.id)}
                handleDelete={() => this.handleMarkToRemove(row.id)}
              />
            )}
          >
            <TableHeaderColumn
              dataField="number"
              dataSort
              dataAlign="right"
              width="80"
              dataFormat={formatter}
              filter={(this.state.showFilters ? { type: 'TextFilter' } : null)}
              isKey
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="date"
              dataSort
              width={(this.state.showFilters ? '250' : '150')}
              filter={(this.state.showFilters ? { type: 'DateFilter' } : null)}
            >
              Дата
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="driver"
              width="250"
              filter={(this.state.showFilters ? { type: 'TextFilter' } : null)}
            >
              Водій
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="vehicle"
              width="250"
              filter={(this.state.showFilters ? { type: 'TextFilter' } : null)}
            >
              Транспортний Засіб
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="gross"
              dataAlign="right"
              width={(this.state.showFilters ? '150' : '100')}
              filter={(this.state.showFilters ? { type: 'NumberFilter' } : null)}
            >
              Брутто
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="tara"
              dataAlign="right"
              width={(this.state.showFilters ? '150' : '100')}
              filter={(this.state.showFilters ? { type: 'NumberFilter' } : null)}
            >
              Тара
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="net"
              dataAlign="right"
              width={(this.state.showFilters ? '150' : '100')}
              filter={(this.state.showFilters ? { type: 'NumberFilter' } : null)}
            >
              Нетто
            </TableHeaderColumn>
          </BootstrapTable>
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

  clients: PropTypes.shape({
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

  fetchUsers: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchDrivers: PropTypes.func.isRequired,
  fetchPoints: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  fetchNomenclature: PropTypes.func.isRequired,
  fetchLoadingBills: PropTypes.func.isRequired,
  changeLoadingBill: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
  loadingBills: state.loadingBills,
  drivers: state.drivers,
  clients: state.clients,
  points: state.points,
  vehicles: state.vehicles,
  nomenclature: state.nomenclature,
}), {
  fetchUsers,
  fetchDrivers,
  fetchPoints,
  fetchVehicles,
  fetchNomenclature,
  fetchClients,
  fetchLoadingBills,
  changeLoadingBill,
})(LoadingBillsList);
