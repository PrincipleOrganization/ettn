import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Settings from './Settings';
import Users from '../../components/catalogs/users/Users';
import ElementsCleaner from './ElementsCleaner';

const SettingsRouter = () => (
  <Switch>
    <Route exact path="/settings" component={Settings} />
    <Route path="/settings/users" component={Users} />
    <Route path="/settings/cleaner" component={ElementsCleaner} />
  </Switch>
);

export default SettingsRouter;
