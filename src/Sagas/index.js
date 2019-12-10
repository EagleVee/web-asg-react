import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { StartupTypes } from "../Redux/StartupActions";
import { AuthTypes } from "../Redux/AuthActions";

import { startup } from "./StartupSagas";
import {
  validateToken,
  me,
  login,
  logoutToken,
  refreshToken,
  register
} from "./AuthSagas";

export default function* root() {
  yield takeLatest(StartupTypes.STARTUP, startup);
  yield takeLatest(AuthTypes.VALIDATE_TOKEN, validateToken);
  yield takeLatest(AuthTypes.ME, me);
  yield takeLatest(AuthTypes.REFRESH_TOKEN, refreshToken);
  yield takeLatest(AuthTypes.LOGIN, login);
  yield takeLatest(AuthTypes.LOGOUT_TOKEN, logoutToken);
  yield takeLatest(AuthTypes.REGISTER, register);
}
