import axios from 'axios';

import UsersApi from './users.api';
import PointsApi from './points.api';
import ClientsApi from './clients.api';
import DriversApi from './drivers.api';
import VehiclesApi from './vehicles.api';
import NomenclatureApi from './nomenclature.api';
import LoadingBillsApi from './loadingBills.api';

axios.defaults.baseURL = 'http://localhost:5500/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export {
  UsersApi,
  DriversApi,
  PointsApi,
  ClientsApi,
  VehiclesApi,
  NomenclatureApi,
  LoadingBillsApi,
};
