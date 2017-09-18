import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data, DraggableHeader } from 'react-data-grid-addons';
import moment from 'moment';

import { fetchLoadingBills } from '../../actions/loadingBills';
import { fetchClients } from '../../actions/clients';
import { fetchVehicles } from '../../actions/vehicles';
import { fetchNomenclature } from '../../actions/nomenclature';
import { fetchUsers } from '../../actions/users';

import ExcelConverter from './ExcelConverter';

import { generateGoodsString, Types } from '../documents/methods';

import { CSS_OBJECT_HEADER } from '../../constants';
import { Spinner, Icon, Field } from '../elements';
import { catalogs, format } from '../../utils';

const DraggableContainer = DraggableHeader.DraggableContainer;

const generateProps = ({
  loadingBills,
  clients,
  vehicles,
  nomenclature,
  users,
}) => {
  const isFetched = loadingBills.isFetched
    && clients.isFetched
    && vehicles.isFetched
    && nomenclature.isFetched
    && users.isFetched;

  const data = [];
  let n = 1;
  for (let i = 0; i < loadingBills.data.length; i += 1) {
    const loadingBill = loadingBills.data[i];
    if (!loadingBill.mark && loadingBill.verified) {
      const { number, type, customer, vehicle, goods, net, gross, tara, netDate, netOperator } = loadingBill;
      data.push({
        n,
        number,
        type,
        customer: catalogs.getCatalogNameById(clients.data, customer),
        vehicle: catalogs.getCatalogNameById(vehicles.data, vehicle),
        goods: generateGoodsString(nomenclature.data, goods),
        net,
        gross,
        tara,
        netDate: format.formatDate(netDate),
        netOperator: catalogs.getCatalogNameById(users.data, netOperator),
        netOperatorId: netOperator,
      });
      n += 1;
    }
  }

  return { data, isFetched, users: users.data };
};

