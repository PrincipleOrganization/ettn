import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, noMargin }) => {
  return (
    <i className={`icon fa ${icon} ${(noMargin) ? 'no-right-margin' : ''}`} aria-hidden="true" />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

Icon.User = () => (
  <Icon icon="fa-user-circle" />
);

Icon.Users = props => (
  <Icon {...props} icon="fa-users" />
);

Icon.Create = () => (
  <Icon icon="fa-plus-circle" />
);

Icon.Refresh = () => (
  <Icon icon="fa-refresh" />
);

Icon.Remove = () => (
  <Icon icon="fa-trash" />
);

Icon.Check = () => (
  <Icon icon="fa-check-circle" />
);

Icon.Verified = () => (
  <Icon icon="fa-check" />
);

Icon.Save = () => (
  <Icon icon="fa-floppy-o" />
);

Icon.Scale = () => (
  <Icon icon="fa-balance-scale" />
);

Icon.Settings = () => (
  <Icon icon="fa-cog" />
);

Icon.Logout = () => (
  <Icon icon="fa-sign-out" />
);

Icon.MarkToRemove = () => (
  <Icon icon="fa-trash" />
);

Icon.CaretUp = () => (
  <Icon icon="fa-caret-square-o-up" />
);

Icon.CaretDown = () => (
  <Icon icon="fa-caret-square-o-down" />
);

Icon.Asterisk = () => (
  <Icon icon="fa-asterisk" />
);

Icon.SaveClose = () => (
  <Icon icon="fa-thumbs-o-up" />
);

Icon.Filter = props => (
  <Icon {...props} icon="fa-filter" />
);

Icon.Open = props => (
  <Icon {...props} icon="fa-pencil" />
);

Icon.Income = props => (
  <Icon {...props} icon="fa-plus" />
);

Icon.Outcome = props => (
  <Icon {...props} icon="fa-minus" />
);

export default Icon;
