import {
  FETHC_LOADING_BILLS,
  FETHC_LOADING_BILLS_ERROR,
  FETHC_LOADING_BILLS_SUCCESS,
  DELETE_LOADING_BILLS,
  DELETE_LOADING_BILLS_ERROR,
  DELETE_LOADING_BILLS_SUCCESS,
} from '../actions/loadingBills';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETHC_LOADING_BILLS:
      return {
        ...state,
      };
    case FETHC_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETHC_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // DELETE
    case DELETE_LOADING_BILLS:
      return {
        ...state,
      };
    case DELETE_LOADING_BILLS_ERROR:
      return {
        ...state,
        e: action.e,
      };
    case DELETE_LOADING_BILLS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(element => element.id !== action.id),
      };

    default:
      return state;
  }
};
