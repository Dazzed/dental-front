/*
 *
 * Dashboard reducer
 *
 */

import {
  MY_DENTIST_SUCCESS,
  MY_FAMILY_SUCCESS,
  MY_PATIENTS_SUCCESS,
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
};

function dashboardReducer (state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default dashboardReducer;
