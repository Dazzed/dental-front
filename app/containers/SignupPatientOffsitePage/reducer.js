/*
Patient Offsite Signup Page Reducer
================================================================================
NOTE: Since all of these actions are performed before the user actually signs
up and creates an account, all data must be handled locally until the final
signup request.  That means that Actions normally handled by the page's Sagas,
such as SUBMIT_MEMBER_FORM, are instead handled by the reducer.  These Actions
will also not have a follow up Action, such as ADD_MEMBER_SUCCESS and
EDIT_MEMBER_SUCCESS.
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
  dentist: false,
  dentistError: null,
  user: {
    id: uniqueId(),
    members: [],
    origin: "internal",
  },

  editingActive: false,
  editing: null,

  // signup process
  stages: {
    one: true,
    two: false,
    three: false,
  },

  // post signup
  accountInfo: {
    fullName: '',
    loginEmail: '',
  },
  patientCreated: false,
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
        dentist: {
          ...action.dentist,
          offices: [action.dentist.dentistInfo],
        },
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
      memberIdx = findIndex(state.user.members, { id: action.user.id });

      // user added themselves as a member
      if (memberIdx === -1 && action.user.membershipId !== '-1') {
        members = [
          ...state.user.members,
          action.user,
        ];
      }

      // user is already a member (and still wants to be one)
      else if (memberIdx !== -1 && action.user.membershipId !== '-1') {
        members = [
          ...state.user.members.slice(0, memberIdx),
          action.user,
          ...state.user.members.slice(memberIdx + 1),
        ];
      }

      // user removed themselves as a member
      else if (memberIdx !== -1 && action.user.membershipId === '-1') {
        members = [
          ...state.user.members.slice(0, memberIdx),
          ...state.user.members.slice(memberIdx + 1),
        ];
      }

      // the user isn't a member & doesn't want to be one
      else {
        members = state.user.members;
      }

      return {
        ...state,
        user: {
          ...action.user,
          members,
        },

        // This case is only called after all of the user data is entered
        // correctly, so the user is now ready to go to Step 2 (add members).
        // The user may also proceed to checkout as long as they have at least
        // one member on their plan (including themselves).
        stages: {
          ...state.stages,
          two: true,
          three: members.length > 0,
        },
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
          ...state.user.members,
          action.member,
        ];
      }

      // edit member
      else {
        memberIdx = findIndex(state.user.members, { id: action.member.id });

        members = [
          ...state.user.members.slice(0, memberIdx),
          action.member,
          ...state.user.members.slice(memberIdx + 1),
        ];
      }

      return {
        ...state,
        user: {
          ...state.user,
          members,
        },
        editingActive: false,
        editing: null,

        // The user may proceed to checkout as long as they have at least one
        // member on their plan (including themselves).
        stages: {
          ...state.stages,
          three: members.length > 0,
        },
      };

    /*
    Remove Member
    ------------------------------------------------------------
    */
    case REMOVE_MEMBER_REQUEST:
      memberIdx = findIndex(state.user.members, { id: action.memberId });
      members = [
        ...state.user.members.slice(0, memberIdx),
        ...state.user.members.slice(memberIdx + 1),
      ];

      return {
        ...state,
        user: {
          ...state.user,
          members,
        },

        // The user may proceed to checkout as long as they have at least one
        // member on their plan (including themselves).
        stages: {
          ...state.stages,
          three: members.length > 0,
        },
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
        accountInfo: action.payload,
      };

    case CLEAR_SIGNUP_STATUS:
      return {
        ...state,
        patientCreated: false,
        accountInfo: {
          fullName: '',
          loginEmail: '',
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
