/*
Dentist Members Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  FETCH_PATIENTS_SUCCESS
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  patients: null,
};


/*
Reducers
================================================================================
*/
function dentistMembersPageReducer (state = initialState, action) {
  switch (action.type) {
    
    /*
    Patients Reducers
    ------------------------------------------------------------
    */
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload,
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default dentistMembersPageReducer;
