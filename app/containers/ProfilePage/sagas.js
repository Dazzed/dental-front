import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { initialize } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import get from 'lodash/get';

import request from 'utils/request';

import { setUserData } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';

import {
  FETCH_PROFILE_DATA,
  SUBMIT_PROFILE_FORM
} from 'containers/ProfilePage/constants';
import {
  submitProfileFormSucess,
  submitProfileFormError,
} from 'containers/ProfilePage/actions';

// Bootstrap sagas
export default [
  main,
];


function* main () {
  const watcherA = yield fork(profileDataFetcher);
  const watcherB = yield fork(submitFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

function* profileDataFetcher () {
  yield* takeLatest(FETCH_PROFILE_DATA, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/account');
      yield put(setUserData(response.data));

      // Force initialization form
      const state = yield select(selectCurrentUser);
      yield put(initialize('profile', state));
    } catch (e) {
      console.log(e);
    }
  });
}

function* submitFormWatcher () {
  while (true) {
    const { payload } = yield take(SUBMIT_PROFILE_FORM);

    try {
      const requestURL = '/api/v1/users/me/account';
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };
      const response = yield call(request, requestURL, params);

      yield put(setUserData(response.data));
      yield put(
        toastrActions.success('', 'Your information has been updated!')
      );
      yield put(submitProfileFormSucess());
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(submitProfileFormError());
    }
  }
}
