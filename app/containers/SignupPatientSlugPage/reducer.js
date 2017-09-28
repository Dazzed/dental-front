import {
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_ERROR
} from './constants';

const initialState = {
  offices: {
    items: [],
    loadingOffices: true,
    errorLoadingOffices: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_OFFICES_SUCCESS:
      return {
        ...state,
        offices: {
          ...state.offices,
          items: action.payload,
          loadingOffices: false,
        }
      };
    case FETCH_OFFICES_ERROR:
      return {
        ...state,
        offices: {
          ...state.offices,
          loadingOffices: false,
          errorLoadingOffices: true
        }
      };
    default:
      return {
        ...state
      };
  }
}
