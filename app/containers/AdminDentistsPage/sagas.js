/*
Admin Page Sagas
================================================================================
*/

/*
Imports
------------------------------------------------------------
*/
// libs
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import { actions as toastrActions } from 'react-redux-toastr';
import { LOCATION_CHANGE } from 'react-router-redux';
import { change, stopSubmit } from 'redux-form';
import { takeLatest } from 'redux-saga';
import { take, select, call, put, fork, cancel } from 'redux-saga/effects';

// app
import request from 'utils/request';

// local
import {
  // fetch
  fetchDentistsSuccess,
  fetchDentistsError,

  fetchDentistDetails,
  fetchDentistDetailsSuccess,
  fetchDentistDetailsError,

  fetchDentistMembersSuccess,
  fetchDentistMembersError,

  fetchDentistReportsSuccess,
  fetchDentistReportsError,

  fetchDentistReviewsSuccess,
  fetchDentistReviewsError,

  fetchStatsSuccess,
  fetchStatsError,

  // actions
  editDentistSuccess,
  editDentistError,

  deleteDentistReviewSuccess,
  deleteDentistReviewError,

  downloadReportSuccess,
  downloadReportFailure,

  downloadMasterReportSuccess,
  downloadMasterReportFailure,
} from './actions';
import {
  // fetch
  FETCH_DENTISTS_REQUEST,
  FETCH_DENTIST_DETAILS_REQUEST,
  FETCH_DENTIST_MEMBERS_REQUEST,
  FETCH_DENTIST_REPORTS_REQUEST,
  FETCH_DENTIST_REVIEWS_REQUEST,
  FETCH_STATS_REQUEST,

  // actions
  EDIT_DENTIST_REQUEST,
  DELETE_DENTIST_REVIEW_REQUEST,
  DOWNLOAD_REPORT_REQUEST,
  DOWNLOAD_MASTER_REPORT_REQUEST,
  FETCH_MANAGERS_REQUEST,
  FETCH_MANAGERS_SUCCESS,
  FETCH_MANAGERS_ERROR,
} from './constants';

import superCompare from 'utils/superCompare';

/*
Sagas
================================================================================
*/
// Bootstrap sagas
export default [
  main,
];

function* main () {
  const watcherA = yield fork(dentistsFetcher);
  const watcherB = yield fork(dentistDetailsFetcher);
  const watcherC = yield fork(dentistMembersFetcher);
  const watcherD = yield fork(dentistReportsFetcher);
  const watcherE = yield fork(dentistReviewsFetcher);
  const watcherF = yield fork(statsFetcher);
  const watcherG = yield fork(editDentist);
  const watcherH = yield fork(deleteDentistReview);
  const watcherI = yield fork(downloadReport);
  const watcherJ = yield fork(downloadMasterReport);
  const watcherK = yield fork(managersFetcher);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
  yield cancel(watcherI);
  yield cancel(watcherJ);
  yield cancel(watcherK);
}


/* Fetch
 * ========================================================================== */
 
/*
Fetch Dentists
------------------------------------------------------------
*/
function* dentistsFetcher () {
  yield* takeLatest(FETCH_DENTISTS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/dentists');
      yield put(fetchDentistsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistsError(error));
    }
  });
}

/*
Fetch Dentist Details
------------------------------------------------------------
*/
function* dentistDetailsFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_DETAILS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}`);
      yield put(fetchDentistDetailsSuccess(response.data[0]));
    } catch (error) {
      yield put(fetchDentistDetailsError(error));
    }
  });
}

/*
Fetch Dentist Members
------------------------------------------------------------
*/
function* dentistMembersFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_MEMBERS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}/members`);
      yield put(fetchDentistMembersSuccess(response.data));
    } catch (error) {
      yield put(fetchDentistMembersError(error));
    }
  });
}

