
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
