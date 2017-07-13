import React from 'react';
import { Switch, Route } from 'react-router-dom';

import VehiclesList from './VehiclesList';
import Vehicle from './Vehicle';

const Vehicles = () => (
  <Switch>
    <Route exact path="/vehicles" component={VehiclesList} />
    <Route path="/vehicles/new" component={Vehicle} />
    <Route path="/vehicles/:id" component={Vehicle} />
  </Switch>
);

export default Vehicles;
