/*
Search Page Reducers
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // search
  SEARCH_SUCCESS,
} from './constants';


/*
Reducers
================================================================================
*/

/*
Initial State
------------------------------------------------------------
*/
const initialState = {
  // search
  searchResults: [],
};


export default function reducer (state = initialState, action) {
  switch (action.type) {

    /*
    Search Reducers
    ------------------------------------------------------------
    */
    case SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
      };

    /*
    Default Reducer
    ------------------------------------------------------------
    */
    default:
      return state;
  }
}
