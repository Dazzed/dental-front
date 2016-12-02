/*
 *
 * Dashboard reducer
 *
 */

import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';

import {
  PAYMENT_DONE,
} from 'containers/Authorize.net/constants';


import {
  MY_DENTIST_SUCCESS,
  MY_MEMBERS_SUCCESS,
  MY_PATIENTS_SUCCESS,

  CONVERSATION_REQUEST,
  CONVERSATION_SUCCESS,

  MESSAGE_SENT,
  NEW_MSG_COUNT_SUCCESS,

  OPEN_MEMBER_FORM,
  CLOSE_MEMBER_FORM,

  SET_EDITING_MEMBER,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
} from './constants';


const initialState = {
  // Client Owner Dashboard
  myMembers: null,
  myDentist: null,

  // Dentist dashboard fields
  myPatients: null,

  // All types
  messages: [],
  newMsgCountBySender: {},
  memberFormOpened: null,
  editingMember: null,
};


function dashboardReducer (state = initialState, action) {
  let member;
  let account;
  let listToEdit;
  let members;

  switch (action.type) {
    case PAYMENT_DONE:
      // if myPatients exists we are in dentist dashboard
      if (state.myPatients) {
        account = findIndex(state.myPatients, { id: action.userId });
        listToEdit = state.myPatients[account];
        members = listToEdit.members.map(member => {
          if (action.payload.indexOf(member.id) >= 0) {
            return {
              ...member,
              subscription: {
                ...member.subscription,
                status: 'active',
              },
            };
          }
          return member
        });

        listToEdit = {
          ...listToEdit,
          members,
        };

        return {
          ...state,
          myPatients: [
            ...state.myPatients.slice(0, account),
            listToEdit,
            ...state.myPatients.slice(account + 1),
          ]
        };
      }

      members = state.myMembers.map(member => {
        if (action.payload.indexOf(member.id) >= 0) {
          return {
            ...member,
            subscription: {
              ...member.subscription,
              status: 'active',
            },
          };
        }
        return member
      });

      return {
        ...state,
        myMembers: members,
      };

    case DELETE_MEMBER_SUCCESS:
      // if myPatients exists we are in dentist dashboard
      if (state.myPatients) {
        account = findIndex(state.myPatients, { id: action.userId });
        listToEdit = state.myPatients[account];
        member = findIndex(listToEdit.members, { id: action.memberId });

        listToEdit = {
          ...listToEdit,
          members: [
            ...listToEdit.members.slice(0, member),
            ...listToEdit.members.slice(member + 1),
          ],
        };

        return {
          ...state,
          myPatients: [
            ...state.myPatients.slice(0, account),
            listToEdit,
            ...state.myPatients.slice(account + 1),
          ]
        };
      }

      member = findIndex(state.myMembers, { id: action.memberId });
      return {
        ...state,
        myMembers: [
          ...state.myMembers.slice(0, member),
          ...state.myMembers.slice(member + 1),
        ],
      };

    case EDIT_MEMBER_SUCCESS:
      // if myPatients exists we are in dentist dashboard
      if (state.myPatients) {
        account = findIndex(state.myPatients, { id: action.userId });
        listToEdit = state.myPatients[account];
        member = findIndex(listToEdit.members, { id: action.payload.id });

        listToEdit = {
          ...listToEdit,
          members: [
            ...listToEdit.members.slice(0, member),
            action.payload,
            ...listToEdit.members.slice(member + 1),
          ],
        };

        return {
          ...state,
          memberFormOpened: null,
          myPatients: [
            ...state.myPatients.slice(0, account),
            listToEdit,
            ...state.myPatients.slice(account + 1),
          ]
        };
      }

      member = findIndex(state.myMembers, { id: action.payload.id });
      return {
        ...state,
        memberFormOpened: null,
        myMembers: [
          ...state.myMembers.slice(0, member),
          action.payload,
          ...state.myMembers.slice(member + 1),
        ],
      };

    case ADD_MEMBER_SUCCESS:
      // if myPatients exists we are in dentist dashboard
      if (state.myPatients) {
        account = findIndex(state.myPatients, { id: action.userId });
        listToEdit = state.myPatients[account];

        listToEdit = {
          ...listToEdit,
          members: [
            ...listToEdit.members,
            action.payload,
          ],
        };

        return {
          ...state,
          memberFormOpened: null,
          myPatients: [
            ...state.myPatients.slice(0, account),
            listToEdit,
            ...state.myPatients.slice(account + 1),
          ]
        };
      }

      return {
        ...state,
        memberFormOpened: null,
        myMembers: [
          ...state.myMembers,
          action.payload,
        ],
      };

    case MY_DENTIST_SUCCESS:
      return {
        ...state,
        myDentist: action.payload,
      };

    case MY_MEMBERS_SUCCESS:
      return {
        ...state,
        myMembers: action.payload,
      };

    case MY_PATIENTS_SUCCESS:
      return {
        ...state,
        myPatients: action.payload,
      };

    case CONVERSATION_REQUEST:
      return {
        ...state,
        messages: [],
      };

    case CONVERSATION_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    case MESSAGE_SENT:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload,
        ]
      };

    case NEW_MSG_COUNT_SUCCESS:
      return {
        ...state,
        newMsgCountBySender: {
          ...state.newMsgCountBySender,
          [action.payload.senderId]: action.payload.count,
        },
      };

    case OPEN_MEMBER_FORM:
      return {
        ...state,
        memberFormOpened: action.ownerId || null,
      };

    case CLOSE_MEMBER_FORM:
      return {
        ...state,
        memberFormOpened: null,
      };

    case SET_EDITING_MEMBER:
      // If no set memberId set null editing member
      if (!action.memberId || action.memberId < 0) {
        return {
          ...state,
          editingMember: null
        };
      }

      // if myPatients exists we are in dentist dashboard
      if (state.myPatients) {
        account = findIndex(state.myPatients, { id: action.userId });
        listToEdit = state.myPatients[account];
        member = findIndex(listToEdit.members, { id: action.memberId });

        return {
          ...state,
          editingMember: listToEdit.members[member],
        };
      }

      member = findIndex(state.myMembers, { id: action.memberId });

      return {
        ...state,
        editingMember: state.myMembers[member],
      };

    default:
      return state;
  }
}

export default dashboardReducer;
