import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import ClassActions from "../Redux/ClassActions";

export function* getListClass(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.class.get, params);
  if (response.status) {
    yield put(ClassActions.getListClassSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}

export function* getClassDetail(action) {
  const { id, onSuccess, onFailed } = action;
  const response = yield call(API.class.getDetail, id);
  if (response.status) {
    yield put(ClassActions.getClassDetailSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}

export function* uploadListClass(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.class.upload, data);
  if (response.status) {
    yield put(ClassActions.uploadListClassSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}
