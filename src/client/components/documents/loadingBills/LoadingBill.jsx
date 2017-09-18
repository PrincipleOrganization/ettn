import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import { catalogs, format, dialog, Auth } from '../../../utils';
import { CSS_OBJECT_HEADER, CSS_INPUT } from '../../../constants';

import { Field, FormTable, Spinner, Icon } from '../../elements';
<<<<<<< HEAD
import { SmartScales, getMainScales } from дщфвlo'../../catalogs/scales/methods';
=======
import { SmartScales, getMainScales } from '../../catalogs/scales/methods';
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10

import { fetchUsers } from '../../../actions/users';
import { fetchLoadingBill, createLoadingBill, changeLoadingBill } from '../../../actions/loadingBills';
import { fetchPoints } from '../../../actions/points';
import { fetchClients } from '../../../actions/clients';
import { fetchDrivers } from '../../../actions/drivers';
import { fetchVehicles } from '../../../actions/vehicles';
import { fetchScales } from '../../../actions/scales';
import { fetchNomenclature } from '../../../actions/nomenclature';

import { Types, deleteDialog } from '../methods';

const blankDate = new Date();

const currentUser = () => {
  const user = Auth.getUser();
  if (user) {
    return user.id;
  }
  return '';
};

const blank = {
  number: '',
  createdAt: blankDate,
  type: Types.INCOME,
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
  grossScale: '',
  taraScale: '',
  grossOperator: '',
  taraOperator: '',
  netOperator: '',
  goods: [],
  author: currentUser(),
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
  noScale,
  noButton,
  title,
  value,
  valueId,
  dateTitle,
  date,
  dateId,
  datePlaceholder,
  readOnly,
  readOnlyDate,
  titleScale,
  scaleId,
  valueScale,
  titleOperator,
  operatorId,
  valueOperator,
  readOnlyOperator,
  operatorValue,
  documentNumber,
  vehicleValue,
  valueWeight = 0,
  show,
  onChange,
  onClickWeight,
  onTitleClick,
}) => {
  let scale = (
    <Field
      title={titleScale}
      name={scaleId}
      type={'text'}
      placeholder={titleScale}
      value={valueScale}
      width={4}
      selectButton
      readOnly
      selector="catalogs"
      table="scales"
      onChange={onChange}
    />
  );

  if (noScale) {
    scale = null;
  }

  let button = (
    <div className="col-sm-8">
      <label htmlFor={`${scaleId}_weight_board`}>На вагах</label>
      <div className="input-group">
        <input
          type="text"
          className={CSS_INPUT}
          readOnly
          id={`${scaleId}_weight_board`}
          placeholder="0"
          name={`${scaleId}_weight_board`}
          value={valueWeight}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default btn-sm"
            type="button"
            onClick={onClickWeight}
          >
            <Icon.Scale />
            Внести
          </button>
        </span>
      </div>
    </div>
  );

  if (noButton) {
    button = null;
  }

  let footer = null;
  if (button && scale) {
    footer = (
      <div className="form-group">
        {scale}
        {button}
      </div>
    );
  }

  let elements = null;
  if (show) {
    elements = (
      <div>
        <div className="form-group">
          <Field
            title="Вага"
            name={valueId}
            type={'number'}
            readOnly={readOnly}
            placeholder={title}
            value={value}
            width={2}
            onChange={onChange}
          />
<<<<<<< HEAD

=======
  
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
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
<<<<<<< HEAD

=======
  
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
          <Field
            title={titleOperator}
            name={operatorId}
            type={'text'}
            placeholder={titleOperator}
            value={valueOperator}
            width={8}
            selectButton={!readOnlyOperator}
            readOnly
            selector="catalogs"
            table="users"
            onChange={onChange}
          />
        </div>
        {footer}
      </div>
    );
  }

  const lastChild = (valueId === 'net') ? 'no-border' : '';
  const icon = (show) ? <Icon.CaretUp /> : <Icon.CaretDown />;

  let mainTitle = <p onClick={onTitleClick}>{icon} {title}</p>;
  if (!show) {
    let fastWeight = null;
    if (valueId !== 'net') {
      fastWeight = (
        <div>
          <a className="pull-right btn-fast-weight" onClick={onClickWeight} role="button">Внести</a>
          <p className="pull-right">{`На вагах: ${valueWeight}`}</p>
        </div>
      );
    }
    mainTitle = (
      <div className="clearfix">
        <p
          className="pull-left"
          onClick={onTitleClick}
        >
          {icon} {`${title}: ${value} - від: ${format.formatDate(date)}`}
        </p>
        {fastWeight}
      </div>
    );
  }

  return (
    <div className={`weight-elems ${lastChild}`}>
      <div className="weight-elems-container">
        {mainTitle}
        {elements}
      </div>
    </div>
  );
};

