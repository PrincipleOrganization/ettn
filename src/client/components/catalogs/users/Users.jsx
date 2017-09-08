import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersList from './UsersList';
import User from './User';

const Users = () => (
  <Switch>
    <Route exact path="/settings/users" component={UsersList} />
    <Route path="/settings/users/new" component={User} />
    <Route path="/settings/users/:id" component={User} />
  </Switch>
);

export default Users;
