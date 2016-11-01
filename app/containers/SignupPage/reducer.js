import {
  SIGNUP_SUCCESS,
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
    default:
      return state;
  }
}
