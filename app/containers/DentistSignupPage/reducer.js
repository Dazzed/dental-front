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
  CLEAR_DENTIST_SIGNUP_STATUS,
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
  accountInfo: {
    fullName: '',
    loginEmail: '',
  },
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
        pricingCodes: action.payload
          .map((priceCode) => {
            return priceCode.code;
          })
          .sort((priceCodeNameA, priceCodeNameB) => {
            if (priceCodeNameA < priceCodeNameB) {
              return -1;
            }
            else if (priceCodeNameA > priceCodeNameB) {
              return 1;
            }

            return 0;
          }),
      };

    /*
    Signup Reducers
    ------------------------------------------------------------
    */
    case DENTIST_SIGNUP_SUCCESS:
      return {
        ...state,
        dentistCreated: true,
        accountInfo: action.payload,
      };

    case CLEAR_DENTIST_SIGNUP_STATUS:
      return {
        ...state,
        dentistCreated: false,
        accountInfo: {
          fullName: '',
          accountInfo: '',
        },
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}
