import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import RoomActions from "../Redux/RoomActions";

export function* getListRoom(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.room.get, params);
  if (response.status) {
    yield put(RoomActions.getListRoomSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* createRoom(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.room.create, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* updateRoom(action) {
  const { id, data, onSuccess, onFailed } = action;
  const response = yield call(API.room.update, id, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Chỉnh sửa thông tin phòng thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}

export function* uploadRoom(action) {
  const { data, onSuccess, onFailed } = action;
  const response = yield call(API.room.upload, data);
  if (response.status) {
    if (onSuccess) yield call(onSuccess, "Tải tệp lên máy chủ thành công");
  } else {
    if (onFailed) yield call(onFailed, response.message);
  }
}
