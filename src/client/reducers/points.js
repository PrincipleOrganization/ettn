import {
  FETCH_POINTS,
  FETCH_POINTS_ERROR,
  FETCH_POINTS_SUCCESS,
  CREATE_POINT,
  CREATE_POINT_ERROR,
  CREATE_POINT_SUCCESS,
} from '../actions/points';

const initialState = {
  data: [],
  e: null,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    // ALL
    case FETCH_POINTS:
      return {
        ...state,
      };
    case FETCH_POINTS_ERROR:
      return {
        ...state,
        e: action.e,
        isFetched: true,
      };
    case FETCH_POINTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetched: true,
      };

    // CREATE
    case CREATE_POINT:
      return state;
    case CREATE_POINT_ERROR:
      return {
        ...state,
        isFetched: true,
        e: action.e,
        data: state.data.filter(point => point.id !== action.data.point.id),
      };
    case CREATE_POINT_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.data.point,
        ],
      };


    default:
      return state;
  }
};
