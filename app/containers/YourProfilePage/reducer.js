/*
Your Profile Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  FAMILY_MEMBERS_SUCCESS,
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
function yourProfilePageReducer (state = initialState, action) {
  let memberIdx;

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

export default yourProfilePageReducer;
