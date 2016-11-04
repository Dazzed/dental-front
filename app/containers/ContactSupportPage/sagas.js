import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reset } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import get from 'lodash/get';

import request from 'utils/request';

import {
  SUBMIT_CONTACT_SUPPORT,
} from 'containers/ContactSupportPage/constants';
import {
  submitContactSupportFormSuccess,
  submitContactSupportFormError,
} from 'containers/ContactSupportPage/actions';

// Bootstrap sagas
export default [
  submitFlow,
];


function* submitFlow () {
  const watcher = yield fork(submitFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* submitFormWatcher () {
  while (true) {
    const { payload } = yield take(SUBMIT_CONTACT_SUPPORT);

    try {
      const requestURL = '/api/v1/dentists/me/contact_support';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your message has been sent!'));
      yield put(reset('contactSupportForm'));
      yield put(submitContactSupportFormSuccess());
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(submitContactSupportFormError());
    }
  }
}
