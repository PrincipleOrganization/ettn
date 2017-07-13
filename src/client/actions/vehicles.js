import { VehiclesApi } from '../utils';

export const FETCH_VEHICLES = 'FETCH_VEHICLES';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';

export const FETCH_VEHICLE = 'FETCH_VEHICLE';
export const FETCH_VEHICLE_ERROR = 'FETCH_VEHICLE_ERROR';
export const FETCH_VEHICLE_SUCCESS = 'FETCH_VEHICLE_SUCCESS';

export const CREATE_VEHICLE = 'CREATE_VEHICLE';
export const CREATE_VEHICLE_ERROR = 'CREATE_VEHICLE_ERROR';
export const CREATE_VEHICLE_SUCCESS = 'CREATE_VEHICLE_SUCCESS';

export const CHANGE_VEHICLE = 'CHANGE_VEHICLE';
export const CHANGE_VEHICLE_ERROR = 'CHANGE_VEHICLE_ERROR';
export const CHANGE_VEHICLE_SUCCESS = 'CHANGE_VEHICLE_SUCCESS';

export const DELETE_VEHICLE = 'DELETE_VEHICLE';
export const DELETE_VEHICLE_ERROR = 'DELETE_VEHICLE_ERROR';
export const DELETE_VEHICLE_SUCCESS = 'DELETE_VEHICLE_SUCCESS';

export const fetchVehicles = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_VEHICLES });
    try {
      const data = await VehiclesApi.fetchVehicles();
      return dispatch({ type: FETCH_VEHICLES_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_VEHICLES_ERROR,
        e,
      });
    }
  }
);

export const fetchVehicle = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_VEHICLE });
    try {
      const data = await VehiclesApi.fetchVehicle(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_VEHICLE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_VEHICLE_ERROR,
        e,
      });
    }
  }
);

export const createVehicle = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_VEHICLE });
    try {
      const data = await VehiclesApi.createVehicle(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_VEHICLE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_VEHICLE_ERROR,
        e,
      });
    }
  }
);

export const changeVehicle = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_VEHICLE });
    try {
      const data = await VehiclesApi.changeVehicle(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_VEHICLE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_VEHICLE_ERROR,
        e,
      });
    }
  }
);

export const deleteVehicle = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_VEHICLE });
    try {
      const data = await VehiclesApi.deleteVehicle(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_VEHICLE_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_VEHICLE_ERROR,
        e,
      });
    }
  }
);
