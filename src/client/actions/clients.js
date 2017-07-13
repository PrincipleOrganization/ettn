import { ClientsApi } from '../utils';

export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';

export const FETCH_CLIENT = 'FETCH_CLIENT';
export const FETCH_CLIENT_ERROR = 'FETCH_CLIENT_ERROR';
export const FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS';

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const CREATE_CLIENT_ERROR = 'CREATE_CLIENT_ERROR';
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';

export const CHANGE_CLIENT = 'CHANGE_CLIENT';
export const CHANGE_CLIENT_ERROR = 'CHANGE_CLIENT_ERROR';
export const CHANGE_CLIENT_SUCCESS = 'CHANGE_CLIENT_SUCCESS';

export const DELETE_CLIENT = 'DELETE_CLIENT';
export const DELETE_CLIENT_ERROR = 'DELETE_CLIENT_ERROR';
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS';

export const fetchClients = () => (
  async (dispatch) => {
    dispatch({ type: FETCH_CLIENTS });
    try {
      const data = await ClientsApi.fetchClients();
      return dispatch({ type: FETCH_CLIENTS_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_CLIENTS_ERROR,
        e,
      });
    }
  }
);

export const fetchClient = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_CLIENT });
    try {
      const data = await ClientsApi.fetchClient(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_CLIENT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETCH_CLIENT_ERROR,
        e,
      });
    }
  }
);

export const createClient = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_CLIENT });
    try {
      const data = await ClientsApi.createClient(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_CLIENT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_CLIENT_ERROR,
        e,
      });
    }
  }
);

export const changeClient = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_CLIENT });
    try {
      const data = await ClientsApi.changeClient(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_CLIENT_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_CLIENT_ERROR,
        e,
      });
    }
  }
);

export const deleteClient = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_CLIENT });
    try {
      const data = await ClientsApi.deleteClient(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_CLIENT_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_CLIENT_ERROR,
        e,
      });
    }
  }
);
