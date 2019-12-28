import { put, call } from "redux-saga/effects";
import CookieHelper from "../Common/CookieHelper";
import AuthActions from "../Redux/AuthActions";
import API from "../Lib/API";

export function* startup(action) {
  const { callback } = action;
  const accessToken = CookieHelper.get("accessToken", "");
  console.log("ACCESS TOKEN", accessToken);
  if (accessToken.length > 0) {
    yield call(API.auth.setAccessToken, accessToken);
    const response = yield call(API.auth.validateToken);
    if (response.status) {
      const { is_alive } = response.data;
      if (is_alive === true) {
        yield put(AuthActions.me(callback));
      } else {
        yield call(callback);
      }
    } else {
      yield call(callback);
    }
  } else {
    yield call(callback);
  }
}
