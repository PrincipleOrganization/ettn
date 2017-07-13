import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PointsList from './PointsList';
import Point from './Point';

const Points = () => (
  <Switch>
    <Route exact path="/points" component={PointsList} />
    <Route path="/points/new" component={Point} />
    <Route path="/points/:id" component={Point} />
  </Switch>
);

export default Points;
