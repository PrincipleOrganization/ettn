import { ScalesApi } from '../utils';

export const FETCH_SCALES = 'FETCH_SCALES';
export const FETCH_SCALES_ERROR = 'FETCH_SCALES_ERROR';
export const FETCH_SCALES_SUCCESS = 'FETCH_SCALES_SUCCESS';

export const FETCH_SCALE = 'FETCH_SCALE';
export const FETCH_SCALE_ERROR = 'FETCH_SCALE_ERROR';
export const FETCH_SCALE_SUCCESS = 'FETCH_SCALE_SUCCESS';

export const CREATE_SCALE = 'CREATE_SCALE';
export const CREATE_SCALE_ERROR = 'CREATE_SCALE_ERROR';
export const CREATE_SCALE_SUCCESS = 'CREATE_SCALE_SUCCESS';

export const CHANGE_SCALE = 'CHANGE_SCALE';
export const CHANGE_SCALE_ERROR = 'CHANGE_SCALE_ERROR';
export const CHANGE_SCALE_SUCCESS = 'CHANGE_SCALE_SUCCESS';

export const DELETE_SCALE = 'DELETE_SCALE';
export const DELETE_SCALE_ERROR = 'DELETE_SCALE_ERROR';
export const DELETE_SCALE_SUCCESS = 'DELETE_SCALE_SUCCESS';

export const fetchScales = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_SCALES });
    try {
      const data = await ScalesApi.fetchScales();
      return dispatch({ type: FETCH_SCALES_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_SCALES_ERROR,
        e,
      });
    }
  }
);

export const fetchScale = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_SCALE });
    try {
      const data = await ScalesApi.fetchScale(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_SCALE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_SCALE_ERROR,
        e,
      });
    }
  }
);

export const createScale = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_SCALE });
    try {
      const data = await ScalesApi.createScale(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_SCALE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_SCALE_ERROR,
        e,
      });
    }
  }
);

export const changeScale = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_SCALE });
    try {
      const data = await ScalesApi.changeScale(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_SCALE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_SCALE_ERROR,
        e,
      });
    }
  }
);

export const deleteScale = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_SCALE });
    try {
      const data = await ScalesApi.deleteScale(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_SCALE_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_SCALE_ERROR,
        e,
      });
    }
  }
);
