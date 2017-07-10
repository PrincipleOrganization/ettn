import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_ERROR,
  FETCH_CLIENTS_SUCCESS,
} from '../actions/clients';

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

    default:
      return state;
  }
};
