import {
  FETCH_VEHICLES,
  FETCH_VEHICLES_ERROR,
  FETCH_VEHICLES_SUCCESS,
} from '../actions/vehicles';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_VEHICLES:
      return {
        ...state,
      };
    case FETCH_VEHICLES_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    default:
      return state;
  }
};
