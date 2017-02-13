/*
Signup Page Reducers
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP_STATUS,
  FETCH_OFFICES_SUCCESS,
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
  patientCreated: false,
  fullName: '',
  offices: [],
}; 

export default function reducer (state = initialState, action) {
  switch (action.type) {

    /*
    Fetch Reducers
    ------------------------------------------------------------
    */
    case FETCH_OFFICES_SUCCESS:
      return {
        ...state,
        offices: action.payload,
      };

    /*
    Signup Reducers
    ------------------------------------------------------------
    */
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
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}
