/*
Learn More Page Reducer
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // send contact us message
  SET_EDITING_CONTACT_US_MESSAGE,
  CLEAR_EDITING_CONTACT_US_MESSAGE,
  SEND_CONTACT_US_MESSAGE_SUCCESS,
} from './constants';

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  editingActive: false,
  editing: null,
};


/*
Reducer
================================================================================
*/
function learnMorePageReducer (state = initialState, action) {
  switch (action.type) {

    /*
    Send Contact Us Message
    ------------------------------------------------------------
    */
    case SET_EDITING_CONTACT_US_MESSAGE:
      return {
        ...state,
        editingActive: 'contactUsMessage',
        editing: action.message,
      };

    case CLEAR_EDITING_CONTACT_US_MESSAGE:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    case SEND_CONTACT_US_MESSAGE_SUCCESS:
      return {
        ...state,
        editingActive: false,
        editing: null,
      };

    /*
    Default
    ------------------------------------------------------------
    */
    default:
      return state;

  }
}

export default learnMorePageReducer;
