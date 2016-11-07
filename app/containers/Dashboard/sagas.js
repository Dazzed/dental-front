import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reset } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';
import get from 'lodash/get';
import request from 'utils/request';

import {
  MY_DENTIST_REQUEST,
  MY_FAMILY_REQUEST,
  MY_PATIENTS_REQUEST,
  CONVERSATION_REQUEST,
  NEW_MSG_COUNT_REQUEST,
  MARK_MSG_READ_REQUEST,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_CLIENT_REVIEW_FORM,
  SUBMIT_INVITE_PATIENT_FORM,
  SUBMIT_MEMBER_FORM,
  DELETE_MEMBER_REQUEST,
  REQUEST_PAYMENT_BILL,
} from 'containers/Dashboard/constants';

import {
  myDentistFetched,
  myDentistFetchingError,
  myFamilyFetched,
  myFamilyFetchingError,
  myPatientsFetched,
  myPatientsFetchingError,
  conversationFetched,
  conversationFetchingError,
  fetchNewMsgCount,
  newMsgCountFetched,
  memberEdited,
  memberAdded,
  memberDeleted,
  setBill,
} from 'containers/Dashboard/actions';


// Individual exports for testing
export function* userDashboardSaga () {
  const watcherA = yield fork(fetchMyDentistWatcher);
  const watcherB = yield fork(fetchMyFamilyWatcher);
  const watcherC = yield fork(submitMessageFormWatcher);
  const watcherD = yield fork(submitClientReviewFormWatcher);
  const watcherE = yield fork(fetchConversationWatcher);
  const watcherF = yield fork(fetchNewMsgCountWatcher);
  const watcherG = yield fork(markMsgReadWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
}

export function* dentistDashboardSaga () {
  const watcherA = yield fork(fetchMyPatientsWatcher);
  const watcherB = yield fork(submitInvitePatientFormWatcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
}

export function* fetchMyDentistWatcher () {
  yield* takeLatest(MY_DENTIST_REQUEST, fetchMyDentist);
}

export function* fetchMyFamilyWatcher () {
  yield* takeLatest(MY_FAMILY_REQUEST, fetchMyFamily);
}

export function* fetchMyPatientsWatcher () {
  yield* takeLatest(MY_PATIENTS_REQUEST, fetchMyPatients);
}

export function* fetchConversationWatcher () {
  yield* takeLatest(CONVERSATION_REQUEST, fetchConversation);
}

export function* fetchNewMsgCountWatcher () {
  yield* takeEvery(NEW_MSG_COUNT_REQUEST, fetchNewMsgCountFn);
}

export function* markMsgReadWatcher () {
  yield* takeLatest(MARK_MSG_READ_REQUEST, markMsgRead);
}

export function* fetchMyDentist () {
  try {
    const requestURL = '/api/v1/users/me/dentist';
    const response = yield call(request, requestURL);

    yield put(fetchNewMsgCount({ senderId: response.data.id }));
    yield put(myDentistFetched(response.data));
  } catch (err) {
    yield put(myDentistFetchingError(err));
  }
}

export function* fetchMyFamily () {
  try {
    const requestURL = '/api/v1/users/me/family-members';
    const response = yield call(request, requestURL);

    yield put(myFamilyFetched(response.data));
  } catch (err) {
    yield put(myFamilyFetchingError(err));
  }
}

export function* fetchMyPatients () {
  try {
    const requestURL = '/api/v1/users/me/clients';
    const response = yield call(request, requestURL);

    const tasks = [];
    for (let i = 0; i < response.data.length; i++) {
      tasks.push(put(fetchNewMsgCount({ senderId: response.data[i].id })));
    }
    yield [ tasks ];
    yield put(myPatientsFetched(response.data));
  } catch (err) {
    yield put(myPatientsFetchingError(err));
  }
}

export function* fetchConversation (action) {
  const { payload } = action;

  try {
    const requestURL = `/api/v1/users/me/messages/${payload.recipientId}`;
    const response = yield call(request, requestURL);

    yield put(conversationFetched(response.data.messages || []));
  } catch (err) {
    yield put(conversationFetchingError(err));
  }
}

export function* fetchNewMsgCountFn (action) {
  const { payload } = action;
  const data = {
    senderId: payload.senderId,
    count: 0
  };

  try {
    const requestURL =
      `/api/v1/users/me/messages/${payload.senderId}/unread_count`;
    const response = yield call(request, requestURL);

    data.count = response.data.unread_count || 0;
    yield put(newMsgCountFetched(data));
  } catch (err) {
    yield put(newMsgCountFetched(data));
  }
}

export function* markMsgRead (action) {
  const { payload } = action;

  try {
    const requestURL =
      `/api/v1/users/me/messages/${payload.senderId}/mark_all_read`;
    yield call(request, requestURL);
    yield put(fetchNewMsgCount({ senderId: payload.senderId }));
  } catch (err) {
    console.log(err);
  }
}

export function* submitMessageFormWatcher () {
  while (true) {
    const {
      payload: {
        recipientId,
        body,
      },
    } = yield take(SUBMIT_MESSAGE_FORM);

    try {
      const requestURL = `/api/v1/users/me/messages/${recipientId}`;
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your message has been sent!'));
      yield put(reset('writeMessage'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* submitClientReviewFormWatcher () {
  while (true) {
    const {
      payload: {
        dentistId,
        body,
      }
    } = yield take(SUBMIT_CLIENT_REVIEW_FORM);
    // payload.isAnonymous = payload.isAnonymous === 'true';
    // yield take(SUBMIT_CLIENT_REVIEW_FORM);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/review`;
      const params = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      yield call(request, requestURL, params);
      yield put(toastrActions.success('', 'Your review has been submitted!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* submitInvitePatientFormWatcher () {
  while (true) {
    const { payload } = yield take(SUBMIT_INVITE_PATIENT_FORM);

    try {
      const requestURL = '/api/v1/dentists/me/invite_patient';
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };
      yield call(request, requestURL, params);

      yield put(toastrActions.success('', 'Your invitation has been sent!'));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}

export function* submitFormWatcher () {
  while (true) {
    const { payload, userId } = yield take(SUBMIT_MEMBER_FORM);
    const memberId = payload.id;

    try {
      let requestURL = `/api/v1/users/${userId}/family-members`;
      const params = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      if (memberId) {
        params.method = 'PUT';
        requestURL += `/${memberId}`;
      }

      const response = yield call(request, requestURL, params);

      let message;
      if (memberId) {
        message = `'${payload.firstName} ${payload.lastName}'
          has been modified.`;
      } else {
        message = `'${payload.firstName} ${payload.lastName}'
          has been added.`;
      }
      yield put(toastrActions.success('', message));

      if (memberId) {
        yield put(memberEdited(response.data, userId));
      } else {
        yield put(memberAdded(response.data, userId));
      }
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}


export function* deleteMemberWatcher () {
  while (true) {
    const { payload, userId } = yield take(DELETE_MEMBER_REQUEST);

    try {
      const requestURL =
        `/api/v1/users/${userId}/family-members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(memberDeleted(payload.id, userId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}


export function* requestPayBill () {
  yield* takeLatest(REQUEST_PAYMENT_BILL, function* (action) {
    try {
      const body = { token: action.payload.id };

      yield call(request, `/api/v1/users/${action.userId}/charge-bill`, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      yield put(setBill(action.userId));
      yield put(toastrActions.success('',
        'You have successfully activated the account.'));
    } catch (e) {
      console.log(e);
    }
  });
}

// All sagas to be loaded
export default [
  userDashboardSaga,
  dentistDashboardSaga,
  submitFormWatcher,
  deleteMemberWatcher,
  requestPayBill,
];
