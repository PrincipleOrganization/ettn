
/*
* SPEC
* Get All
* Create
* Change
* Verification
* Delete
* Weight Th Doc
*/

import { LoadingBillsApi } from '../utils';

export const FETHC_LOADING_BILLS = 'FETHC_LOADING_BILLS';
export const FETHC_LOADING_BILLS_ERROR = 'FETHC_LOADING_BILLS_ERROR';
export const FETHC_LOADING_BILLS_SUCCESS = 'FETHC_LOADING_BILLS_SUCCESS';

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