class WeighingJournal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { key: 'n', name: '№ п/п', resizable: true, width: 60, sortable: true },
        { key: 'number', name: '№ документу', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'customer', name: 'Клієнт', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'vehicle', name: 'Транспортний засіб', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'goods', name: 'Товари', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'net', name: 'Нетто', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'gross', name: 'Брутто', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'tara', name: 'Тара', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'netDate', name: 'Дата зважування', resizable: true, sortable: true, filterable: true, draggable: true },
        { key: 'netOperator', name: 'Оператор', resizable: true, sortable: true, filterable: true, draggable: true },
      ],
      dateFrom: null,
      dateTill: null,
      lBType: null,
      operator: null,
      showSelections: true,
    };

    this.rows = [];
    this.manipulating = false;
    this.filters = {};

    this.fetch = this.fetch.bind(this);
    this.generateRows = this.generateRows.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getSize = this.getSize.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderTypeSelector = this.renderTypeSelector.bind(this);
    this.renderDateField = this.renderDateField.bind(this);
    this.renderSelections = this.renderSelections.bind(this);
    this.renderExport = this.renderExport.bind(this);
    this.renderReport = this.renderReport.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.handleHeaderDrop = this.handleHeaderDrop.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleSelectionsChange = this.handleSelectionsChange.bind(this);
    this.handleToogleSelections = this.handleToogleSelections.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  getRows() {
    return Data.Selectors.getRows(this);
  }

  getSize() {
    return this.getRows().length;
  }

  generateRows() {
    const { dateFrom, dateTill, operator, lBType } = this.state;
    const data = this.props.data.slice(0);
    const rows = [];
    for (let i = 0; i < data.length; i += 1) {
      let add = true;
      const row = data[i];
      const date = moment(row.netDate, format.DATE_FORMAT);
      if (dateFrom) {
        if (date.isBefore(dateFrom)) {
          add = false;
        }
      }
      if (dateTill && add) {
        if (date.isAfter(dateTill)) {
          add = false;
        }
      }
      if (operator && add) {
        if (row.netOperatorId !== operator) {
          add = false;
        }
      }
      if (lBType && add) {
        if (row.type !== lBType) {
          add = false;
        }
      }

      if (add) {
        rows.push(row);
      }
    }

    this.rows = rows;
  }

  rowGetter(i) {
    return this.getRows()[i];
  }

  fetch() {
    this.props.fetchLoadingBills();
    this.props.fetchClients();
    this.props.fetchVehicles();
    this.props.fetchNomenclature();
    this.props.fetchUsers();
  }

  handleGridSort(sortColumn, sortDirection) {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    this.rows = sortDirection === 'NONE' ? this.props.data.slice(0) : this.rows.sort(comparer);
    this.manipulating = sortDirection !== 'NONE';
    this.forceUpdate();
  }

  handleFilterChange(filter) {
    const newFilters = Object.assign({}, this.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.manipulating = true;
    this.filters = newFilters;
    this.forceUpdate();
  }

  handleSelectionsChange(e) {
    if (!e.target._isDatetime && !e.target._selected) {
      e.preventDefault();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handleHeaderDrop(source, target) {
    const stateCopy = Object.assign({}, this.state);
    const columnSourceIndex = this.state.columns.findIndex(i => i.key === source);
    const columnTargetIndex = this.state.columns.findIndex(i => i.key === target);

    stateCopy.columns.splice(
      columnTargetIndex,
      0,
      stateCopy.columns.splice(columnSourceIndex, 1)[0],
    );

    const emptyColumns = Object.assign({},this.state, { columns: [] });
    this.setState(emptyColumns);

    const reorderedColumns = Object.assign({},this.state, { columns: stateCopy.columns });
    this.setState(reorderedColumns);
  }

  clearFilters() {
    this.filters = {};
  }

  handleGenerate() {
    this.manipulating = false;
    this.fetch();
  }

  handleType(lBType) {
    this.setState({ lBType });
  }

  handleToogleSelections() {
    this.setState({ showSelections: !this.state.showSelections });
  }

  renderTypeSelector() {
    const type = this.state.lBType;
    return (
      <div className="col-xs-12 col-sm-6">
        <label htmlFor="loading-bill-type-selector">Вид</label>
        <br />
        <div className="btn-group btn-group-sm" role="group" id="loading-bill-type-selector">
          <button
            type="button"
            className={`btn btn-default loading-bill-type-selector ${type === null ? 'active' : ''}`}
            onClick={() => this.handleType(null)}
          >
            Всі
          </button>
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
    );
  }

  renderDateField(title, name, value) {
    return (
      <Field
        title={title}
        name={name}
        type={'datetime'}
        placeholder={title}
        value={value || ''}
        width={3}
        datetime
        readOnly={false}
        onChange={this.handleSelectionsChange}
      />
    );
  }

  renderSelections() {
    const { dateFrom, dateTill, operator, showSelections } = this.state;
    if (showSelections) {
      const operatorName = catalogs.getCatalogNameById(this.props.users, operator);
      return (
        <form className="form-horizontal report-selections">
          <div className="form-group">
            {this.renderDateField('Дата з', 'dateFrom', dateFrom)}
            {this.renderDateField('Дата по', 'dateTill', dateTill)}
            {this.renderTypeSelector()}
          </div>
  
          <div className="form-group">
            <Field
              title={'Оператор'}
              name={'operator'}
              type={'text'}
              placeholder={'Оператор'}
              value={operatorName || ''}
              width={6}
              readOnly
              selectButton
              selector="catalogs"
              table="users"
              onChange={this.handleSelectionsChange}
            />
          </div>
        </form>
      );
    }
    return null;
  }

  renderExport() {
    return (
      <ExcelConverter
        data={this.rows}
        columns={this.state.columns}
        name="Журнал зважування"
        filename="Журнал зважування.xlsx"
        buttonClass="btn-report-secondary"
      />
    );
  }

  renderToolbar() {
    return (
      <Toolbar enableFilter filterRowsButtonText="Фільтри">
        <button
          type="button"
          className="btn btn-primary pull-left btn-report-primary"
          onClick={this.handleGenerate}
        >
          <Icon.Generate />
          Сформувати
        </button>

        <button
          type="button"
          className="btn btn-default btn-report-secondary"
          onClick={this.handleToogleSelections}
        >
          Відбори
        </button>

        {this.renderExport()}

        <br />

        {this.renderSelections()}
      </Toolbar>
    );
  }

  renderReport() {
    if (!this.manipulating) {
      this.generateRows();
    }
    
    return (
      <DraggableContainer onHeaderDrop={this.handleHeaderDrop}>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minColumnWidth={120}
          enableCellSelect
          toolbar={this.renderToolbar()}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.clearFilters}
        />
      </DraggableContainer>
    );
  }

  render() {
   let elementToRender = <Spinner />;
    if (this.props.isFetched) {
      elementToRender = (
        <div>
          {this.renderReport()}
        </div>
      );
    }

    return (
      <div>
        <p className={CSS_OBJECT_HEADER}>Журнал зважування</p>
        {elementToRender}
      </div>
    );
  }
}

WeighingJournal.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetched: PropTypes.bool.isRequired,
  fetchLoadingBills: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchVehicles: PropTypes.func.isRequired,
  fetchNomenclature: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default connect(generateProps, {
  fetchLoadingBills,
  fetchClients,
  fetchVehicles,
  fetchNomenclature,
  fetchUsers,
})(WeighingJournal);
