import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import AuthActions from "../Redux/AuthActions";
import CookieHelper from "../Common/CookieHelper";

export function* login(action) {
  const { username, password, onSuccess, onFailed } = action;
  const response = yield call(API.auth.login, username, password);
  if (response.status) {
    const accessToken = response.data.accessToken;
    API.auth.setAccessToken(accessToken);
    yield call(CookieHelper.set, "accessToken", accessToken);
    yield put(AuthActions.loginSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}

export function* validateToken(action) {
  const response = yield call(API.validateToken);
  if (response.status) {
    yield put(AuthActions.validateTokenSuccess(response));
  }
}

export function* refreshToken(action) {
  const response = yield call(API.refreshToken);
  if (response.status) {
    yield put(AuthActions.refreshTokenSuccess(response));
  }
}
export function* logoutToken(action) {
  const { onSuccess, onFailed } = action;
  const response = yield call(API.logoutToken);
  if (response.status) {
    yield put(AuthActions.logoutTokenSuccess(response));
    yield call(onSuccess);
  } else {
    // yield call(onFailed, 'Có lỗi xảy ra khi đăng xuất')
  }
}

export function* me(action) {
  const { onSuccess, onFailed } = action;
  const response = yield call(API.auth.me);
  if (response.status) {
    yield put(AuthActions.meSuccess(response));
    if (onSuccess) yield call(onSuccess);
  } else {
    if (onFailed) yield call(onFailed);
  }
}
