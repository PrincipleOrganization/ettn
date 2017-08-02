import React from 'react';
import PropTypes from 'prop-types';

import { CSS_INPUT } from '../../constants';

import DatetimePicker from './DatetimePicker';
import ModalSelect from './ModalSelect';

const Field = ({
  title,
  name,
  type,
  readOnly,
  placeholder,
  value,
  width,
  selectButton,
  datetime,
  withLabel = true,
  selector,
  table,
  onChange,
}) => {
  let input = (
    <input
      type={type}
      className={CSS_INPUT}
      readOnly={readOnly}
      id={name}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );

  if (datetime) {
    input = (
      <DatetimePicker
        readOnly={readOnly}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }

  let elementToRender = input;
  let modal;
  if (selectButton && !readOnly) {
    elementToRender = (
      <div className="input-group">
        {input}
        <span className="input-group-btn">
          <button
            className="btn btn-default btn-sm"
            type="button"
            data-toggle="modal"
            data-target={`#${name}_modal`}
          >
            ...
          </button>
        </span>
      </div>
    );

    modal = (
      <ModalSelect
        selector={selector}
        table={table}
        id={`${name}_modal`}
        name={name}
        select={onChange}
      />
    );
  }

  let label;
  if (withLabel) {
    label = (<label htmlFor={name} className="col-sm-1 control-label">{title}</label>);
  }

  return (
    <div>
      {label}
      <div className={`col-sm-${width}`}>
        {elementToRender}
      </div>
      {modal}
    </div>
  );
};

export default Field;