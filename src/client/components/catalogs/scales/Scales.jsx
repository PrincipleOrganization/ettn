import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ScalesList from './ScalesList';
import Scale from './Scale';

const Scales = () => (
  <Switch>
    <Route exact path="/scales" component={ScalesList} />
    <Route path="/scales/new" component={Scale} />
    <Route path="/scales/:id" component={Scale} />
  </Switch>
);

export default Scales;
