import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '' };

    this.handleClear = this.handleClear.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleClear() {
    this.props.search('');
    this.setState({ search: '' });
  }

  handleOnChange(e) {
    e.preventDefault();
    const search = e.target.value;
    this.props.search(search);
    this.setState({ search });
  }

  render() {
    return (
      <div className="input-group">
        <input
          className="form-control input-sm"
          type="text"
          value={this.state.search}
          placeholder="Пошук"
          onChange={this.handleOnChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default btn-sm"
            type="button"
            onClick={this.handleClear}
          >
            Очистити
          </button>
        </span>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  search: PropTypes.func.isRequired,
};

export default SearchPanel;