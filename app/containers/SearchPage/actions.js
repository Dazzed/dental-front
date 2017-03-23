/*
Search Actions
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// local
import {
  // search
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from './constants';


/*
Search Actions
================================================================================
*/
export function searchRequest (payload) {
  return {
    type: SEARCH_REQUEST,
    payload
  };
}

export function searchSuccess (payload) {
  return {
    type: SEARCH_SUCCESS,
    payload
  };
}

export function searchError (payload) {
  return {
    type: SEARCH_ERROR,
    payload
  };
}
