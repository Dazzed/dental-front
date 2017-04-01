/*
Patients Dentist Page Reducer
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
function patientDentistPageReducer (state = initialState, action) {
  let reviews;

  switch (action.type) {

    /*
    Fetch
    ------------------------------------------------------------
    */
    case DENTIST_SUCCESS:
      // Order each reviews array from most recent to least.  String comparisons
      // will work since ISO date-times include all digits in all fields, even if
      // the leading one is 0.
      reviews = action.payload.dentistReviews.sort((reviewA, reviewB) => {
        if (reviewA.createdAt > reviewB.createdAt) {
          return -1;
        }
        else if (reviewA.createdAt < reviewB.createdAt) {
          return 1;
        }

        return 0;
      });

      return {
        ...state,
        dentist: {
          ...action.payload,
          dentistReviews: reviews,
        },
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
      return {
        ...state,
        dentist: {
          ...state.dentist,
          dentistReviews: [
            action.payload, // put the new review first, since it was just created
            ...state.dentist.dentistReviews,
          ],
        },
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

export default patientDentistPageReducer;
