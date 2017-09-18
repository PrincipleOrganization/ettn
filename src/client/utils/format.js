import moment from 'moment';

export const DATE_FORMAT = 'D/M/YYYY H:m:s';

export const formatDate = date => (
  moment(date).format(DATE_FORMAT)
);
