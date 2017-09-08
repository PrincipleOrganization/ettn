import { Auth } from '../utils';

import {
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  FETCH_USER,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  CHANGE_USER,
  CHANGE_USER_ERROR,
  CHANGE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
} from '../actions/users';

import { updateData } from '.';

const initialState = {
  user: Auth.getUser(),
  data: [],
  e: [],
  m: [],
  loggedIn: Auth.tokenIsSet(),
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // LOGIN
    case USER_LOGIN:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
        user: null,
        m: [],
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        e: [],
        m: [],
      };

    // LOGOUT
    case USER_LOGOUT:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: action.loggedIn,
        e: [],
        m: [],
        isFetched: true,
      };

    // ALL
    case FETCH_USERS:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
        e: [],
        m: [],
      };

      // ONE
    case FETCH_USER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        m: action.m,
        e: [],
        isFetched: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.user),
        isFetched: true,
        e: [],
        m: [],
      };

    // CREATE
    case CREATE_USER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        m: [],
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.user,
        ],
        e: [],
        m: [],
        isFetched: true,
      };

    // CHANGE
    case CHANGE_USER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case CHANGE_USER_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case CHANGE_USER_SUCCESS:
      return {
        ...state,
        data: updateData(state.data, action.data.user),
        isFetched: true,
        e: [],
        m: [],
      };

    // DELETE
    case DELETE_USER:
      return {
        ...state,
        e: [],
        m: [],
        isFetched: false,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        e: action.e,
        m: [],
        isFetched: true,
      };
    case DELETE_USER_SUCCESS:
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
