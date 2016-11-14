import {
  DENTIST_SIGNUP_SUCCESS,
} from './constants';


const initialState = {
  dentistCreated: false,
  fullName: '',
};


export default function reducer (state = initialState, action) {
  switch (action.type) {
    case DENTIST_SIGNUP_SUCCESS:
      return {
        ...state,
        dentistCreated: true,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}
