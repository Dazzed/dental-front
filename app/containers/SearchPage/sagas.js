/*
Search Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race } from 'redux-saga/effects';
import request from 'utils/request';

import data from './mockData'; // TODO: Remove this once API is hooked up

// local
import {
  // search
  SEARCH_REQUEST,
} from './constants';
import {
  // search
  searchSuccess,
} from './actions';

export function* search() {
  while (true) { // eslint-disable-line no-constant-condition
    const watcher = yield race({
      searchAction: take(SEARCH_REQUEST),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    // const response = yield call(request, `/api/v1/search?${watcher.searchAction.payload}`);
    // TODO: call real API once it is hooked up. Then remove this following block.
    const response = { data };

    if (response.err) {
    } else {
      yield put(searchSuccess(response.data));
    }
  }
}

export default [
  search,
];
