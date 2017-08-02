import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

const DateTimePicker = ({
  readOnly,
  name,
  value,
  defaultValue,
  onChange,
}) => {
  const momentValue = moment(value);

  const handleOnChange = (v) => {
    if (!readOnly) {
      onChange({ target: { name, value: v, _isDatetime: true } });
    }
  };

  let className = '';
  if (readOnly) {
    className = 'disabled';
  }

  const open = readOnly ? false : null;

  return (
    <Datetime
      className={className}
      locale="uk_UA"
      open={open}
      value={momentValue}
      defaultValue={defaultValue}
      onChange={handleOnChange}
    />
  );
};

DateTimePicker.defaultProps = {
  defaultValue: moment(),
  onChange: (e) => {
    console.log(e);
  },
};

DateTimePicker.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default DateTimePicker;
