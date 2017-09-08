/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/sweetalert2.min.css';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import store from './store';

import { Base } from './containers';

ReactDOM.render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById('app'),
);
