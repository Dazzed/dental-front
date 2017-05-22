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
  const watcherA = yield fork(dentistsFetcher);
  const watcherB = yield fork(dentistDetailsFetcher);
  const watcherC = yield fork(dentistMembersFetcher);
  const watcherD = yield fork(dentistReportsFetcher);
  const watcherE = yield fork(dentistReviewsFetcher);
  const watcherF = yield fork(statsFetcher);
  const watcherG = yield fork(deleteDentistReview);
  const watcherH = yield fork(downloadReport);

  yield take(LOCATION_CHANGE);
  yield cancel(watcherA);
  yield cancel(watcherB);
  yield cancel(watcherC);
  yield cancel(watcherD);
  yield cancel(watcherE);
  yield cancel(watcherF);
  yield cancel(watcherG);
  yield cancel(watcherH);
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
    const { dentist } = yield take(EDIT_DENTIST_REQUEST);

    try {
      const requestURL = `/api/v1/dentists/me/patients/${patient.id}/waive-fees`;
      const params = {
        method: 'PUT',
        body: JSON.stringify(payload),
      };

      yield call(request, requestURL, params);

      const message = `The patient's fee settings have been updated.`;
      yield put(toastrActions.success('', message));

      yield put(setToggledWaivePatientFees(patient, payload));

    } catch (err) {
      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      yield put(editDentistError(error));
    }
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
function* downloadReport () {
  while (true) {
    const { reportName, reportUrl } = yield take(DOWNLOAD_REPORT_REQUEST);

    try {
      const params = {
        method: "GET",
      };
      const pdfBlob = yield call(request, '/api/v1' + reportUrl, params);

      var link = document.createElement('a');

      // TODO: Server is giving a 403 error in the body instead of giving the
      //       pdf blob.
      console.log("CREATING THE LINK");
      console.log(pdfBlob);
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = `reportName`;
      link.click();

      console.log("download report success");
      console.log(link);

      downloadReportSuccess();
    }

    catch (err) {
      console.log("download report error");
      console.log(err);

      const errorMessage = get(err, 'message', 'Something went wrong!');
      yield put(toastrActions.error('', errorMessage));
      downloadReportFailure(err);
    }
  }
}