class LoadingBill extends Component {
  constructor(props) {
    super(props);

    const id = this.props.match.params.id;
    
    this.url = '/loadingBills';

    this.url = '/loadingBills';

    this.params = {
      new: !id,
      reread: !!id,
      modified: false,
      ready: false,
      data: blank,
      nomenclature: {
        activeRow: null,
      },
      grossScale: null,
      taraScale: null,
      grossWeight: 0,
      taraWeight: 0,
      showGross: false,
      showTara: false,
      showNet: false,
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
    this.updateFastWeight = this.updateFastWeight.bind(this);
    this.updateScale = this.updateScale.bind(this);
    this.updateAllScale = this.updateAllScale.bind(this);
    this.handleFastWeight = this.handleFastWeight.bind(this);
    this.handleType = this.handleType.bind(this);
    this.disconnectFromAllScales = this.disconnectFromAllScales.bind(this);
    this.goBack = this.goBack.bind(this);
    this.toggleScaleBoard = this.toggleScaleBoard.bind(this);
    this.fillScale = this.fillScale.bind(this);
  }

  async componentDidMount() {
    this.params.ready = true;
    await this.refresh();
  }

  componentWillUnmount() {
    this.disconnectFromAllScales();
  }

  goBack() {
    this.props.history.push(this.url);
  }

  async refresh() {
    this.props.fetchUsers();
    this.props.fetchDrivers();
    this.props.fetchPoints();
    this.props.fetchClients();
    this.props.fetchVehicles();
    this.props.fetchNomenclature();
    this.props.fetchScales();
    if (!this.params.new) {
      await this.props.fetchLoadingBill(this.props.match.params.id);
    }
  }

  updateParams() {
    const data = this.props.loadingBills.data;
    if (data.length !== 0) { // fetched
      this.params.data = { ...getData(data, this.props.match.params.id) } || blank;
      this.params.reread = false;
    }
  }

  async reread() {
    await this.refresh();
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
      this.params.data.grossDate = new Date();
      this.params.data.grossOperator = currentUser();
      this.calculateNet();
    } else if (name === 'tara') {
      this.params.data.taraDate = new Date();
      this.params.data.taraOperator = currentUser();
      this.calculateNet();
    } else if (name === 'net') {
      this.params.data.tara = this.params.data.gross - this.params.data.net;
      this.params.data.taraDate = new Date();
      this.params.data.taraOperator = currentUser();
    } else if (name === 'grossScale') {
      this.updateScale('grossScale');
    } else if (name === 'taraScale') {
      this.updateScale('taraScale');
    }
  }

  calculateNet() {
    this.params.data.net = this.params.data.gross - this.params.data.tara;
    this.params.data.netDate = new Date();
    this.params.data.netOperator = currentUser();
  }

