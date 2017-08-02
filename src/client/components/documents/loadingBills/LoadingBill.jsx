import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import { catalogs, format, Auth } from '../../../utils';
import { CSS_OBJECT_HEADER, CSS_INPUT } from '../../../constants';

import { Field, FormTable } from '../../elements';
import WeighingModalForm from './WeighingModalForm';

import { fetchUsers } from '../../../actions/users';
import { fetchLoadingBill, createLoadingBill, changeLoadingBill, deleteLoadingBill } from '../../../actions/loadingBills';
import { fetchPoints } from '../../../actions/points';
import { fetchClients } from '../../../actions/clients';
import { fetchDrivers } from '../../../actions/drivers';
import { fetchVehicles } from '../../../actions/vehicles';
import { fetchScales } from '../../../actions/scales';
import { fetchNomenclature } from '../../../actions/nomenclature';

const blankDate = new Date();

const blank = {
  number: '',
  createdAt: blankDate,
  verified: false,
  vehicle: '',
  trailer: '',
  driver: '',
  carrier: '',
  customer: '',
  sender: '',
  recipient: '',
  shippingPoint: '',
  scale: '',
  gross: 0,
  tara: 0,
  net: 0,
  grossDate: blankDate,
  taraDate: blankDate,
  netDate: blankDate,
  goods: [],
  author: '',
  comment: '',
};

const getData = (list, id) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
};

const WeightField = ({
  title,
  value,
  valueId,
  dateTitle,
  date,
  dateId,
  datePlaceholder,
  readOnly,
  readOnlyDate,
  onChange,
}) => (
  <div className="form-group">
    <Field
      title={title}
      name={valueId}
      type={'datetime'}
      readOnly={readOnly}
      placeholder={title}
      value={value}
      width={1}
      onChange={onChange}
    />

    <Field
      title={dateTitle}
      name={dateId}
      type={'datetime'}
      readOnly={readOnlyDate}
      placeholder={datePlaceholder}
      value={date}
      width={2}
      datetime
      onChange={onChange}
    />
  </div>
);

class LoadingBill extends Component {
  constructor(props) {
    super(props);

    const id = this.props.match.params.id;

    this.params = {
      new: !id,
      reread: !!id,
      modified: false,
      data: blank,
      nomenclature: {
        activeRow: null,
      },
    };

    this.refresh = this.refresh.bind(this);
    this.reread = this.reread.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNomeclatureTableAddRow = this.handleNomeclatureTableAddRow.bind(this);
    this.handleNomeclatureTableRemoveRow = this.handleNomeclatureTableRemoveRow.bind(this);
    this.handleNomeclatureRowSelect = this.handleNomeclatureRowSelect.bind(this);
    this.handleNomeclatureRowOnChange = this.handleNomeclatureRowOnChange.bind(this);
    this.handleWeight = this.handleWeight.bind(this);
    this.calculateNet = this.calculateNet.bind(this);
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
    this.props.fetchScales();
    if (!this.params.new) {
      this.props.fetchLoadingBill(this.props.match.params.id);
    }
  }

  updateParams() {
    const data = this.props.loadingBills.data;
    if (data.length !== 0) { // fetched
      this.params.data = { ...getData(data, this.props.match.params.id) } || blank;
      this.params.reread = false;
    }
  }

  reread() {
    this.refresh();
    this.params.reread = true;
    this.params.modified = false;
    this.forceUpdate();
  }

  handleInputChange(e) {
    if (!e.target._isDatetime && !e.target._selected) {
      e.preventDefault();
    }
    this.params.data = { ...this.params.data, [e.target.name]: e.target.value };
    this.params.modified = true;

    this.handleWeight(e.target.name);

    this.forceUpdate();
  }

  handleWeight(name) {
    if (name === 'gross') {
      this.grossDate = new Date();
      this.calculateNet();
    } else if (name === 'tara') {
      this.taraDate = new Date();
      this.calculateNet();
    } else if (name === 'net') {
      this.params.data.tara = this.params.data.gross - this.params.data.net;
      this.params.data.taraDate = new Date();
    }
  }

