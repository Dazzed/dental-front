/*
 *
 * Dashboard actions
 *
 */

import {
  MY_DENTIST_REQUEST,
  MY_DENTIST_SUCCESS,
  MY_DENTIST_ERROR,
  MY_FAMILY_REQUEST,
  MY_FAMILY_SUCCESS,
  MY_FAMILY_ERROR,
} from 'containers/Dashboard/constants';

export function fetchMyDentist () {
  return {
    type: MY_DENTIST_REQUEST,
  };
}

export function myDentistFetched (payload) {
  return {
    type: MY_DENTIST_SUCCESS,
    payload,
  };
}

export function myDentistFetchingError (payload) {
  return {
    type: MY_DENTIST_ERROR,
    payload,
  };
}

export function fetchMyFamily () {
  return {
    type: MY_FAMILY_REQUEST,
  };
}

export function myFamilyFetched (payload) {
  return {
    type: MY_FAMILY_SUCCESS,
    payload,
  };
}

export function myFamilyFetchingError (payload) {
  return {
    type: MY_FAMILY_ERROR,
    payload,
  };
}
