import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { StartupTypes } from "../Redux/StartupActions";
import { AuthTypes } from "../Redux/AuthActions";
import { ClassTypes } from "../Redux/ClassActions";
import { ClassStudentTypes } from "../Redux/ClassStudentActions";
import { ShiftTypes } from "../Redux/ShiftActions";
import { RoomTypes } from "../Redux/RoomActions";

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
import {
  createShift,
  getListShift,
  updateShift,
  uploadShift
} from "./ShiftSagas";
import { createRoom, getListRoom, updateRoom, uploadRoom } from "./RoomSagas";

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
  yield takeLatest(ShiftTypes.CREATE_SHIFT, createShift);
  yield takeLatest(ShiftTypes.UPDATE_SHIFT, updateShift);
  yield takeLatest(ShiftTypes.UPLOAD_SHIFT, uploadShift);
  yield takeLatest(RoomTypes.GET_LIST_ROOM, getListRoom);
  yield takeLatest(RoomTypes.UPLOAD_ROOM, uploadRoom);
  yield takeLatest(RoomTypes.UPDATE_ROOM, updateRoom);
  yield takeLatest(RoomTypes.CREATE_ROOM, createRoom);
}