/*
Fetch Dentist Reports
------------------------------------------------------------
*/
function* dentistReportsFetcher () {
  yield* takeLatest(FETCH_DENTIST_REPORTS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/reports/dentist/${dentistId}/list`);
      yield put(fetchDentistReportsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistReportsError(error));
    }
  });
}

/*
Fetch Dentist Reviews
------------------------------------------------------------
*/
function* dentistReviewsFetcher (action) {
  yield* takeLatest(FETCH_DENTIST_REVIEWS_REQUEST, function* handler(action) {
    try {
      const { dentistId } = action;
      const response = yield call(request, `/api/v1/dentists/${dentistId}/reviews`);
      yield put(fetchDentistReviewsSuccess(response.data));
    } catch (error) {
      yield put(fetchDentistReviewsError(error));
    }
  });
}

/*
Fetch Stats
------------------------------------------------------------
*/
function* statsFetcher () {
  yield* takeLatest(FETCH_STATS_REQUEST, function* handler() {
    try {
      const response = yield call(request, '/api/v1/admin/stats');
      yield put(fetchStatsSuccess(response.data));
    }
    catch (error) {
      yield put(fetchDentistsError(error));
    }
  });
}


/* Actions
 * ========================================================================== */

/* Edit Dentist
 * ------------------------------------------------------ */
function* editDentist () {
  while (true) {
    yield takeLatest(EDIT_DENTIST_REQUEST, function* handler(data) {
      const { selectedDentist, values } = data;
      try {
        const requestURL = `/api/v1/dentists/${selectedDentist.id}`;
        const params = {
          method: 'PATCH',
          body: JSON.stringify(values)
        };

        const response = yield call(request, requestURL, params);

        const message = `The dentist has been updated.`;
        yield put(toastrActions.success('', message));

        yield put(editDentistSuccess(response));
      } catch (e) {
        if (typeof e.errors === 'string')
          yield put(toastrActions.error('', e.errors.toString()));
        else {
          for (let key in e.errors)
          yield put(toastrActions.error('', e.errors[key].msg));
        }
        yield put(stopSubmit('adminEditDentist', {}));
      }
    });
  }
}

/* Delete Dentist Review
 * ------------------------------------------------------ */
function* deleteDentistReview () {
  while (true) {
    const { dentistId, reviewId } = yield take(DELETE_DENTIST_REVIEW_REQUEST);

    try {
      const requestURL = `/api/v1/dentists/${dentistId}/reviews/${reviewId}`;
      const params = {
        method: 'DELETE',
      };

      yield call(request, requestURL, params);

      const message = `Review has been deleted.`;
      yield put(toastrActions.success('', message));

      yield put(deleteDentistReviewSuccess(dentistId, reviewId));
    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(deleteDentistReviewError(error));
    }
  }
}

/* Download Report
 * ------------------------------------------------------ */
// Based on: https://stackoverflow.com/questions/1999607/download-and-open-pdf-file-using-ajax
function* downloadReport () {
  while (true) {
    const { reportName, reportUrl } = yield take(DOWNLOAD_REPORT_REQUEST);

    try {
      const params = {
        method: "GET",
      };
      const pdfBlob = yield call(request, '/api/v1' + reportUrl, params);

      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = reportName;
      link.click();

      downloadReportSuccess();
    }

    catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      downloadReportFailure(err);
    }
  }
}

/* Download Master Report
 * ------------------------------------------------------ */
// Based on: https://stackoverflow.com/questions/1999607/download-and-open-pdf-file-using-ajax
function* downloadMasterReport () {
  while (true) {
    const { year, month } = yield take(DOWNLOAD_MASTER_REPORT_REQUEST);

    try {
      const params = {
        method: "GET",
      };
      const requestUrl = `/api/v1/reports/dentists/${year}/${month}`;
      const pdfBlob = yield call(request, requestUrl, params);

      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = `dentalhq_master_report_${year}_${month}.pdf`;
      link.click();

      downloadMasterReportSuccess();
    }

    catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      downloadMasterReportFailure(err);
    }
  }
}

// managers
function* managersFetcher () {
  while (true) {
    yield* takeLatest(FETCH_MANAGERS_REQUEST, function* handler() {
      try {
        const managers = yield call(request, '/api/v1/admin/managers/list' );
        yield put({
          type: FETCH_MANAGERS_SUCCESS,
          payload: managers
        });
      } catch (e) {
        console.log(e)
        yield put({type: FETCH_MANAGERS_ERROR});
      }
    });
  }
}
