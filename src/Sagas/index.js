import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { StartupTypes } from "../Redux/StartupActions";
import { AuthTypes } from "../Redux/AuthActions";
import { ClassTypes } from "../Redux/ClassActions";
import { ClassStudentTypes } from "../Redux/ClassStudentActions";
import { ShiftTypes } from "../Redux/ShiftActions";

import { startup } from "./StartupSagas";
import {
  validateToken,
  me,
  login,
  logoutToken,
  refreshToken
} from "./AuthSagas";
import { getClassDetail, getListClass, uploadListClass } from "./ClassSagas";
import {
  getStudentList,
  updateClassStudent,
  uploadClassStudent
} from "./ClassStudentSagas";
import { getListShift } from "./ShiftSagas";

export default function* root() {
  yield takeLatest(StartupTypes.STARTUP, startup);
  yield takeLatest(AuthTypes.VALIDATE_TOKEN, validateToken);
  yield takeLatest(AuthTypes.ME, me);
  yield takeLatest(AuthTypes.REFRESH_TOKEN, refreshToken);
  yield takeLatest(AuthTypes.LOGIN, login);
  yield takeLatest(AuthTypes.LOGOUT_TOKEN, logoutToken);
  yield takeLatest(ClassTypes.GET_LIST_CLASS, getListClass);
  yield takeLatest(ClassTypes.GET_CLASS_DETAIL, getClassDetail);
  yield takeLatest(ClassTypes.UPLOAD_LIST_CLASS, uploadListClass);
  yield takeLatest(ClassStudentTypes.GET_STUDENT_LIST, getStudentList);
  yield takeLatest(ClassStudentTypes.UPDATE_CLASS_STUDENT, updateClassStudent);
  yield takeLatest(ClassStudentTypes.UPLOAD_CLASS_STUDENT, uploadClassStudent);
  yield takeLatest(ShiftTypes.GET_LIST_SHIFT, getListShift);
}
