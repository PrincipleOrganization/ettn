import {
  FETCH_POINTS,
  FETCH_POINTS_ERROR,
  FETCH_POINTS_SUCCESS,
  FETCH_POINT,
  FETCH_POINT_ERROR,
  FETCH_POINT_SUCCESS,
  CREATE_POINT,
  CREATE_POINT_ERROR,
  CREATE_POINT_SUCCESS,
  CHANGE_POINT,
  CHANGE_POINT_ERROR,
  CHANGE_POINT_SUCCESS,
  DELETE_POINT,
  DELETE_POINT_ERROR,
  DELETE_POINT_SUCCESS,
} from '../actions/points';

import { updateData } from '.';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // ALL
    case FETCH_POINTS:
      return {
        ...state,
      };
    case FETCH_POINTS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_POINT:
      return {
        ...state,
      };
    case FETCH_POINT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_POINT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.point),
        isFetched: true,
      };

    // CREATE
    case CREATE_POINT:
      return state;
    case CREATE_POINT_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.point.id),
      };
    case CREATE_POINT_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.point,
        ],
      };

    // CHANGE
    case CHANGE_POINT:
      return {
        ...state,
      };
    case CHANGE_POINT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_POINT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.point),
        isFetched: true,
      };

    // DELETE
    case DELETE_POINT:
      return {
        ...state,
      };
    case DELETE_POINT_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_POINT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
