/*
 *
 * MyFamilyMembers reducer
 *
 */

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

import {
  MY_FAMILY_SUCCESS,
} from 'containers/Dashboard/constants';

import {
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,

  DELETE_MEMBER_SUCCESS,

  SET_EDITING_MEMBER,
  CLEAR_EDITING_MEMBER,
} from 'containers/MyFamilyMembers/constants';

const initialState = {
  membersList: [],
  editingMember: null,
};

function myFamilyMembersReducer (state = initialState, action) {
  let index;

  switch (action.type) {
    case MY_FAMILY_SUCCESS:
      return {
        ...state,
        membersList: action.payload,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        membersList: [
          ...state.membersList,
          action.payload
        ],
      };
    case EDIT_MEMBER_SUCCESS:
      index = findIndex(state.membersList, { id: action.payload.id });
      return {
        ...state,
        membersList: [
          ...state.membersList.slice(0, index),
          action.payload,
          ...state.membersList.slice(index + 1)
        ],
      };
    case DELETE_MEMBER_SUCCESS:
      index = findIndex(state.membersList, { id: action.memberId });
      return {
        ...state,
        membersList: [
          ...state.membersList.slice(0, index),
          ...state.membersList.slice(index + 1)
        ],
      };
    case CLEAR_EDITING_MEMBER:
      return {
        ...state,
        editingMember: null,
      };
    case SET_EDITING_MEMBER:
      return {
        ...state,
        editingMember:
          find(state.membersList, { id: action.memberId }) || null,
      };
    default:
      return state;
  }
}

export default myFamilyMembersReducer;
