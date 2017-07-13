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
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_DRIVERS:
      return {
        ...state,
      };
    case FETCH_DRIVERS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_DRIVER:
      return {
        ...state,
      };
    case FETCH_DRIVER_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_DRIVER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.driver),
        isFetched: true,
      };

    // CREATE
    case CREATE_DRIVER:
      return state;
    case CREATE_DRIVER_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.driver.id),
      };
    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.driver,
        ],
      };

    // CHANGE
    case CHANGE_DRIVER:
      return {
        ...state,
      };
    case CHANGE_DRIVER_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_DRIVER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.driver),
        isFetched: true,
      };

    // DELETE
    case DELETE_DRIVER:
      return {
        ...state,
      };
    case DELETE_DRIVER_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_DRIVER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
