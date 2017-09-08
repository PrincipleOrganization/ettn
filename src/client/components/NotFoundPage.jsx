import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ location: { pathname } }) => (
  <div className="сol-xs-12 col-sm-8 col-sm-offset-2 not-found">
    <h1>От халепа...</h1>
    <h4>Такого ресурсу (&ldquo;{pathname}&rdquo;) немає</h4>
    <h5>Але Ви можете перейти на <Link to="/loadingBills">Товарно-транспортні накладні</Link></h5>
  </div>
);

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotFoundPage;