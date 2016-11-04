import {
  SUBMIT_PROFILE_FORM,
  SUBMIT_PROFILE_FORM_SUCCESS,
  SUBMIT_PROFILE_FORM_ERROR,
} from './constants';

const initialState = {
  submitting: false,
};

export default function profileReducer (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_PROFILE_FORM:
      return {
        ...state,
        submitting: true
      };
    case SUBMIT_PROFILE_FORM_SUCCESS:
    case SUBMIT_PROFILE_FORM_ERROR:
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}
