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

  // add / edit review
  // TODO: edit
  SET_EDITING_REVIEW,
  CLEAR_EDITING_REVIEW,
  SEND_REVIEW_SUCCESS,

  // remove review
  // TODO

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
    TODO: Edit
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
        editing: null,
      };

    /*
    Remove Review
    ------------------------------------------------------------
    */
    // TODO

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default patientProfilePageReducer;
