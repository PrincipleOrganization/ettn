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
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_VEHICLES:
      return {
        ...state,
      };
    case FETCH_VEHICLES_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_VEHICLE:
      return {
        ...state,
      };
    case FETCH_VEHICLE_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_VEHICLE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.vehicle),
        isFetched: true,
      };

    // CREATE
    case CREATE_VEHICLE:
      return state;
    case CREATE_VEHICLE_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.vehicle.id),
      };
    case CREATE_VEHICLE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.vehicle,
        ],
      };

    // CHANGE
    case CHANGE_VEHICLE:
      return {
        ...state,
      };
    case CHANGE_VEHICLE_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_VEHICLE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.vehicle),
        isFetched: true,
      };

    // DELETE
    case DELETE_VEHICLE:
      return {
        ...state,
      };
    case DELETE_VEHICLE_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
