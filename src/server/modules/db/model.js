import { database } from '../../config';

const db = database();

export const getDb = () => {
  db.read();
  return db.getState();
}

export const setDb = (state) => {
  db.read();
  return db.setState(state);
}
