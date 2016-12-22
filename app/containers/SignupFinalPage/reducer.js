import {
  FINAL_SIGNUP_SUCCESS,
  CLEAR_FINAL_SIGNUP_STATUS,
  FETCH_OFFICES_SUCCESS,
} from './constants';


const initialState = {
  signupComplete: false,
  offices: [],
};


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FINAL_SIGNUP_SUCCESS:
      return {
        ...state,
        signupComplete: true,
      };
    case CLEAR_FINAL_SIGNUP_STATUS:
      return {
        ...state,
        signupComplete: false,
      };
    case FETCH_OFFICES_SUCCESS:
      return {
        ...state,
        offices: action.payload,
      };
    default:
      return state;
  }
}
