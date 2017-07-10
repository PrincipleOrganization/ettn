import { ClientsApi } from '../utils';

export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';

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
