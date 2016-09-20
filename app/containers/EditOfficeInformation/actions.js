/*
 *
 * EditOfficeInformation actions
 *
 */

import {
  FETCH_DENTIST_INFO,
  FETCH_DENTIST_INFO_SUCCESS,
  FETCH_DENTIST_INFO_ERROR,

} from './constants';


export function fetchDentistInfo () {
  return {
    type: FETCH_DENTIST_INFO,
  };
}


export function fetchDentistInfoSuccess (payload) {
  return {
    type: FETCH_DENTIST_INFO_SUCCESS,
    payload,
  };
}


export function fetchDentistInfoError () {
  return {
    type: FETCH_DENTIST_INFO_ERROR,
  };
}
