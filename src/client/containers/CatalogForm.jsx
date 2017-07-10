import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createPoint } from '../actions/points';

class CatalogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reqs: {},
    };

    this.handleFormSave = this.handleFormSave.bind(this);
    this.changeReqProp = this.changeReqProp.bind(this);
  }

  handleFormSave() {
    this.props.createPoint({ ...this.state.reqs });
    // this.props.save(this.state.reqs.name);
  }

  changeReqProp(name, value) {
    this.setState({
      reqs: { [name]: value },
    });
  }

  render() {
    const children = Children.map(this.props.children, child => (
      React.cloneElement(child, { ref: '_form', changeWrapperReqProp: this.changeReqProp })
    ));

    return (
      <div>
        <div>
          <button onClick={this.handleFormSave}>Зберегти</button>
        </div>
        {children}
      </div>
    );
  }
}

CatalogForm.propTypes = {
  children: PropTypes.element.isRequired,
  // save: PropTypes.func.isRequired,
};

export default connect(undefined, { createPoint })(CatalogForm);
