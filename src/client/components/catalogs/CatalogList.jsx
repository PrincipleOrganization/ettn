import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { CSS_OBJECT_HEADER } from '../../constants';

import { Icon, Spinner, SearchPanel, ListToolbar } from '../elements';
import { deleteDialog } from './methods';
import { catalogs } from '../../utils';

class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRow: '', activeRowMark: false };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleMarkToRemove = this.handleMarkToRemove.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  handleClick(activeRow, activeRowMark) {
    this.setState({ activeRow, activeRowMark });
  }

  handleDoubleClick(activeRow) {
    this.props.history.push(`${this.props.url}/${activeRow}`);
  }

  handleCreate() {
    this.props.history.push(`${this.props.url}/new`);
  }

  async handleDelete() {
    const { activeRow, activeRowMark } = this.state;
    if (activeRow) {
      const value = catalogs.getCatalogValueById(this.props.data, activeRow);
      await this.props.change(activeRow, { ...value, mark: !activeRowMark });
      this.setState({ activeRow: '', activeRowMark: false });
    }
  }

  handleRefresh() {
    this.props.fetch();
    this.setState({ activeRow: '' });
  }

  handleMarkToRemove() {
    const { activeRow, activeRowMark } = this.state;
    if (activeRow) {
      deleteDialog(this, activeRowMark, true);
    }
  }

  renderTable() {
    const rows = this.props.data.map((item) => {
      const icon = (item.mark) ? Icon.MarkToRemove : null;
      return {
        i: this.props.data.indexOf(item),
        id: item.id,
        icon,
        name: item.name,
        mark: item.mark,
      };
    });

    const formatter = (cell, row) => {
      const { icon: CellIcon } = rows[row.i];
      if (CellIcon) {
        return (
          <span><CellIcon />{cell}</span>
        );
      }
      return cell;
    };

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
      searchPanel: props => (<SearchPanel {...props} />),
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
                onClick={this.handleRefresh}
              >
                <Icon.Refresh />
                Оновити
              </button>
              <button
                type="button"
                className={`btn btn-default ${this.state.activeRow ? '' : 'disabled'}`}
                onClick={this.handleMarkToRemove}
              >
                <Icon.Remove />
                Видалити
              </button>
            </div>
          )}
        />
      ),
      onRowClick: (row) => { this.handleClick(row.id, row.mark); },
      onRowDoubleClick: (row) => { this.handleDoubleClick(row.id); },
    };

    return (
      <BootstrapTable
        data={rows}
        options={options}
        hover
        search
        pagination
        multiColumnSearch
      >
        <TableHeaderColumn dataField="id" hidden isKey>Назва</TableHeaderColumn>
        <TableHeaderColumn
          dataField="name"
          dataSort
          dataFormat={formatter}
        >
          Назва
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }

  render() {
    let elementToRender = <Spinner />;

    const { isFetched, data, baseUrl, baseUrlTitle, title: catalogTitle } = this.props;
    if (isFetched) {
      const rows = data.map(item => (
        <tr
          key={item.id}
          className={this.state.activeRow === item.id ? 'active' : ''}
          onClick={() => this.handleClick(item.id, item.mark)}
          onDoubleClick={() => this.handleDoubleClick(item.id)}
        >
          <td>{(item.mark) ? <Icon.MarkToRemove /> : null}</td>
          <td>{item.name}</td>
        </tr>
      ));

      let title = catalogTitle;
      if (baseUrl) {
        title = (
          <span>
            <Link to={baseUrl}>{baseUrlTitle}</Link> / {title}
          </span>
        );
      }

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{title}</p>

          {this.renderTable()}
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

CatalogList.defaultProps = {
  baseUrl: null,
  baseUrlTitle: null,
};

CatalogList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetched: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  baseUrlTitle: PropTypes.string,
  history: PropTypes.shape().isRequired,

  fetch: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default CatalogList;
