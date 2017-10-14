import { LOCATION_CHANGE } from 'react-router-redux';
import { take, call, put, race, fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { actions as toastrActions } from 'react-redux-toastr';
import request from 'utils/request';

import {
  PREFIX,
  fetchMaterialsSuccess,
  addCategorySuccess,
  addCategoryError,
  addMaterialSuccess,
  addMaterialError,
  deleteMaterialSuccess,
  deleteMaterialError,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryError,
} from './actions';

function* main () {
  const watcherA = yield fork(fetchMaterials);
  yield fork(addCategoryWatcher);
  yield fork(addMaterialWatcher);
  yield fork(deleteMaterialWatcher);
  yield fork(deleteCategoryWatcher);

  yield take(LOCATION_CHANGE);

  yield cancel(watcherA);
}

function* fetchMaterials () {
  yield takeLatest(`${PREFIX}_FETCH`, function* handler () {
    try {
      const requestURL = '/api/v1/admin/marketing_materials/';
      const params = {
        method: 'GET',
      };
      const { marketingMaterials } = yield call(request, requestURL, params);

      yield put(fetchMaterialsSuccess(marketingMaterials));
    } catch (e) {
      console.log(e);
    }
  });
}

function* addCategoryWatcher () {
  yield takeLatest(`${PREFIX}_ADD_CATEGORY`, function* handler ({ payload }) {
    try {
      const requestURL = '/api/v1/admin/marketing_materials/category';
      const body = {
        name: payload.name
      };
      const params = {
        method: 'POST',
        body: JSON.stringify(body)
      };
      const { addedCategory } = yield call(request, requestURL, params);
      yield put(addCategorySuccess(addedCategory));
      const message = `'${payload.name}' category is created successfully!.`;
      yield put(toastrActions.success('', message));
    } catch (e) {
      console.log(e);
      yield put(addCategoryError(e.errors));
      yield put(toastrActions.error('', e.errors));
    }
  });
}

function* addMaterialWatcher () {
  yield takeLatest(`${PREFIX}_ADD_MATERIAL`, function* handler ({ payload }) {
    try {
      const { categoryId, fileKey } = payload;
      const requestURL = `/api/v1/admin/marketing_materials/material/${categoryId}`;
      const body = {
        fileKey
      };
      const params = {
        method: 'POST',
        body: JSON.stringify(body)
      };
      const { editedCategory } = yield call(request, requestURL, params);
      yield put(addMaterialSuccess(editedCategory));
      const message = 'File is uploaded successfully!.';
      yield put(toastrActions.success('', message));
    } catch (e) {
      console.log(e);
      yield put(addMaterialError(e.errors));
      yield put(toastrActions.error('', e.errors));
    }
  });
}

function* deleteMaterialWatcher () {
  yield takeLatest(`${PREFIX}_DELETE_MATERIAL`, function* handler ({ payload: materialId }) {
    try {
      const requestURL = `/api/v1/admin/marketing_materials/material/${materialId}`;
      const params = {
        method: 'DELETE',
      };
      const { editedCategory } = yield call(request, requestURL, params);
      yield put(deleteMaterialSuccess(editedCategory));
      const message = 'File is deleted successfully!.';
      yield put(toastrActions.success('', message));
    } catch (e) {
      console.log(e);
      yield put(deleteMaterialError(e.errors));
      yield put(toastrActions.error('', e.errors));
    }
  });
}

function* deleteCategoryWatcher () {
  yield takeLatest(`${PREFIX}_DELETE_CATEGORY`, function* handler ({ payload: categoryId }) {
    try {
      const requestURL = `/api/v1/admin/marketing_materials/category/${categoryId}`;
      const params = {
        method: 'DELETE',
      };
      const { deletedCategory: deleteCategoryId } = yield call(request, requestURL, params);
      yield put(deleteCategorySuccess(deleteCategoryId));
      const message = 'Category and related files were deleted successfully!.';
      yield put(toastrActions.success('', message));
    } catch (e) {
      console.log(e);
      yield put(deleteCategoryError(e.errors));
      yield put(toastrActions.error('', e.errors));
    }
  });
}

export default [
  main
];
