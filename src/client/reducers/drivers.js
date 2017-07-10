import {
  FETCH_DRIVERS,
  FETCH_DRIVERS_ERROR,
  FETCH_DRIVERS_SUCCESS,
} from '../actions/drivers';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_DRIVERS:
      return {
        ...state,
      };
    case FETCH_DRIVERS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    default:
      return state;
  }
};
