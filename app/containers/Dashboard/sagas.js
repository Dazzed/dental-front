import get from 'lodash/get';
import request from 'utils/request';
import mapValues from 'lodash/mapValues';

import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reset, stopSubmit } from 'redux-form';
import { actions as toastrActions } from 'react-redux-toastr';

import {
  MY_DENTIST_REQUEST,
  MY_MEMBERS_REQUEST,
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
  REQUEST_REPORT,

  UPLOAD_AVATAR,
} from 'containers/Dashboard/constants';

import {
  setMyDentist,
  setMyDentistErrors,
  setMyMembers,
  setMemberErrors,

  myPatientsFetched,
  myPatientsFetchingError,

  conversationFetched,
  conversationFetchingError,

  messageSent,
  fetchNewMsgCount,
  newMsgCountFetched,

  setEditedMember,
  setAddedMember,
  setDeletedMember,

  setBill,
  setAvatar,
} from 'containers/Dashboard/actions';


// Individual exports for testing
export function* userDashboardSaga () {
  const watcherA = yield fork(fetchMyDentistWatcher);
  const watcherB = yield fork(fetchMyMembersWatcher);
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

export function* fetchMyMembersWatcher () {
  yield* takeLatest(MY_MEMBERS_REQUEST, fetchMyMembers);
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
    yield put(setMyDentist(response.data));
  } catch (err) {
    yield put(setMyDentistErrors(err));
  }
}

export function* fetchMyMembers () {
  try {
    const requestURL = '/api/v1/users/me/members';
    const response = yield call(request, requestURL);

    yield put(setMyMembers(response.data));
  } catch (err) {
    yield put(setMemberErrors(err));
  }
}

export function* fetchMyPatients () {
  try {
    const requestURL = '/api/v1/users/me/members';
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
      const response = yield call(request, requestURL, params);

      yield put(messageSent(response));
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
      let requestURL = `/api/v1/users/${userId}/members`;
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
        message = `'${payload.firstName} ${payload.lastName}' has been added.`;
      }

      yield put(toastrActions.success('', message));

      if (memberId) {
        yield put(setEditedMember(response.data, userId));
      } else {
        yield put(setAddedMember(response.data, userId));
      }
    } catch (err) {
      const errors = mapValues(err.errors, (value) => value.msg);

      yield put(toastrActions.error('', 'Please fix errors on the form!'));
      // dispatch LOGIN_ERROR action
      yield put(stopSubmit('familyMember', errors));
    }
  }
}


export function* deleteMemberWatcher () {
  while (true) {
    const { payload, userId } = yield take(DELETE_MEMBER_REQUEST);

    try {
      const requestURL =
        `/api/v1/users/${userId}/members/${payload.id}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `'${payload.firstName} ${payload.lastName}'
        has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(setDeletedMember(payload.id, userId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
    }
  }
}


export function* requestPayBill () {
  yield* takeLatest(REQUEST_PAYMENT_BILL, function* handler (action) {
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


export function* uploadAvatar () {
  yield* takeLatest(UPLOAD_AVATAR, function* handler (action) {
    try {
      const { file, userId } = action;
      const params = `file-name=${file.name}&file-type=${file.type}`;

      const response = yield call(request,
        `/api/v1/users/${action.userId}/sign-avatar?${params}`, {
          method: 'GET',
        });

      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', response.signedRequest);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve();
            } else {
              reject();
            }
          }
        };
        xhr.send(file);
      });

      yield promise;

      yield put(setAvatar(response.avatar, userId));
      yield put(toastrActions.success('', 'Avatar uploaded.'));
    } catch (e) {
      console.log(e);
    }
  });
}

// Function to download data to a file
function download (data, filename, type) {
  const a = document.createElement('a');
  const file = new Blob([ data ], { type });
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Others
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

export function* requestReport () {
  yield* takeLatest(REQUEST_REPORT, function* handler () {
    try {
      const response = yield call(request, '/api/v1/users/me/reports');
      download(response, 'report.csv', 'text/csv');
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
  requestReport,
  uploadAvatar,
];
