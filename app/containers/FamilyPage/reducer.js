/*
Patient Family Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  FAMILY_MEMBERS_SUCCESS
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  familyMembers: null,
};

/*
Reducer
------------------------------------------------------------
*/
function familyPageReducer (state = initialState, action) {
  switch (action.type) {
    case FAMILY_MEMBERS_SUCCESS:
      return {
        ...state,
        familyMembers: action.payload,
      };

    default:
      return state;
  }
}

export default familyPageReducer;
