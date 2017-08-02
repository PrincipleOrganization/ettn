/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import { Base } from './containers';

ReactDOM.render(
  <Provider store={store}>
    <Base />
  </Provider>,
  document.getElementById('app'),
);
