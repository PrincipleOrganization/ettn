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
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_CLIENTS:
      return {
        ...state,
      };
    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // ONE
    case FETCH_CLIENT:
      return {
        ...state,
      };
    case FETCH_CLIENT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_CLIENT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.client),
        isFetched: true,
      };

    // CREATE
    case CREATE_CLIENT:
      return state;
    case CREATE_CLIENT_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(element => element.id !== action.data.client.id),
      };
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.client,
        ],
      };

    // CHANGE
    case CHANGE_CLIENT:
      return {
        ...state,
      };
    case CHANGE_CLIENT_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case CHANGE_CLIENT_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.client),
        isFetched: true,
      };

    // DELETE
    case DELETE_CLIENT:
      return {
        ...state,
      };
    case DELETE_CLIENT_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
