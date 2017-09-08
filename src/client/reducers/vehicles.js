import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_ERROR,
  FETCH_VEHICLES_SUCCESS,
  FETCH_VEHICLE,
  FETCH_VEHICLE_ERROR,
  FETCH_VEHICLE_SUCCESS,
  CREATE_VEHICLE,
  CREATE_VEHICLE_ERROR,
  CREATE_VEHICLE_SUCCESS,
  CHANGE_VEHICLE,
  CHANGE_VEHICLE_ERROR,
  CHANGE_VEHICLE_SUCCESS,
  DELETE_VEHICLE,
  DELETE_VEHICLE_ERROR,
  DELETE_VEHICLE_SUCCESS,
} from '../actions/vehicles';

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
    case FETCH_VEHICLES:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_VEHICLES_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_VEHICLE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_VEHICLE_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.vehicle),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_VEHICLE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_VEHICLE_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_VEHICLE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.vehicle,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_VEHICLE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_VEHICLE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_VEHICLE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.vehicle),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_VEHICLE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_VEHICLE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_VEHICLE_SUCCESS:
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
