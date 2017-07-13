import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ClientsList from './ClientsList';
import Client from './Client';

const Clients = () => (
  <Switch>
    <Route exact path="/clients" component={ClientsList} />
    <Route path="/clients/new" component={Client} />
    <Route path="/clients/:id" component={Client} />
  </Switch>
);

export default Clients;
