/*
Dentist Signup Page Reducers
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // fetch
  DENTIST_SPECIALTIES_SUCCESS,

  // signup
  DENTIST_SIGNUP_SUCCESS,
  DENTIST_CLEAR_SIGNUP_STATUS,
} from './constants';


/*
Reducers
================================================================================
*/

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  dentistSpecialties: [],

  // signup
  dentistCreated: false,
  fullName: '',
};


export default function reducer (state = initialState, action) {
  switch (action.type) {

    /*
    Fetch Reducers
    ------------------------------------------------------------
    */
    case DENTIST_SPECIALTIES_SUCCESS:
      return {
        ...state,
        dentistSpecialties: action.payload,
      };

    /*
    Signup Reducers
    ------------------------------------------------------------
    */
    case DENTIST_SIGNUP_SUCCESS:
      return {
        ...state,
        dentistCreated: true,
        fullName: action.payload.fullName,
      };

    case DENTIST_CLEAR_SIGNUP_STATUS:
      return {
        ...state,
        dentistCreated: false,
        fullName: '',
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}
