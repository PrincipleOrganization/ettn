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
  GET_WEIGHT,
  GET_WEIGHT_ERROR,
  GET_WEIGHT_SUCCESS,
} from '../actions/scales';

import { updateData } from '.';

const initialState = {
  data: [],
  e: [],
  m: [],
  isFetched: false,
  weight: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_SCALES:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_SCALES_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_SCALES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_SCALE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_SCALE_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_SCALE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.scale),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_SCALE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_SCALE_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_SCALE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.scale,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_SCALE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_SCALE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_SCALE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.scale),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_SCALE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_SCALE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_SCALE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
        e: [],
        m: [],
        isFetched: true,
      };

    // GET WEIGHT
    case GET_WEIGHT:
      return {
        ...state,
        weight: state.weight.filter(element => element.id !== action.id),
        e: [],
        m: [],
      };
    case GET_WEIGHT_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        weight: state.weight.filter(element => element.id !== action.id),
      };
    case GET_WEIGHT_SUCCESS:
      return {
        ...state,
        e: [],
        m: [],
        weight: [
          ...state.weight,
          { id: action.id, weight: action.weight },
        ],
      };

    default:
      return state;
  }
};
