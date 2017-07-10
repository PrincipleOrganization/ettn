import {
  FETCH_NOMENCLATURE,
  FETCH_NOMENCLATURE_ERROR,
  FETCH_NOMENCLATURE_SUCCESS,
} from '../actions/nomenclature';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // GET ALL
    case FETCH_NOMENCLATURE:
      return {
        ...state,
      };
    case FETCH_NOMENCLATURE_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_NOMENCLATURE_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    default:
      return state;
  }
};
