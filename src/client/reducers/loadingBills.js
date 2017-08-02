import {
  FETHC_LOADING_BILLS,
  FETHC_LOADING_BILLS_ERROR,
  FETHC_LOADING_BILLS_SUCCESS,
  FETCH_LOADING_BILL,
  FETCH_LOADING_BILL_ERROR,
  FETCH_LOADING_BILL_SUCCESS,
  CREATE_LOADING_BILL,
  CREATE_LOADING_BILL_ERROR,
  CREATE_LOADING_BILL_SUCCESS,
  CHANGE_LOADING_BILL,
  CHANGE_LOADING_BILL_ERROR,
  CHANGE_LOADING_BILL_SUCCESS,
  DELETE_LOADING_BILLS,
  DELETE_LOADING_BILLS_ERROR,
  DELETE_LOADING_BILLS_SUCCESS,
} from '../actions/loadingBills';

import { updateData } from '.';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETHC_LOADING_BILLS:
      return {
        ...state,
      };
    case FETHC_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETHC_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_LOADING_BILL:
      return {
        ...state,
      };
    case FETCH_LOADING_BILL_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.loadingBill),
        isFetched: true,
      };

    // CREATE
    case CREATE_LOADING_BILL:
      return {
        ...state,
        isFetched: false,
      };
    case CREATE_LOADING_BILL_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.loadingBill.id),
      };
    case CREATE_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.loadingBill,
        ],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_LOADING_BILL:
      return {
        ...state,
      };
    case CHANGE_LOADING_BILL_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.loadingBill),
        isFetched: true,
      };

    // DELETE
    case DELETE_LOADING_BILLS:
      return {
        ...state,
      };
    case DELETE_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
