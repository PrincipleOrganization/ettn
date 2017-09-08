import {
  FETCH_NOMENCLATURE,
  FETCH_NOMENCLATURE_ERROR,
  FETCH_NOMENCLATURE_SUCCESS,
  DELETE_NOMENCLATURE,
  FETCH_ONE_NOMENCLATURE,
  FETCH_ONE_NOMENCLATURE_ERROR,
  FETCH_ONE_NOMENCLATURE_SUCCESS,
  CREATE_NOMENCLATURE,
  CREATE_NOMENCLATURE_ERROR,
  CREATE_NOMENCLATURE_SUCCESS,
  CHANGE_NOMENCLATURE,
  CHANGE_NOMENCLATURE_ERROR,
  CHANGE_NOMENCLATURE_SUCCESS,
  DELETE_NOMENCLATURE_ERROR,
  DELETE_NOMENCLATURE_SUCCESS,
} from '../actions/nomenclature';

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
    case FETCH_NOMENCLATURE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_NOMENCLATURE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_ONE_NOMENCLATURE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_ONE_NOMENCLATURE_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_ONE_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.nomenclature),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_NOMENCLATURE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_NOMENCLATURE_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.nomenclature,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_NOMENCLATURE:
      return {
        ...state,
        e: [],
        isFetched: false,
      };
    case CHANGE_NOMENCLATURE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.nomenclature),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_NOMENCLATURE:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_NOMENCLATURE_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_NOMENCLATURE_SUCCESS:
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
