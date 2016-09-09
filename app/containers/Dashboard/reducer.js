/*
 *
 * Dashboard reducer
 *
 */

import {
  MY_DENTIST_SUCCESS,
  MY_FAMILY_SUCCESS,
} from './constants';

const initialState = {
  myDentist: null,
  myFamilyMembers: null,
};

function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case MY_DENTIST_SUCCESS:
      return {
        ...state,
        myDentist: action.payload,
      };
    case MY_FAMILY_SUCCESS:
      return {
        ...state,
        myFamilyMembers: action.payload,
      };
    default:
      return state;
  }
}

export default dashboardReducer;
