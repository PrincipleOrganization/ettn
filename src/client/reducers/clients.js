import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_ERROR,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENT,
  FETCH_CLIENT_ERROR,
  FETCH_CLIENT_SUCCESS,
  CREATE_CLIENT,
  CREATE_CLIENT_ERROR,
  CREATE_CLIENT_SUCCESS,
  CHANGE_CLIENT,
  CHANGE_CLIENT_ERROR,
  CHANGE_CLIENT_SUCCESS,
  DELETE_CLIENT,
  DELETE_CLIENT_ERROR,
  DELETE_CLIENT_SUCCESS,
} from '../actions/clients';

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
    case FETCH_CLIENTS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

    // ONE
    case FETCH_CLIENT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_CLIENT_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_CLIENT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.client),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_CLIENT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_CLIENT_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.client,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_CLIENT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_CLIENT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
        m: [],
      };
    case CHANGE_CLIENT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.client),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_CLIENT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_CLIENT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
        m: [],
      };
    case DELETE_CLIENT_SUCCESS:
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
