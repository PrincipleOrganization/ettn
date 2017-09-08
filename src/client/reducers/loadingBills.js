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
  e: [],
  m: [],
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETHC_LOADING_BILLS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETHC_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETHC_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_LOADING_BILL:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_LOADING_BILL_ERROR:
      return {
        ...state,
        e: [],
        m: action.m,
        isFetched: true,
      };
    case FETCH_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.loadingBill),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_LOADING_BILL:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_LOADING_BILL_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.loadingBill,
        ],
        isFetched: true,
        e: [],
        m: [],
      };

    // CHANGE
    case CHANGE_LOADING_BILL:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_LOADING_BILL_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_LOADING_BILL_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.loadingBill),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_LOADING_BILLS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
        isFetched: true,
        e: [],
        m: [],
      };

    default:
      return state;
  }
};
