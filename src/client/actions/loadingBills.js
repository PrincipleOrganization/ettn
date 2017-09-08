import { LoadingBillsApi } from '../utils';

export const FETHC_LOADING_BILLS = 'FETHC_LOADING_BILLS';
export const FETHC_LOADING_BILLS_ERROR = 'FETHC_LOADING_BILLS_ERROR';
export const FETHC_LOADING_BILLS_SUCCESS = 'FETHC_LOADING_BILLS_SUCCESS';

export const FETCH_LOADING_BILL = 'FETCH_LOADING_BILL';
export const FETCH_LOADING_BILL_ERROR = 'FETCH_LOADING_BILL_ERROR';
export const FETCH_LOADING_BILL_SUCCESS = 'FETCH_LOADING_BILL_SUCCESS';

export const CREATE_LOADING_BILL = 'CREATE_LOADING_BILL';
export const CREATE_LOADING_BILL_ERROR = 'CREATE_LOADING_BILL_ERROR';
export const CREATE_LOADING_BILL_SUCCESS = 'CREATE_LOADING_BILL_SUCCESS';

export const CHANGE_LOADING_BILL = 'CHANGE_LOADING_BILL';
export const CHANGE_LOADING_BILL_ERROR = 'CHANGE_LOADING_BILL_ERROR';
export const CHANGE_LOADING_BILL_SUCCESS = 'CHANGE_LOADING_BILL_SUCCESS';

export const DELETE_LOADING_BILLS = 'DELETE_LOADING_BILLS';
export const DELETE_LOADING_BILLS_ERROR = 'DELETE_LOADING_BILLS_ERROR';
export const DELETE_LOADING_BILLS_SUCCESS = 'DELETE_LOADING_BILLS_SUCCESS';

export const fetchLoadingBills = () => (
  async (dispatch) => {
    dispatch({ type: FETHC_LOADING_BILLS });
    try {
      const data = await LoadingBillsApi.fetchLoadingBills();
      return dispatch({ type: FETHC_LOADING_BILLS_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: FETHC_LOADING_BILLS_ERROR,
        e,
      });
    }
  }
);

export const fetchLoadingBill = id => (
  async (dispatch) => {
    dispatch({ type: FETCH_LOADING_BILL });
    try {
      const data = await LoadingBillsApi.fetchLoadingBill(id);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: FETCH_LOADING_BILL_SUCCESS, data });
    } catch (m) {
      return dispatch({
        type: FETCH_LOADING_BILL_ERROR,
        m,
      });
    }
  }
);

export const createLoadingBill = payload => (
  async (dispatch) => {
    dispatch({ type: CREATE_LOADING_BILL });
    try {
      const data = await LoadingBillsApi.createLoadingBill(payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CREATE_LOADING_BILL_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CREATE_LOADING_BILL_ERROR,
        e,
      });
    }
  }
);

export const changeLoadingBill = (id, payload) => (
  async (dispatch) => {
    dispatch({ type: CHANGE_LOADING_BILL });
    try {
      const data = await LoadingBillsApi.changeLoadingBill(id, payload);
      if (data.messages.length !== 0) {
        throw data.messages;
      }
      return dispatch({ type: CHANGE_LOADING_BILL_SUCCESS, data });
    } catch (e) {
      return dispatch({
        type: CHANGE_LOADING_BILL_ERROR,
        e,
      });
    }
  }
);

export const deleteLoadingBill = id => (
  async (dispatch) => {
    dispatch({ type: DELETE_LOADING_BILLS });
    try {
      const data = await LoadingBillsApi.deleteLoadingBill(id);
      if (!data.success) {
        throw data.messages;
      }
      return dispatch({ type: DELETE_LOADING_BILLS_SUCCESS, id });
    } catch (e) {
      return dispatch({
        type: DELETE_LOADING_BILLS_ERROR,
        e,
      });
    }
  }
);
