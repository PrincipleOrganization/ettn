import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Settings from './Settings';
import Users from '../../components/catalogs/users/Users';
import ElementsCleaner from './ElementsCleaner';
<<<<<<< HEAD
import DBView from './DBView';
=======
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10

const SettingsRouter = () => (
  <Switch>
    <Route exact path="/settings" component={Settings} />
    <Route path="/settings/users" component={Users} />
    <Route path="/settings/cleaner" component={ElementsCleaner} />
<<<<<<< HEAD
    <Route path="/settings/db" component={DBView} />
=======
>>>>>>> 7283fdfa370d4d407c3eaed6cae66ba0b307df10
  </Switch>
);

export default SettingsRouter;
