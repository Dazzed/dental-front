import {
  SUBMIT_CONTACT_SUPPORT,
  SUBMIT_CONTACT_SUPPORT_SUCCESS,
  SUBMIT_CONTACT_SUPPORT_ERROR,
} from './constants';

const initialState = {
  submitting: false,
};

export default function contactSupportReducer (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_CONTACT_SUPPORT:
      return {
        ...state,
        submitting: true
      };
    case SUBMIT_CONTACT_SUPPORT_SUCCESS:
    case SUBMIT_CONTACT_SUPPORT_ERROR:
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}
