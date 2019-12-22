import API from "../Lib/API";
import { call, put } from "redux-saga/effects";
import AuthActions from "../Redux/AuthActions";

export function* login(action) {
  const { username, password, onSuccess, onFailed } = action;
  const response = yield call(API.auth.login, username, password);
  if (response.status) {
    const accessToken = response.data.accessToken;
    API.auth.setAccessToken(accessToken)
    if (onSuccess) yield call(onSuccess);
    yield put(AuthActions.loginSuccess(response));
  } else {
    if (onFailed) yield call(onFailed);
  }
}

export function* validateToken(action) {
  const response = yield call(API.validateToken);
  const { data } = response;
  if (response.status) {
    if (data.is_alive === true) {
      yield put(AuthActions.refreshToken());
    }
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
  const response = yield call(API.me);
  if (response.status) {
    yield put(AuthActions.meSuccess(response));
  }
}
