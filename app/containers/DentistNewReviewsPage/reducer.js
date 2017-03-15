/*
Dentist New Reviews Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// app
import {
  FETCH_PATIENTS_SUCCESS
} from 'containers/DentistMembersPage/constants';


/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  patientReviews: null,
};


/*
Reducers
================================================================================
*/
function dentistNewReviewsPageReducer (state = initialState, action) {
  switch (action.type) {

    /*
    Reviews Reducer
    ------------------------------------------------------------
    NOTE: All reviews are for the logged-in dentist only.
    */
    case FETCH_PATIENTS_SUCCESS:
      const patients = action.payload;

      return {
        ...state,

        patientReviews: patients.reduce((reviewsCollector, patient) => {
          // precondition: the patient has written a review
          if (!Array.isArray(patient.reviews) || patient.reviews.length === 0) {
            return reviewsAccumulator;
          }

          var patientReviews = patient.reviews.map((review) => {
            return {
              review: review,
              patient: patient,
            };
          });

          return patientReviews.concat(reviewsCollector);
        }, []),
      }


    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}

export default dentistNewReviewsPageReducer;