  calculateNet() {
    this.params.data.net = this.params.data.gross - this.params.data.tara;
    this.params.data.netDate = new Date();
  }

  handleSave(close = false, verified = false) {
    if (this.params.new) {
      const payload = {
        ...this.params.data,
        verified,
        id: uuid(),
      };
      this.props.createLoadingBill(payload);
      this.props.history.replace(`/loadingBills/${payload.id}`);
      this.params.new = false;
      this.params.reread = true;
    } else {
      this.props.changeLoadingBill(this.props.match.params.id, { ...this.params.data, verified });
    }

    if (close) {
      this.props.history.goBack();
    } else {
      this.params.modified = false;
    }
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  handleDelete(e) {
    e.preventDefault();
    if (!this.params.new) {
      this.props.deleteLoadingBill(this.props.match.params.id);
      this.props.history.goBack();
    }
  }

  handleNomeclatureTableAddRow() {
    this.params.data.goods.push({ nomenclature: '', quantity: 0 });
    this.forceUpdate();
  }

  handleNomeclatureTableRemoveRow() {
    let activeRow = this.params.nomenclature.activeRow;
    if (activeRow !== null) {
      const goods = this.params.data.goods;
      this.params.data.goods = goods.filter(item => goods.indexOf(item) !== activeRow);

      if (goods.length === activeRow + 1) {
        activeRow -= 1;
        if (activeRow < 0) {
          activeRow = null;
        }
        this.params.nomenclature.activeRow = activeRow;
      }

      this.forceUpdate();
    }
  }

  handleNomeclatureRowSelect(activeRow) {
    this.params.nomenclature.activeRow = activeRow;
    this.forceUpdate();
  }

  handleNomeclatureRowOnChange(e) {
    const { name, value } = e.target;
    this.params.data.goods[this.params.nomenclature.activeRow][name] = value;
    this.forceUpdate();
  }

  render() {
    const userIsAdmin = Auth.userIsAdmin();

    if (this.params.reread && !this.params.new && this.props.loadingBills.isFetched) {
      this.updateParams();
    }

    let elementToRender = 'Loading...';
    if (!this.params.reread) {
      let {
        number,
        createdAt,
        verified,
        vehicle,
        trailer,
        driver,
        carrier,
        customer,
        sender,
        recipient,
        shippingPoint,
        scale,
        gross,
        tara,
        net,
        grossDate,
        taraDate,
        netDate,
        goods,
        author,
        comment,
      } = this.params.data;

      driver = catalogs.getCatalogNameById(this.props.drivers.data, driver);
      vehicle = catalogs.getCatalogNameById(this.props.vehicles.data, vehicle);
      trailer = catalogs.getCatalogNameById(this.props.vehicles.data, trailer);
      carrier = catalogs.getCatalogNameById(this.props.clients.data, carrier);
      customer = catalogs.getCatalogNameById(this.props.clients.data, customer);
      sender = catalogs.getCatalogNameById(this.props.clients.data, sender);
      recipient = catalogs.getCatalogNameById(this.props.clients.data, recipient);
      shippingPoint = catalogs.getCatalogNameById(this.props.points.data, shippingPoint);
      scale = catalogs.getCatalogNameById(this.props.scales.data, scale);
      author = catalogs.getCatalogNameById(this.props.users.data, author);

      grossDate = grossDate || blankDate;
      taraDate = taraDate || blankDate;
      netDate = netDate || blankDate;

      let subTitle = `${this.params.new ? 'новий' : ''}${this.params.new && this.params.modified ? ', ' : ''}${this.params.modified ? 'не збережено' : ''}`;
      if (subTitle) {
        subTitle = `(${subTitle})`;
      }

      const title = `Товарно-транспортна накладна ${subTitle} - ${number} від ${format.formatDate(createdAt)}`;

      const tableData = goods.map(item => (
        {
          number: goods.indexOf(item) + 1,
          nomenclature: catalogs.getCatalogNameById(this.props.nomenclature.data, item.nomenclature),
          quantity: item.quantity,
        }
      ));

      const toolbar = (
        <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
          <div className="btn-group btn-group-sm pull-left" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleSave(true)}
            >
              Зберегти та закрити
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.handleSave()}
            >
              Зберегти
            </button>
          </div>

          <div className="btn-group btn-group-sm pull-left" role="group">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.handleSave(false, true)}
            >
              Підтвердити
            </button>
          </div>

          <div className="btn-group btn-group-sm pull-left">
            <button
              type="button"
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Додатково
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={this.handleDelete}>Видалити</a></li>
              <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={this.reread}>Перечитати</a></li>
            </ul>
          </div>

          <div className="btn-group btn-group-sm pull-right" role="group">
            <button
              type="button"
              className="close"
              onClick={this.handleClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );

      const header = (
        <div>
          <div className="form-group">
            {/* Number */}
            <Field
              title={'Номер'}
              name={'number'}
              type={'text'}
              readOnly={!userIsAdmin}
              placeholder={'Номер'}
              value={number}
              width={1}
            />

            {/* Date */}
            <Field
              title={'Дата'}
              name={'createdAt'}
              type={'datetime'}
              readOnly={!userIsAdmin}
              placeholder={'Дата'}
              value={createdAt}
              width={2}
              datetime
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

      const bodyMain = (
        <div>
          {/* Driver */}
          <div className="form-group">
            <Field
              title={'Водій'}
              name={'driver'}
              type={'text'}
              placeholder={'Водій'}
              value={driver}
              width={11}
              selectButton
              selector="catalogs"
              table="drivers"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <Field
              title={'ТЗ'}
              name={'vehicle'}
              type={'text'}
              placeholder={'ТЗ'}
              value={vehicle}
              width={5}
              selectButton
              selector="catalogs"
              table="vehicles"
              onChange={this.handleInputChange}
            />

            {/* Trailer */}
            <Field
              title={'Причеп'}
              name={'trailer'}
              type={'text'}
              placeholder={'Причеп'}
              value={trailer}
              width={5}
              selectButton
              selector="catalogs"
              table="vehicles"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            {/* Carrier */}
            <Field
              title={'Перевізник'}
              name={'carrier'}
              type={'text'}
              placeholder={'Перевізник'}
              value={carrier}
              width={5}
              selectButton
              selector="catalogs"
              table="clients"
              onChange={this.handleInputChange}
            />

            {/* Customer */}
            <Field
              title={'Замовник'}
              name={'customer'}
              type={'text'}
              placeholder={'Замовник'}
              value={customer}
              width={5}
              selectButton
              selector="catalogs"
              table="clients"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            {/* Sender */}
            <Field
              title={'Відправник'}
              name={'sender'}
              type={'text'}
              placeholder={'Відправник'}
              value={sender}
              width={5}
              selectButton
              selector="catalogs"
              table="clients"
              onChange={this.handleInputChange}
            />

            {/* Customer */}
            <Field
              title={'Отримувач'}
              name={'recipient'}
              type={'text'}
              placeholder={'Отримувач'}
              value={recipient}
              width={5}
              selectButton
              selector="catalogs"
              table="clients"
              onChange={this.handleInputChange}
            />
          </div>

          {/* ShippingPoint */}
          <div className="form-group">
            <Field
              title={'Пункт погрузки'}
              name={'shippingPoint'}
              type={'text'}
              placeholder={'Пункт погрузки'}
              value={shippingPoint}
              width={11}
              selectButton
              selector="catalogs"
              table="points"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

      const bodyGoods = (
        <FormTable
          cols={[
            { title: 'Номенклатура', iter: 'nomenclature', selector: 'catalogs', table: 'nomenclature' },
            { title: 'Кількість', iter: 'quantity' },
          ]}
          data={tableData}
          activeRow={this.params.nomenclature.activeRow}
          addRow={this.handleNomeclatureTableAddRow}
          removeRow={this.handleNomeclatureTableRemoveRow}
          onRowClick={this.handleNomeclatureRowSelect}
          onChange={this.handleNomeclatureRowOnChange}
        />
      );

      const bodyWeight = (
        <div>
          <div>
            <div className="form-group">
              <Field
                title={'Ваги'}
                name={'scale'}
                type={'text'}
                placeholder={'Ваги'}
                value={scale}
                width={4}
                selectButton
                readOnly={!userIsAdmin}
                selector="catalogs"
                table="scales"
                onChange={this.handleInputChange}
              />

              <button
                type="button"
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#getWeight_modal"
              >
                Зважити
              </button>

              <WeighingModalForm id="getWeight_modal" scale={scale} />
            </div>
          </div>
          <div>
            <WeightField
              title="Брутто"
              value={gross}
              valueId="gross"
              date={grossDate}
              dateId="grossDate"
              dateTitle="Дата брутто"
              readOnlyDate={!userIsAdmin}
              datePlaceholder="Дата брутто"
              onChange={this.handleInputChange}
            />

            <WeightField
              title="Тара"
              value={tara}
              valueId="tara"
              date={taraDate}
              dateId="taraDate"
              dateTitle="Дата тари"
              readOnlyDate={!userIsAdmin}
              datePlaceholder="Дата тари"
              onChange={this.handleInputChange}
            />

            <WeightField
              title="Нетто"
              value={net}
              valueId="net"
              date={netDate}
              dateTitle="Дата нетто"
              readOnly={!userIsAdmin}
              readOnlyDate={!userIsAdmin}
              dateId="netDate"
              datePlaceholder="Дата нетто"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

      const body = (
        <div>
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a data-toggle="tab" href="#tab-default">Основне</a></li>
            <li role="presentation"><a data-toggle="tab" href="#tab-goods">Товари</a></li>
            <li role="presentation"><a data-toggle="tab" href="#tab-weight">Вага</a></li>
          </ul>

          <div className="form-tab-content">
            <div className="tab-content">
              <div id="tab-default" className="tab-pane fade in active">
                {bodyMain}
              </div>
              <div id="tab-goods" className="tab-pane fade">
                {bodyGoods}
              </div>
              <div id="tab-weight" className="tab-pane fade">
                {bodyWeight}
              </div>
            </div>
          </div>
        </div>
      );

      const footer = (
        <div className="form-footer">
          {/* Comment */}
          <div className="form-group">
            <Field
              title={'Коментар'}
              name={'comment'}
              type={'text'}
              placeholder={'Коментар'}
              value={comment}
              width={11}
              onChange={this.handleInputChange}
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <Field
              title={'Автор'}
              name={'author'}
              type={'text'}
              readOnly={!userIsAdmin}
              placeholder={'Автор'}
              value={author}
              width={11}
              selectButton
              selector="catalogs"
              table="users"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{title}</p>

          <form className="form-horizontal">
            {toolbar}
            {header}
            {body}
            {footer}
          </form>
        </div>
      );
    }

    return (
      <div>
        {elementToRender}
      </div>
    );
  }
}

export default connect(state => ({
  users: state.users,
  loadingBills: state.loadingBills,
  drivers: state.drivers,
  points: state.points,
  clients: state.clients,
  vehicles: state.vehicles,
  scales: state.scales,
  nomenclature: state.nomenclature,
}), {
  fetchUsers,
  fetchDrivers,
  fetchPoints,
  fetchClients,
  fetchVehicles,
  fetchNomenclature,
  fetchScales,
  fetchLoadingBill,
  createLoadingBill,
  deleteLoadingBill,
  changeLoadingBill,
})(LoadingBill);
