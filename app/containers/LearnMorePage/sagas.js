/*
Learn More Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import pick from 'lodash/pick';
import mapValues from 'lodash/mapValues';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';
import request from 'utils/request';

// local
import {
  // send contact us message
  sentContactUsMessage,
} from './actions';

import {
  // send contact us message
  SUBMIT_CONTACT_US_MESSAGE_FORM,
} from './constants';


/*
Sagas
================================================================================
*/

// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(submitContactUsMessageFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
}

/*
Send Contact Us Message
------------------------------------------------------------
*/
function* submitContactUsMessageFormWatcher () {
  while (true) {
    const { payload, } = yield take(SUBMIT_CONTACT_US_MESSAGE_FORM);

    try {
      const requestURL = '/api/v1/dentists/contact_support';

      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      const response = yield call(request, requestURL, params);
      const message = `Your message has been sent to the DentalHQ admin team.`;
      yield put(toastrActions.success('', message));

      yield put(sentContactUsMessage()); 
     
    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      yield put(stopSubmit('contactUs', errors));
    }
  }
}
