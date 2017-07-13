import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DriversList from './DriversList';
import Driver from './Driver';

const Drivers = () => (
  <Switch>
    <Route exact path="/drivers" component={DriversList} />
    <Route path="/drivers/new" component={Driver} />
    <Route path="/drivers/:id" component={Driver} />
  </Switch>
);

export default Drivers;
