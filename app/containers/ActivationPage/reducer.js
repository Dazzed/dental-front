import { ACTIVATE_REQUEST, ACTIVATE_SUCCESS, ACTIVATE_ERROR } from './constants';

const initialState = {
  activated: false,
};

export default function activationPageReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        activated: true,
        error: null
      };
    case ACTIVATE_ERROR:
      return {
        ...state,
        loading: false,
        activated: false,
        error: action.payload
      };
    default:
      return state;
  }
}
