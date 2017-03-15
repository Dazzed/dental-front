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
  PRICING_CODES_SUCCESS,

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
  pricingCodes: [],

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
        dentistSpecialties: action.payload.sort((specialtyA, specialtyB) => {
          if (specialtyA.name < specialtyB.name) {
            return -1;
          }
          else if (specialtyA.name > specialtyB.name) {
            return 1;
          }
          return 0; // specialtyA === specialtyB
        }),
      };

    case PRICING_CODES_SUCCESS:
      return {
        ...state,
        pricingCodes: action.payload,
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
