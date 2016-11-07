/*
 *
 * Dashboard reducer
 *
 */

import filter from 'lodash/filter';
import findIndex from 'lodash/findIndex';

import {
  SET_BILL,
} from 'containers/PaymentForm/constants';


import {
  MY_DENTIST_SUCCESS,
  MY_FAMILY_SUCCESS,
  MY_PATIENTS_SUCCESS,
  CONVERSATION_REQUEST,
  CONVERSATION_SUCCESS,
  SET_EDITING_MEMBER,
  ADD_MEMBER_SUCCESS,
  EDIT_MEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
} from './constants';


const initialState = {
  userDashboard: {
    myDentist: null,
    myFamilyMembers: null,
  },
  dentistDashboard: {
    myPatients: null,
    sorter: {
      newMembers: null,
      newReviews: null,
      allMembers: null,
    }
  },
  familyMemberForms: {},
  messages: [],
};

function dashboardReducer (state = initialState, action) {
  let listToEdit;
  let patientIndex;
  let indexToEdit;
  let subscription;

  switch (action.type) {
    case SET_BILL:
      if (state.userDashboard && state.userDashboard.myDentist) {
        subscription = state.userDashboard.myDentist.subscriptions[0];
        subscription.status = action.payload.status;

        return {
          ...state,
          userDashboard: {
            ...state.userDashboard,
            myDentist: {
              ...state.userDashboard.myDentist,
              subscriptions: [
                subscription,
                ...state.userDashboard.myDentist.subscriptions.slice(1),
              ]
            }
          }
        };
      }

      location.reload();
      listToEdit = filter(state.dentistDashboard.myPatients, item =>
        item.id === action.userId
      )[0];

      patientIndex = findIndex(state.dentistDashboard.myPatients, {
        id: action.userId,
      });

      // FIXME: just hardcoded
      subscription = {
        ...listToEdit.subscriptions[0],
        status: action.payload.status,
      };

      listToEdit = {
        ...listToEdit,
        subscriptions: [
          subscription,
        ]
      };

      return {
        ...state,
        dentistDashboard: {
          ...state.dentistDashboard,
          myPatients: [
            ...state.dentistDashboard.myPatients.slice(0, patientIndex),
            listToEdit,
            ...state.dentistDashboard.myPatients.slice(patientIndex + 1),
          ]
        }
      };
    case DELETE_MEMBER_SUCCESS:
      listToEdit = filter(state.dentistDashboard.myPatients, item =>
        item.id === action.userId
      )[0];

      patientIndex = findIndex(state.dentistDashboard.myPatients, {
        id: action.userId,
      });

      indexToEdit = findIndex(listToEdit.familyMembers, {
        id: action.memberId,
      });

      listToEdit = {
        ...listToEdit,
        familyMembers: [
          ...listToEdit.familyMembers.slice(0, indexToEdit),
          ...listToEdit.familyMembers.slice(indexToEdit + 1),
        ]
      };

      return {
        ...state,
        dentistDashboard: {
          ...state.dentistDashboard,
          myPatients: [
            ...state.dentistDashboard.myPatients.slice(0, patientIndex),
            listToEdit,
            ...state.dentistDashboard.myPatients.slice(patientIndex + 1),
          ]
        }
      };

    case EDIT_MEMBER_SUCCESS:
      listToEdit = filter(state.dentistDashboard.myPatients, item =>
        item.id === action.userId
      )[0];

      patientIndex = findIndex(state.dentistDashboard.myPatients, {
        id: action.userId,
      });

      indexToEdit = findIndex(listToEdit.familyMembers, {
        id: action.payload.id,
      });

      listToEdit = {
        ...listToEdit,
        familyMembers: [
          ...listToEdit.familyMembers.slice(0, indexToEdit),
          action.payload,
          ...listToEdit.familyMembers.slice(indexToEdit + 1),
        ]
      };

      return {
        ...state,
        dentistDashboard: {
          ...state.dentistDashboard,
          myPatients: [
            ...state.dentistDashboard.myPatients.slice(0, patientIndex),
            listToEdit,
            ...state.dentistDashboard.myPatients.slice(patientIndex + 1),
          ]
        }
      };
    case ADD_MEMBER_SUCCESS:
      listToEdit = filter(state.dentistDashboard.myPatients, item =>
        item.id === action.userId
      )[0];

      patientIndex = findIndex(state.dentistDashboard.myPatients, {
        id: action.userId,
      });

      listToEdit = {
        ...listToEdit,
        familyMembers: [
          ...listToEdit.familyMembers,
          action.payload,
        ]
      };

      return {
        ...state,
        dentistDashboard: {
          ...state.dentistDashboard,
          myPatients: [
            ...state.dentistDashboard.myPatients.slice(0, patientIndex),
            listToEdit,
            ...state.dentistDashboard.myPatients.slice(patientIndex + 1),
          ]
        }
      };

    case MY_DENTIST_SUCCESS:
      return {
        ...state,
        userDashboard: {
          ...state.userDashboard,
          myDentist: action.payload,
        },
      };
    case MY_FAMILY_SUCCESS:
      return {
        ...state,
        userDashboard: {
          ...state.userDashboard,
          myFamilyMembers: action.payload,
        },
      };
    case MY_PATIENTS_SUCCESS:
      return {
        ...state,
        dentistDashboard: {
          ...state.dentistDashboard,
          myPatients: action.payload,
        },
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
    case SET_EDITING_MEMBER:
      return {
        ...state,
        familyMemberForms: {
          ...state.familyMemberForms,
          [action.userId]: action.payload,
        },
      };
    default:
      return state;
  }
}

export default dashboardReducer;
