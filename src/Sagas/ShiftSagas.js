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

export function* getShiftRooms(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.shiftRoom.get, params);
  if (response.status) {
    yield put(
      ShiftActions.getShiftRoomsSuccess(
        params.class ? params.class : "",
        response
      )
    );
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* createShift(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.shift.create, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Tạo ca thi thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* updateShift(action) {
  const { id, data, onSuccess, onFailed } = action;
  const response = yield call(API.shift.update, id, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Cập nhật ca thi thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* uploadShift(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.shift.upload, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Tải tệp lên máy chủ thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* studentRegister(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.shiftRoom.studentRegister, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Tải tệp lên máy chủ thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}
