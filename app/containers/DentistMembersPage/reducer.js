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
  FETCH_PATIENTS_SUCCESS,
  SEARCH_MEMBERS,
  SORT_MEMBERS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  patients: null,
  searchName: null,
  sortStatus: "active",
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
    Members Reducers
    ------------------------------------------------------------
    */
    case SEARCH_MEMBERS:
      return {
        ...state,
        searchName: action.name !== ""
                      ? action.name
                      : null,
      };

    case SORT_MEMBERS:
      return {
        ...state,
        sortStatus: action.status,
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
