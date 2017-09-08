import {
  FETCH_DRIVERS,
  FETCH_DRIVERS_ERROR,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVER,
  FETCH_DRIVER_ERROR,
  FETCH_DRIVER_SUCCESS,
  CREATE_DRIVER,
  CREATE_DRIVER_ERROR,
  CREATE_DRIVER_SUCCESS,
  CHANGE_DRIVER,
  CHANGE_DRIVER_ERROR,
  CHANGE_DRIVER_SUCCESS,
  DELETE_DRIVER,
  DELETE_DRIVER_ERROR,
  DELETE_DRIVER_SUCCESS,
} from '../actions/drivers';

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
    case FETCH_DRIVERS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_DRIVERS_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_DRIVER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_DRIVER_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_DRIVER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.driver),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_DRIVER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_DRIVER_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.driver,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_DRIVER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_DRIVER_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_DRIVER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.driver),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_DRIVER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_DRIVER_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
        e: [],
        m: [],
        isFetched: true,
      };

    default:
      return state;
  }
};
