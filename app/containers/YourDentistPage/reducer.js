/*
Your Dentist Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  DENTIST_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  dentist: false,
};

/*
Reducer
------------------------------------------------------------
*/
function yourDentistPageReducer (state = initialState, action) {
  let memberIdx;

  switch (action.type) {
    case DENTIST_SUCCESS:
      return {
        ...state,
        dentist: action.payload
      };

    default:
      return state;
  }
}

export default yourDentistPageReducer;
