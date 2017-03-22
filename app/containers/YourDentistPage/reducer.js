/*
Your Dentist Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  DENTIST_SUCCESS,

  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  SEND_REVIEW_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  dentist: false,
  editingActive: false,
  editingReview: null,
};

/*
Reducer
================================================================================
*/
function yourDentistPageReducer (state = initialState, action) {
  switch (action.type) {
    /*
    Fetch
    ------------------------------------------------------------
    */
    case DENTIST_SUCCESS:
      return {
        ...state,
        dentist: action.payload
      };

    /*
    Create Review
    ------------------------------------------------------------
    */
    case SET_EDITING_REVIEW:
      return {
        ...state,
        editingActive: true,
        editingReview: action.review,
      };

    case CLEAR_EDITING_REVIEW:
      return {
        ...state,
        editingActive: false,
        editingReview: null,
      };

    case SEND_REVIEW_SUCCESS:
      // TODO: add the review to existing objects so it can be shown?
      return {
        ...state,
        editingActive: false,
        editingReview: null,
      };

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}

export default yourDentistPageReducer;
