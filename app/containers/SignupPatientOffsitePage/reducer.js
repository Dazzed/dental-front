/*
Patient Offsite Signup Page Reducer
================================================================================
NOTE: Since all of these actions are performed before the user actually signs
up and creates an account, all data must be handled locally until the final
signup request.  That means that Actions normally handled by the page's Sagas,
such as SUBMIT_MEMBER_FORM, are instead handled by the reducer.  These Actions
will also not have a follow up Action, such as ADD_MEMBER_SUCCESS and
EDIT_MEMBER_SUCCESS.

TODO: Edit User?
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import findIndex from 'lodash/findIndex';
import uniqueId from 'lodash/uniqueId';

// local
import {
  // fetch dentist
  DENTIST_SUCCESS,
  DENTIST_ERROR,

  // update user
  SUBMIT_USER_FORM,

  // add / edit member
  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  SUBMIT_MEMBER_FORM,

  // remove member
  REMOVE_MEMBER_REQUEST,

  // checkout
  SET_EDITING_CHECKOUT,
  CLEAR_EDITING_CHECKOUT,
  SUBMIT_CHECKOUT_FORM,

  // signup
  SIGNUP_SUCCESS,
  CLEAR_SIGNUP_STATUS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  cardDetails: null,
  dentist: false,
  dentistError: null,
  members: [],
  user: {
    id: uniqueId(),
  },

  editingActive: false,
  editing: null,

  // signup
  patientCreated: false,
  accountInfo: {
    fullName: '',
    loginEmail: '',
  },
};


/*
Reducer
================================================================================
*/
function patientOffsiteSignupPageReducer (state = initialState, action) {
  let memberIdx;
  let members;

  switch (action.type) {

    /*
    Fetch Dentist
    ------------------------------------------------------------
    */
    case DENTIST_SUCCESS:
      return {
        ...state,
        dentist: action.dentist,
      };

    case DENTIST_ERROR:
      return {
        ...state,
        dentistError: action.error,
      };

    /*
    Update User
    ------------------------------------------------------------
    */
    case SUBMIT_USER_FORM:
      memberIdx = findIndex(state.members, { id: action.user.id });

      // user form is completed successfully for the first time,
      // add user to the members list
      if (memberIdx === -1 && action.user.userIsMember === true) {
        members = [
          ...state.members,
          action.user,
        ];
      }

      // user form is changed
      else if (memberIdx !== -1 && action.user.userIsMember === true) {
        members = [
          ...state.members.slice(0, memberIdx),
          action.user,
          ...state.members.slice(memberIdx + 1),
        ];
      }

      // user removed themselves as a member
      else if (memberIdx !== -1 && action.user.userIsMember === false) {
        members = [
          ...state.members.slice(0, memberIdx),
          ...state.members.slice(memberIdx + 1),
        ];
      }

      // the user isn't a member & doesn't want to be one
      else {
        members = state.members;
      }

      return {
        ...state,
        members,
        user: action.user,
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

    case SUBMIT_MEMBER_FORM:
      // add member
      if (action.member.id === undefined) {
        action.member.id = uniqueId();

        members = [
          ...state.members,
          action.member,
        ];
      }

      // edit member
      else {
        memberIdx = findIndex(state.members, { id: action.member.id });

        members = [
          ...state.members.slice(0, memberIdx),
          action.member,
          ...state.members.slice(memberIdx + 1),
        ];
      }

      return {
        ...state,
        members,
        editingActive: false,
        editing: null,
      };

    /*
    Remove Member
    ------------------------------------------------------------
    */
    case REMOVE_MEMBER_REQUEST:
      memberIdx = findIndex(state.members, { id: action.memberId });

      return {
        ...state,
        members: [
          ...state.members.slice(0, memberIdx),
          ...state.members.slice(memberIdx + 1),
        ],
      };

    /*
    Checkout
    ------------------------------------------------------------
    */
    case SET_EDITING_CHECKOUT:
      return {
        ...state,
        editingActive: 'checkout',
        editing: action.cardDetails,
      };

    case CLEAR_EDITING_CHECKOUT:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case SUBMIT_CHECKOUT_FORM:
      return {
        ...state,
        cardDetails: action.cardDetails,
        editingActive: false,
        editing: null,
      };

    /*
    Signup
    ------------------------------------------------------------
    */
    case SIGNUP_SUCCESS:
      return {
        ...state,
        patientCreated: true,
        accountInfo: action.payload.accountInfo,
      };

    case CLEAR_SIGNUP_STATUS:
      return {
        ...state,
        patientCreated: false,
        accountInfo: {
          fullName: '',
          accountInfo: '',
        },
      };

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default patientOffsiteSignupPageReducer;
