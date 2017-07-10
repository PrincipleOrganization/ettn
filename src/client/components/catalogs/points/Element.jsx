import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Element extends Component {
  constructor(props) {
    super(props);

    this.handleReqChange = this.handleReqChange.bind(this);
  }

  handleReqChange(e) {
    this.props.changeWrapperReqProp(e.target.name, e.target.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="name"
          onChange={this.handleReqChange}
        />
      </div>
    );
  }
}

Element.defaultProps = {
  changeWrapperReqProp: (name, value) => {
    console.log(`${name}: ${value}`);
  },
};

Element.propTypes = {
  changeWrapperReqProp: PropTypes.func.isRequired,
};

export default Element;
