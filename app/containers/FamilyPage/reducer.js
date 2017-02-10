/*
Patient Family Page Reducer
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
  FAMILY_MEMBERS_SUCCESS,

  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  REMOVE_MEMBER_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  familyMembers: null,
  editingActive: false,
  editingMember: null,
  removingMember: null,
};

/*
Reducer
------------------------------------------------------------
*/
function familyPageReducer (state = initialState, action) {
  let memberIdx;

  switch (action.type) {
    case FAMILY_MEMBERS_SUCCESS:
      return {
        ...state,
        familyMembers: action.payload,
      };

    case SET_EDITING_MEMBER:
      return {
        ...state,
        editingActive: true,
        editingMember: action.member,
      };

    case CLEAR_EDITING_MEMBER:
      return {
        ...state,
        editingActive: false,
        editingMember: null,
      };

    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        familyMembers: [
          ...state.familyMembers,
          action.payload,
        ],
        editingActive: false,
        editingMember: null,
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
        editingMember: null,
      };

    case REMOVE_MEMBER_SUCCESS:
      memberIdx = findIndex(state.familyMembers, { id: action.memberId });

      return {
        ...state,
        familyMembers: [
          ...state.familyMembers.slice(0, memberIdx),
          ...state.familyMembers.slice(memberIdx + 1),
        ],
      };

    default:
      return state;
  }
}

export default familyPageReducer;
