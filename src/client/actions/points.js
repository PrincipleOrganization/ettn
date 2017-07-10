import { PointsApi } from '../utils';

export const FETCH_POINTS = 'FETCH_POINTS';
export const FETCH_POINTS_ERROR = 'FETCH_POINTS_ERROR';
export const FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS';

export const CREATE_POINT = 'CREATE_POINT';
export const CREATE_POINT_ERROR = 'CREATE_POINT_ERROR';
export const CREATE_POINT_SUCCESS = 'CREATE_POINT_SUCCESS';

export const fetchPoints = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_POINTS });
    try {
      const data = await PointsApi.fetchPoints();
      return dispatch({ type: FETCH_POINTS_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_POINTS_ERROR,
        e,
      });
    }
  }
);

export const createPoint = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_POINT });
    try {
      const data = await PointsApi.createPoint(payload);
      return dispatch({ type: CREATE_POINT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_POINT_ERROR,
        e,
      });
    }
  }
);
