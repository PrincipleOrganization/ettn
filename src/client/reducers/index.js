import { combineReducers } from 'redux';

import users from './users';
import drivers from './drivers';
import points from './points';
import clients from './clients';
import vehicles from './vehicles';
import nomenclature from './nomenclature';
import loadingBills from './loadingBills';

export default combineReducers({
  users,
  drivers,
  points,
  clients,
  vehicles,
  nomenclature,
  loadingBills,
});
