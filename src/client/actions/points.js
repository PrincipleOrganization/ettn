import { PointsApi } from '../utils';

export const FETCH_POINTS = 'FETCH_POINTS';
export const FETCH_POINTS_ERROR = 'FETCH_POINTS_ERROR';
export const FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS';

export const FETCH_POINT = 'FETCH_POINT';
export const FETCH_POINT_ERROR = 'FETCH_POINT_ERROR';
export const FETCH_POINT_SUCCESS = 'FETCH_POINT_SUCCESS';

export const CREATE_POINT = 'CREATE_POINT';
export const CREATE_POINT_ERROR = 'CREATE_POINT_ERROR';
export const CREATE_POINT_SUCCESS = 'CREATE_POINT_SUCCESS';

export const CHANGE_POINT = 'CHANGE_POINT';
export const CHANGE_POINT_ERROR = 'CHANGE_POINT_ERROR';
export const CHANGE_POINT_SUCCESS = 'CHANGE_POINT_SUCCESS';

export const DELETE_POINT = 'DELETE_POINT';
export const DELETE_POINT_ERROR = 'DELETE_POINT_ERROR';
export const DELETE_POINT_SUCCESS = 'DELETE_POINT_SUCCESS';

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

export const fetchPoint = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_POINT });
    try {
      const data = await PointsApi.fetchPoint(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_POINT_SUCCESS, data });
    } catch (m) {
      return dispatch({
        type: FETCH_POINT_ERROR,
        m,
      });
    }
  }
);

export const createPoint = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_POINT });
    try {
      const data = await PointsApi.createPoint(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_POINT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_POINT_ERROR,
        e,
      });
    }
  }
);

export const changePoint = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_POINT });
    try {
      const data = await PointsApi.changePoint(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_POINT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_POINT_ERROR,
        e,
      });
    }
  }
);

export const deletePoint = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_POINT });
    try {
      const data = await PointsApi.deletePoint(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_POINT_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_POINT_ERROR,
        e,
      });
    }
  }
);
