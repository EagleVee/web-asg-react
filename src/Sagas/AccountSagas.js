import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import AccountActions from "../Redux/AccountActions";

export function* getListAccount(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.user.get, params);
  if (response.status) {
    yield put(AccountActions.getListAccountSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* uploadListAccount(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.user.upload, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Tải tệp lên máy chủ thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}