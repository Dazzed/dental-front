/*
Patient Profile Page Reducer
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
  // fetch dentist
  DENTIST_SUCCESS,

  // fetch members
  FAMILY_MEMBERS_SUCCESS,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  // remove member
  REMOVE_MEMBER_SUCCESS,

  // edit profile
  SET_EDITING_PROFILE,
  CLEAR_EDITING_PROFILE,
  ADD_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,

  // add / edit review
  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  ADD_REVIEW_SUCCESS,
  EDIT_REVIEW_SUCCESS,

  // remove review
  REMOVE_REVIEW_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  dentist: false,
  familyMembers: null,
  editingActive: false,
  editing: null,
};

/*
Reducer
================================================================================
*/
function patientProfilePageReducer (state = initialState, action) {
  let memberIdx;
  let reviewIdx;
  let reviews;

  switch (action.type) {

    /*
    Fetch Dentist
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
    Fetch Members
    ------------------------------------------------------------
    */
    case FAMILY_MEMBERS_SUCCESS:
      return {
        ...state,
        familyMembers: action.payload,
      };

    /*
    Add / Edit Member
    ------------------------------------------------------------
    */
    case SET_EDITING_PROFILE:
      return {
        ...state,
        editingActive: 'profile',
        editing: action.user,
      };

    case CLEAR_EDITING_PROFILE:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    // update user data at App level, see SET_USER_DATA in `/app/containers/App/reducer.js`

    /*
    Edit Profile
    ------------------------------------------------------------
    */
    case SET_EDITING_MEMBER:
      return {
        ...state,
        editingActive: 'member',
        editing: action.member,
      };

    case CLEAR_EDITING_MEMBER:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        familyMembers: [
          ...state.familyMembers,
          action.payload,
        ],
        editingActive: false,
        editing: null,
      };

    case EDIT_MEMBER_SUCCESS:
      memberIdx = findIndex(state.familyMembers, { id: action.payload.id });

      return {
        ...state,
        familyMembers: [
          ...state.familyMembers.slice(0, memberIdx),
          action.payload,
          ...state.familyMembers.slice(memberIdx + 1),
        ],
        editingActive: false,
        editing: null,
      };

    /*
    Remove Member
    ------------------------------------------------------------
    */
    case REMOVE_MEMBER_SUCCESS:
      memberIdx = findIndex(state.familyMembers, { id: action.memberId });

      return {
        ...state,
        familyMembers: [
          ...state.familyMembers.slice(0, memberIdx),
          ...state.familyMembers.slice(memberIdx + 1),
        ],
      };

    /*
    Add / Edit Review
    ------------------------------------------------------------
    */
    case SET_EDITING_REVIEW:
      return {
        ...state,
        editingActive: 'review',
        editing: action.review,
      };

    case CLEAR_EDITING_REVIEW:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        dentist: {
          ...state.dentist,
          dentistReviews: [
            // put the new review first since it was just created
            // so the array stays in reverse-chronological order
            action.payload,
            ...state.dentist.dentistReviews,
          ],
        },
        editingActive: false,
        editing: null,
      };

    case EDIT_REVIEW_SUCCESS:
      reviewIdx = findIndex(state.dentist.dentistReviews, { id: action.payload.id });

      return {
        ...state,
        dentist: {
          ...state.dentist,
          dentistReviews: [
            ...state.dentist.dentistReviews.slice(0, reviewIdx),
            action.payload,
            ...state.dentist.dentistReviews.slice(reviewIdx + 1),
          ],
        },
        editingActive: false,
        editing: null,
      };

    /*
    Remove Review
    ------------------------------------------------------------
    */
    case REMOVE_REVIEW_SUCCESS:
      reviewIdx = findIndex(state.dentist.dentistReviews, { id: action.payload.id });

      return {
        ...state,
        dentist: {
          ...state.dentist,
          dentistReviews: [
            ...state.dentist.dentistReviews.slice(0, reviewIdx),
            ...state.dentist.dentistReviews.slice(reviewIdx + 1),
          ],
        },
        editingActive: false,
        editing: null,
      };

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default patientProfilePageReducer;
