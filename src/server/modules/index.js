import users from './users/routes';
import point from './points/routes';
import nomenclature from './nomenclature/routes';
import client from './clients/routes';
import driver from './drivers/routes';
import vehicle from './vehicles/routes';
import loadingBill from './loadingBills/routes';

export default (app) => {
  app.use('/api/v1/user', users);
  app.use('/api/v1/point', point);
  app.use('/api/v1/nomenclature', nomenclature);
  app.use('/api/v1/client', client);
  app.use('/api/v1/driver', driver);
  app.use('/api/v1/vehicle', vehicle);
  app.use('/api/v1/loadingBill', loadingBill);
};
