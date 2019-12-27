import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import ShiftActions from "../Redux/ShiftActions";

export function* getListShift(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.shift.get, params);
  if (response.status) {
    yield put(ShiftActions.getListShiftSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* createShift(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.shift.create, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}