  handleSave(close = false, verified = false) {
    if (this.params.new) {
      const payload = {
        ...this.params.data,
        verified: this.params.data.verified || verified,
        id: uuid(),
      };
      this.props.createLoadingBill(payload);
      this.props.history.replace(`${this.url}/${payload.id}`);
      this.params.new = false;
      this.params.reread = true;
    } else {
<<<<<<< HEAD
      this.params.data.verified = verified;
      this.props.changeLoadingBill(
        this.props.match.params.id,
        {
          ...this.params.data,
=======
      this.props.changeLoadingBill(
        this.props.match.params.id, 
        { 
          ...this.params.data, 
          verified: this.params.data.verified || verified, 
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
        },
      );
    }

    if (close) {
      this.props.history.goBack();
    } else {
      this.params.modified = false;
      this.forceUpdate();
    }
  }

  handleClose() {
    if (this.params.modified) {
      dialog.showOnCloseDialog(this.goBack);
    } else {
      this.goBack();
    }
  }

  async handleDelete() {
    if (!this.params.new) {
      this.params.data.mark = !this.params.data.mark;
      this.params.verified = false;
      await this.handleSave();
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

  disconnectFromAllScales() {
    this.disconnectFromScales(this.params.grossScale);
    this.disconnectFromScales(this.params.taraScale);
    delete this.params.grossScale;
    delete this.params.taraScale;
  }

  disconnectFromScales(scales, name) {
    if (scales) {
      this.params[name] = 0;
      scales.disconnect();
    }
  }

  fillScale(name) {
    this.params.data[name] = getMainScales();
  }

  updateAllScale() {
    this.updateScale('grossScale');
    this.updateScale('taraScale');
  }

  updateScale(name) {
    if (this.params.ready) {
      const field = (name === 'grossScale') ? 'grossWeight' : 'taraWeight';

      this.disconnectFromScales(this.params[name], field);
      delete this.params[name];

      let sc = this.params.data[name];
      if (!sc) {
        this.fillScale(name);
        sc = this.params.data[name];
      }
      if (sc) {
        const scaleValue = catalogs.getCatalogValueById(this.props.scales.data, sc);
        if (scaleValue) {
          this.params[name] = new SmartScales(scaleValue);
          this.params[name].connect((weight) => { this.updateFastWeight(field, weight); });
        }
      }
    }
  }

  updateFastWeight(name, weight) {
    this.params[name] = weight;
    this.forceUpdate();
  }

  handleFastWeight(name, dataName) {
    this.params.data[dataName] = this.params[name];
    this.handleWeight(dataName);
    this.forceUpdate();
  }

  handleType(type) {
    this.params.data.type = type;
    this.forceUpdate();
  }

  toggleScaleBoard(scale) {
    if (scale === 'gross') {
      this.params.showGross = !this.params.showGross;
    } else if (scale === 'tara') {
      this.params.showTara = !this.params.showTara;
    } else if (scale === 'net') {
      this.params.showNet = !this.params.showNet;
    }
    this.forceUpdate();
  }

  render() {
    const haveErrors = this.props.loadingBills.m.length !== 0;
    if (haveErrors) {
      dialog.showError(this.props.loadingBills.m, this.goBack);
    }

    const userIsAdmin = Auth.userIsAdmin();

<<<<<<< HEAD
    const isFetched = this.props.loadingBills.isFetched
=======
    const isFetched = this.props.loadingBills.isFetched 
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
      && this.props.scales.isFetched
      && this.props.nomenclature.isFetched
      && this.props.clients.isFetched
      && this.props.vehicles.isFetched
      && this.props.drivers.isFetched
      && this.props.users.isFetched
      && this.props.points.isFetched;
    if (this.params.ready && this.params.reread && !this.params.new && isFetched && !haveErrors) {
      this.updateParams();
      this.updateAllScale();
    } else if (this.params.ready && this.params.new && this.props.scales.isFetched && !haveErrors) {
      if (!this.params.grossScale) {
        this.updateScale('grossScale');
      }
      if (!this.params.taraScale) {
        this.updateScale('taraScale');
      }
    }

    let elementToRender = <Spinner />;
    if (!this.params.reread && !haveErrors) {
      let {
        number,
        createdAt,
        type,
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
        grossScale,
        taraScale,
        grossOperator,
        taraOperator,
        netOperator,
        goods,
        author,
        comment,
        mark,
      } = this.params.data;

      driver = catalogs.getCatalogNameById(this.props.drivers.data, driver);
      vehicle = catalogs.getCatalogNameById(this.props.vehicles.data, vehicle);
      trailer = catalogs.getCatalogNameById(this.props.vehicles.data, trailer);
      carrier = catalogs.getCatalogNameById(this.props.clients.data, carrier);
      customer = catalogs.getCatalogNameById(this.props.clients.data, customer);
      sender = catalogs.getCatalogNameById(this.props.clients.data, sender);
      recipient = catalogs.getCatalogNameById(this.props.clients.data, recipient);
      shippingPoint = catalogs.getCatalogNameById(this.props.points.data, shippingPoint);
      grossScale = catalogs.getCatalogNameById(this.props.scales.data, grossScale);
      taraScale = catalogs.getCatalogNameById(this.props.scales.data, taraScale);
      grossOperator = catalogs.getCatalogNameById(this.props.users.data, grossOperator);
      taraOperator = catalogs.getCatalogNameById(this.props.users.data, taraOperator);
      netOperator = catalogs.getCatalogNameById(this.props.users.data, netOperator);
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

      const { grossWeight, taraWeight, showGross, showNet, showTara } = this.params;

      let rereadButton = null;
      if (!this.params.new) {
        rereadButton = (
          <li>
            <a
              role="button"
              className={this.params.new ? 'disabled' : ''}
              onClick={this.reread}
            >
              <Icon.Refresh />
              Перечитати
            </a>
          </li>
        );
      }

      const toolbar = (
        <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
          <div className="btn-group btn-group-sm pull-left" role="group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.handleSave(true)}
            >
              <Icon.SaveClose />
              Зберегти та закрити
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.handleSave()}
            >
              <Icon.Save />
              Зберегти
            </button>
          </div>

          <div className="btn-group btn-group-sm pull-left" role="group">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => this.handleSave(false, true)}
            >
              <Icon.Verified />
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
<<<<<<< HEAD
              <li>
                <a
                  role="button"
                  className={this.params.new ? 'disabled' : ''}
                  onClick={() => { deleteDialog(this, mark, false); }}
                >
                  <Icon.Remove />
                  Видалити
                </a>
              </li>
              {rereadButton}
              <li>
                <a
                  role="button"
                  onClick={() => { this.handleSave(false, false); }}
                >
                  <Icon.Unverified />
                  Відмінити підтвердження
                </a>
              </li>
=======
              <li><a role="button" className={this.params.new ? 'disabled' : ''} onClick={() => { deleteDialog(this, mark, false); }}><Icon.Remove />Видалити</a></li>
              {rereadButton}
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
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
              width={2}
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
              onClick={this.disconnectFromAllScales}
              onBlur={this.updateAllScale}
            />

            <div className="col-xs-12 col-sm-6">
              <label htmlFor="loading-bill-type-selector">Вид</label>
              <br />
              <div className="btn-group btn-group-sm" role="group" id="loading-bill-type-selector">
                <button
                  type="button"
                  className={`btn btn-default loading-bill-type-selector ${type === Types.INCOME ? 'active' : ''}`}
                  onClick={() => this.handleType(Types.INCOME)}
                >
                  Прихід
                </button>
                <button
                  type="button"
                  className={`btn btn-default loading-bill-type-selector ${type === Types.OUTCOME ? 'active' : ''}`}
                  onClick={() => this.handleType(Types.OUTCOME)}
                >
                  Відвантаження
                </button>
              </div>
            </div>
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
              width={12}
              selectButton
              selector="catalogs"
              table="drivers"
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            {/* Vehicle */}
            <Field
              title={'Транспортний Засіб'}
              name={'vehicle'}
              type={'text'}
              placeholder={'Транспортний Засіб'}
              value={vehicle}
              width={6}
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
              width={6}
              selectButton
              selector="catalogs"
              table="vehiclesSecondary"
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
              width={6}
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
              width={6}
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
              width={6}
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
              width={6}
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
              width={12}
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
          <WeightField
            title="Брутто"
            value={gross}
            valueId="gross"
            date={grossDate}
            dateId="grossDate"
            dateTitle="Дата"
            readOnly={!userIsAdmin}
            readOnlyDate={!userIsAdmin}
            datePlaceholder="Дата брутто"
            titleScale="Ваги"
            scaleId="grossScale"
            valueScale={grossScale}
            titleOperator="Оператор"
            operatorId="grossOperator"
            valueOperator={grossOperator}
            readOnlyOperator={!userIsAdmin}
            operatorValue={grossOperator}
            documentNumber={number}
            vehicleValue={vehicle}
            valueWeight={grossWeight}
            show={showGross}
            onChange={this.handleInputChange}
            onClickWeight={() => { this.handleFastWeight('grossWeight', 'gross'); }}
            onTitleClick={() => { this.toggleScaleBoard('gross'); }}
          />

          <WeightField
            title="Тара"
            value={tara}
            valueId="tara"
            date={taraDate}
            dateId="taraDate"
            dateTitle="Дата"
            readOnly={!userIsAdmin}
            readOnlyDate={!userIsAdmin}
            datePlaceholder="Дата тари"
            titleScale="Ваги"
            scaleId="taraScale"
            valueScale={taraScale}
            titleOperator="Оператор"
            operatorId="taraOperator"
            valueOperator={taraOperator}
            readOnlyOperator={!userIsAdmin}
            operatorValue={taraOperator}
            documentNumber={number}
            vehicleValue={vehicle}
            valueWeight={taraWeight}
            show={showTara}
            onChange={this.handleInputChange}
            onClickWeight={() => { this.handleFastWeight('taraWeight', 'tara'); }}
            onTitleClick={() => { this.toggleScaleBoard('tara'); }}
          />

          <WeightField
            noScale
            noButton
            title="Нетто"
            value={net}
            valueId="net"
            date={netDate}
            dateTitle="Дата"
            readOnly={!userIsAdmin}
            readOnlyDate={!userIsAdmin}
            dateId="netDate"
            datePlaceholder="Дата нетто"
            titleOperator="Оператор"
            operatorId="netOperator"
            valueOperator={netOperator}
            readOnlyOperator={!userIsAdmin}
            show={showNet}
            onChange={this.handleInputChange}
            onTitleClick={() => { this.toggleScaleBoard('net'); }}
          />
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
              width={12}
              onChange={this.handleInputChange}
            />
          </div>

          {/* Author */}
          <div className="form-group">
            <Field
              title={'Автор'}
              name={'author'}
              type={'text'}
              readOnly
              placeholder={'Автор'}
              value={author}
              width={12}
              selectButton={userIsAdmin}
              selector="catalogs"
              table="users"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      );

<<<<<<< HEAD
      let icon = <Icon.Unverified />;
      if (mark) {
        icon = <Icon.MarkToRemove />;
      } else if (verified) {
        icon = <Icon.Verified />;
=======
      let icon = null;
      if (mark) {
        icon = <Icon.MarkToRemove />;
      } else if (verified) {
        icon = (<Icon.Check />);
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
      }

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{icon} {title}</p>

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
  changeLoadingBill,
})(LoadingBill);
