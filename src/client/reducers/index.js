import { combineReducers } from 'redux';

import users from './users';
import drivers from './drivers';
import points from './points';
import clients from './clients';
import vehicles from './vehicles';
import scales from './scales';
import nomenclature from './nomenclature';
import loadingBills from './loadingBills';

export const updateData = (data, record) => {
  let newData = [...data];
  let needToAdd = true;
  for (let i = 0; i < newData.length; i += 1) {
    if (newData[i].id === record.id) {
      newData[i] = record;
      needToAdd = false;
    }
  }

  if (needToAdd) {
    newData = [...newData, record];
  }

  return newData;
};

export default combineReducers({
  users,
  drivers,
  points,
  clients,
  vehicles,
  scales,
  nomenclature,
  loadingBills,
});
