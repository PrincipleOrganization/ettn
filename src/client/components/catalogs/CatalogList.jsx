import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSS_TABLE_CLASS, CSS_OBJECT_HEADER } from '../../constants';

class CatalogList extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRow: '' };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  handleClick(activeRow) {
    this.setState({ activeRow });
  }

  handleDoubleClick(activeRow) {
    this.props.history.push(`${this.props.url}/${activeRow}`);
  }

  handleCreate() {
    this.props.history.push(`${this.props.url}/new`);
  }

  handleDelete() {
    const { activeRow } = this.state;
    if (activeRow) {
      this.props.delete(activeRow);
      this.setState({ activeRow: '' });
    }
  }

  handleRefresh() {
    this.props.fetch();
    this.setState({ activeRow: '' });
  }

  render() {
    let elementToRender = 'Loading...';

    const { isFetched, data, title } = this.props;
    if (isFetched) {
      const rows = data.map(item => (
        <tr
          key={item.id}
          className={this.state.activeRow === item.id ? 'active' : ''}
          onClick={() => this.handleClick(item.id)}
          onDoubleClick={() => this.handleDoubleClick(item.id)}
        >
          <td>{item.name}</td>
        </tr>
      ));

      elementToRender = (
        <div>
          <p className={CSS_OBJECT_HEADER}>{title}</p>

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
                onClick={this.handleRefresh}
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

          <table className={CSS_TABLE_CLASS}>
            <thead>
              <tr>
                <th>Найменування</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </table>
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

CatalogList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetched: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,

  fetch: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default CatalogList;
