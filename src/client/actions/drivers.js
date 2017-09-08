import { DriversApi } from '../utils';

export const FETCH_DRIVERS = 'FETCH_DRIVERS';
export const FETCH_DRIVERS_ERROR = 'FETCH_DRIVERS_ERROR';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';

export const FETCH_DRIVER = 'FETCH_DRIVER';
export const FETCH_DRIVER_ERROR = 'FETCH_DRIVER_ERROR';
export const FETCH_DRIVER_SUCCESS = 'FETCH_DRIVER_SUCCESS';

export const CREATE_DRIVER = 'CREATE_DRIVER';
export const CREATE_DRIVER_ERROR = 'CREATE_DRIVER_ERROR';
export const CREATE_DRIVER_SUCCESS = 'CREATE_DRIVER_SUCCESS';

export const CHANGE_DRIVER = 'CHANGE_DRIVER';
export const CHANGE_DRIVER_ERROR = 'CHANGE_DRIVER_ERROR';
export const CHANGE_DRIVER_SUCCESS = 'CHANGE_DRIVER_SUCCESS';

export const DELETE_DRIVER = 'DELETE_DRIVER';
export const DELETE_DRIVER_ERROR = 'DELETE_DRIVER_ERROR';
export const DELETE_DRIVER_SUCCESS = 'DELETE_DRIVER_SUCCESS';

export const fetchDrivers = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_DRIVERS });
    try {
      const data = await DriversApi.fetchDrivers();
      return dispatch({ type: FETCH_DRIVERS_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_DRIVERS_ERROR,
        e,
      });
    }
  }
);

export const fetchDriver = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_DRIVER });
    try {
      const data = await DriversApi.fetchDriver(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_DRIVER_SUCCESS, data });
    } catch (m) {
      return dispatch({
        type: FETCH_DRIVER_ERROR,
        m,
      });
    }
  }
);

export const createDriver = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_DRIVER });
    try {
      const data = await DriversApi.createDriver(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_DRIVER_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_DRIVER_ERROR,
        e,
      });
    }
  }
);

export const changeDriver = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_DRIVER });
    try {
      const data = await DriversApi.changeDriver(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_DRIVER_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_DRIVER_ERROR,
        e,
      });
    }
  }
);

export const deleteDriver = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_DRIVER });
    try {
      const data = await DriversApi.deleteDriver(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_DRIVER_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_DRIVER_ERROR,
        e,
      });
    }
  }
);
