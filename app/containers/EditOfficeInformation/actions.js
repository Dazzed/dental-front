/*
 *
 * EditOfficeInformation actions
 *
 */

import {
  FETCH_DENTIST_INFO,
  FETCH_DENTIST_INFO_SUCCESS,
  FETCH_DENTIST_INFO_ERROR,

  UPDATE_DENTIST_INFO,
  UPDATE_DENTIST_INFO_SUCCESS,
  UPDATE_DENTIST_INFO_ERROR,
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


export function updateDentistInfo (payload) {
  return {
    type: UPDATE_DENTIST_INFO,
    payload,
  };
}


export function updateDentistInfoSuccess (payload) {
  return {
    type: UPDATE_DENTIST_INFO_SUCCESS,
    payload,
  };
}


export function updateDentistInfoError () {
  return {
    type: UPDATE_DENTIST_INFO_ERROR,
  };
}
