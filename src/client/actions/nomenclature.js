import { NomenclatureApi } from '../utils';

export const FETCH_NOMENCLATURE = 'FETCH_NOMENCLATURE';
export const FETCH_NOMENCLATURE_ERROR = 'FETCH_NOMENCLATURE_ERROR';
export const FETCH_NOMENCLATURE_SUCCESS = 'FETCH_NOMENCLATURE_SUCCESS';

export const FETCH_ONE_NOMENCLATURE = 'FETCH_ONE_NOMENCLATURE';
export const FETCH_ONE_NOMENCLATURE_ERROR = 'FETCH_ONE_NOMENCLATURE_ERROR';
export const FETCH_ONE_NOMENCLATURE_SUCCESS = 'FETCH_ONE_NOMENCLATURE_SUCCESS';

export const CREATE_NOMENCLATURE = 'CREATE_NOMENCLATURE';
export const CREATE_NOMENCLATURE_ERROR = 'CREATE_NOMENCLATURE_ERROR';
export const CREATE_NOMENCLATURE_SUCCESS = 'CREATE_NOMENCLATURE_SUCCESS';

export const CHANGE_NOMENCLATURE = 'CHANGE_NOMENCLATURE';
export const CHANGE_NOMENCLATURE_ERROR = 'CHANGE_NOMENCLATURE_ERROR';
export const CHANGE_NOMENCLATURE_SUCCESS = 'CHANGE_NOMENCLATURE_SUCCESS';

export const DELETE_NOMENCLATURE = 'DELETE_NOMENCLATURE';
export const DELETE_NOMENCLATURE_ERROR = 'DELETE_NOMENCLATURE_ERROR';
export const DELETE_NOMENCLATURE_SUCCESS = 'DELETE_NOMENCLATURE_SUCCESS';

export const fetchNomenclature = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.fetchNomenclature();
      return dispatch({ type: FETCH_NOMENCLATURE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_NOMENCLATURE_ERROR,
        e,
      });
    }
  }
);

export const fetchOneNomenclature = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_ONE_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.fetchOneNomenclature(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_ONE_NOMENCLATURE_SUCCESS, data });
    } catch (m) {
      return dispatch({
        type: FETCH_ONE_NOMENCLATURE_ERROR,
        m,
      });
    }
  }
);

export const createNomenclature = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.createNomenclature(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_NOMENCLATURE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_NOMENCLATURE_ERROR,
        e,
      });
    }
  }
);

export const changeNomenclature = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.changeNomenclature(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_NOMENCLATURE_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_NOMENCLATURE_ERROR,
        e,
      });
    }
  }
);

export const deleteNomenclature = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_NOMENCLATURE });
    try {
      const data = await NomenclatureApi.deleteNomenclature(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_NOMENCLATURE_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_NOMENCLATURE_ERROR,
        e,
      });
    }
  }
);
