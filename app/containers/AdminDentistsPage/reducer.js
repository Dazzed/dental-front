/*
Admin Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import findIndex from 'lodash/findIndex';

// local
import {
  // fetch
  FETCH_DENTISTS_SUCCESS,
  FETCH_DENTIST_DETAILS_SUCCESS,
  FETCH_DENTIST_MEMBERS_SUCCESS,
  FETCH_DENTIST_REVIEWS_SUCCESS,
  FETCH_STATS_SUCCESS,

  // search / sort
  SEARCH,
  SORT,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // fetch
  dentists: null,
  dentistDetails: null,
  dentistMembers: null,
  dentistReviews: null,
  stats: null,

  // search / sort patients
  searchName: null,
  sortStatus: "date",
};


/*
Reducers
================================================================================
*/
export default function adminPageReducer (state = initialState, action) {
  let memberIdx, patients, patientIdx, prevStatePatient, newStatePatient;

  switch (action.type) {    
    /*
    Fetch
    ------------------------------------------------------------
    */
    case FETCH_DENTISTS_SUCCESS:      
      return {
        ...state,
        dentists: action.payload,
      };

    case FETCH_DENTIST_DETAILS_SUCCESS:
      return {
        ...state,
        dentistDetails: action.payload,
      };

    case FETCH_DENTIST_MEMBERS_SUCCESS:
      return {
        ...state,
        dentistMembers: action.payload,
      };

    case FETCH_DENTIST_REVIEWS_SUCCESS:
      return {
        ...state,
        dentistReviews: action.payload,
      };

    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload,
      };

    /*
    Search / Sort
    ------------------------------------------------------------
    */
    case SEARCH:
      return {
        ...state,
        searchName: action.name !== ""
                      ? action.name
                      : null,
      };

    case SORT:
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
