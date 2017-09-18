import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationStack } from 'react-notification';

const removeNotification = (notifications, notification) => {
  const index = notifications.indexOf(notification);
  notifications.splice(index, 1);
};

const concatState = (state) => {
  return [
    ...state.loadingBills.e || [], 
    ...state.clients.e || [],
    ...state.drivers.e || [],
    ...state.nomenclature.e || [],
    ...state.points.e || [],
    ...state.scales.e || [],
    ...state.users.e || [],
    ...state.vehicles.e || [],
  ];
}

const Notifications = ({ notifications }) => {
  const stack = [];
  for (let i = 0; i < notifications.length; i += 1) {
    const notification = notifications[i];
    stack.push({
      message: notification.toString(),
      key: notifications.indexOf(notification),
      action: <span aria-hidden="true">&times;</span>,
      dismissAfter: 10000,
      onClick: (n, deactivate) => {
        deactivate();
        removeNotification(stack, n);
      },
    });
  }

  return (
    <NotificationStack notifications={stack} onDismiss={(n) => { removeNotification(stack, n); }} />
  );
};

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(state => ({
  notifications: concatState(state),
}))(Notifications);
