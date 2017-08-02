import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadingBillsList from './LoadingBillsList';
import LoadingBill from './LoadingBill';

const loadingBills = () => (
  <Switch>
    <Route exact path="/loadingBills" component={LoadingBillsList} />
    <Route path="/loadingBills/new" component={LoadingBill} />
    <Route path="/loadingBills/:id" component={LoadingBill} />
  </Switch>
);

export default loadingBills;
