import {
  FETCH_SCALES,
  FETCH_SCALES_ERROR,
  FETCH_SCALES_SUCCESS,
  FETCH_SCALE,
  FETCH_SCALE_ERROR,
  FETCH_SCALE_SUCCESS,
  CREATE_SCALE,
  CREATE_SCALE_ERROR,
  CREATE_SCALE_SUCCESS,
  CHANGE_SCALE,
  CHANGE_SCALE_ERROR,
  CHANGE_SCALE_SUCCESS,
  DELETE_SCALE,
  DELETE_SCALE_ERROR,
  DELETE_SCALE_SUCCESS,
} from '../actions/scales';

import { updateData } from '.';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_SCALES:
      return {
        ...state,
      };
    case FETCH_SCALES_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_SCALES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_SCALE:
      return {
        ...state,
      };
    case FETCH_SCALE_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_SCALE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.scale),
        isFetched: true,
      };

    // CREATE
    case CREATE_SCALE:
      return state;
    case CREATE_SCALE_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.scale.id),
      };
    case CREATE_SCALE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.scale,
        ],
      };

    // CHANGE
    case CHANGE_SCALE:
      return {
        ...state,
      };
    case CHANGE_SCALE_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_SCALE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.scale),
        isFetched: true,
      };

    // DELETE
    case DELETE_SCALE:
      return {
        ...state,
      };
    case DELETE_SCALE_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_SCALE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
