import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Field } from '../../elements';

class WeighingModalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getWeight = this.getWeight.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getWeight() {

  }

  render() {
    const { id, scale } = this.props;

    return (
      <Modal id={id} title="Зважування">
        <div>
          <div className="btn-toolbar object-toolbar clearfix" role="toolbar">
            <button type="button" className="btn btn-sm btn-primary" onClick={this.getWeight}>Отримати вагу</button>
          </div>
          <div>
            <div className="row">
              <Field
                title={'Ваги'}
                name={'scale'}
                type={'text'}
                placeholder={'Ваги'}
                value={scale}
                width={5}
                readOnly
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

WeighingModalForm.defaultProps = {
  scale: '',
};

WeighingModalForm.propTypes = {
  id: PropTypes.string.isRequired,
  scale: PropTypes.string,
};

export default WeighingModalForm;