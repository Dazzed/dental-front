import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { actions as toastrActions } from 'react-redux-toastr';
import get from 'lodash/get';

import request from 'utils/request';

import {
  SUBMIT_PROFILE_FORM,
} from 'containers/ProfilePage/constants';
import {
  meFromToken
} from 'containers/App/actions';
import {
  submitProfileFormSucess,
  submitProfileFormError,
} from 'containers/ProfilePage/actions';

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
    const { payload } = yield take(SUBMIT_PROFILE_FORM);

    try {
      const requestURL = '/api/v1/users/me';
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };
      yield call(request, requestURL, params);

      yield put(
        toastrActions.success('', 'Your information has been updated!')
      );
      yield put(meFromToken());
      yield put(submitProfileFormSucess());
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(submitProfileFormError());
    }
  }
}
