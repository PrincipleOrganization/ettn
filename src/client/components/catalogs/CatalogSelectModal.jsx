import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSS_TABLE_CLASS } from '../../constants';

import { Modal } from '../elements';

class CatalogSelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRow: null };

    this.handleClick = this.handleClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount() {
    this.props.fetch();
  }

  handleClick(activeRow) {
    this.setState({ activeRow });
  }

  selectItem() {
    this.props.select({
      target: { 
        name: this.props.name,
        value: this.state.activeRow,
        _selected: true,
      },
    });

    // TODO: close modal
  }

  render() {
    let elementToRender = 'Loading...';

    const { isFetched, data, title, id } = this.props;

    if (isFetched) {
      const rows = data.map(item => (
        <tr
          key={item.id}
          className={this.state.activeRow === item.id ? 'active' : ''}
          onClick={() => this.handleClick(item.id)}
          onDoubleClick={this.selectItem}
        >
          <td>{item.name}</td>
        </tr>
      ));

      elementToRender = (
        <Modal title={title} id={id}>
          <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
            <button type="button" className="btn btn-sm btn-primary" onClick={this.selectItem}>Вибрати</button>
          </div>
          <div>
            <table className={CSS_TABLE_CLASS}>
              <thead>
                <tr>
                  <th>Найменування</th>
                </tr>
              </thead>

              <tbody>{rows}</tbody>
            </table>
          </div>
        </Modal>
      );
    }

    return (
      <div>
        {elementToRender}
      </div>
    );
  }
}

CatalogSelectModal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetched: PropTypes.bool.isRequired,

  fetch: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

export default CatalogSelectModal;
