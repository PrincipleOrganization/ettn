import { VehiclesApi } from '../utils';

export const FETCH_VEHICLES = 'FETCH_VEHICLES';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';

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
