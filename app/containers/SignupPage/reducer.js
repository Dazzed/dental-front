import {
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP_STATUS
} from './constants';


const initialState = {
  patientCreated: false,
  fullName: '',
};


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        patientCreated: true,
        fullName: action.payload.fullName,
      };
    case CLEAR_SIGNUP_STATUS:
      return {
        ...state,
        patientCreated: false,
        fullName: '',
      }
    default:
      return state;
  }
}
