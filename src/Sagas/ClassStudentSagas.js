import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import ClassStudentActions from "../Redux/ClassStudentActions";

export function* getStudentList(action) {
  const { params, onSuccess, onFailed } = action;
  const response = yield call(API.classStudent.get, params);
  if (response.status) {
    yield put(
      ClassStudentActions.getStudentListSuccess(params.class, response)
    );
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}

export function* updateClassStudent(action) {
  const { id, data, onSuccess, onFailed } = action;
  const response = yield call(API.classStudent.update, id, data);
  if (response.status) {
    yield put(ClassStudentActions.updateClassStudentSuccess(data.classId, response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}
