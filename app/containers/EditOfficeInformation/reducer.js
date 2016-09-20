/*
 *
 * EditOfficeInformation reducer
 *
 */

import {
  FETCH_DENTIST_INFO_SUCCESS,
} from './constants';

const initialState = {
  dentistInfo: {},
};


function editOfficeInformationReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_DENTIST_INFO_SUCCESS:
      return {
        ...state,
        dentistInfo: action.payload.data,
      };
    default:
      return state;
  }
}


export default editOfficeInformationReducer;
