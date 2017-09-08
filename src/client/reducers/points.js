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
  e: [],
  m: [],
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // ALL
    case FETCH_POINTS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_POINTS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
        e: [],
        m: [],
      };
    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_POINT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_POINT_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_POINT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.point),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_POINT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_POINT_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_POINT_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.point,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_POINT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_POINT_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_POINT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.point),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_POINT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_POINT_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_POINT_SUCCESS:
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
