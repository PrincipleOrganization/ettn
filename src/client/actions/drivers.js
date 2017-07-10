import { DriversApi } from '../utils';

export const FETCH_DRIVERS = 'FETCH_DRIVERS';
export const FETCH_DRIVERS_ERROR = 'FETCH_DRIVERS_ERROR';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';

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
