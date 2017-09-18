import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSS_TABLE_CLASS } from '../../constants';

import { Modal, Spinner } from '../elements';

class CatalogSelectModal extends Component {
  constructor(props) {
    super(props);

    this.state = { activeRow: null };

    this.handleClick = this.handleClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
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
    let elementToRender = <Spinner />;

    const { isFetched, data, title, id, pick } = this.props;

    if (isFetched) {
      const rows = data.map((item) => {
        let row = (
          <tr
            key={item.id}
            className={this.state.activeRow === item.id ? 'active' : ''}
            onClick={() => this.handleClick(item.id)}
            onDoubleClick={this.selectItem}
          >
            <td>{item.name}</td>
          </tr>
        );
        let valid = false;

        if (pick) {
          const keys = Object.keys(pick);
          for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            const values = pick[key];
            for (let j = 0; j < values.length; j += 1) {
              if (item[key] === values[j]) {
                valid = true;
              }
            }
          }
        }
        
        if (pick && !valid) {
          row = null;
        }

        return row;
      });

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

CatalogSelectModal.defaultProps = {
  pick: null,
};

CatalogSelectModal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetched: PropTypes.bool.isRequired,
  pick: PropTypes.shape({}),
<<<<<<< HEAD
=======

  fetch: PropTypes.func.isRequired,
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
  select: PropTypes.func.isRequired,
};

export default CatalogSelectModal;
