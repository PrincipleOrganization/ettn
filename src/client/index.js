/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

const element = document.createElement('div');
element.id = 'app';
document.body.prepend(element);

ReactDOM.render(
  <div>
    Hello wordl!
  </div>,
  document.getElementById('app'));
