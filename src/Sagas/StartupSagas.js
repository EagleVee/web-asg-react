import { put } from "redux-saga/effects";
// import API from '../Lib/API'
import TimelineActions from "../Redux/TimelineActions";
import NotificationActions from "../Redux/NotificationActions";

export function* startup(action) {
  yield put(TimelineActions.getBrandList());
  yield put(NotificationActions.getMessageNotification());
  yield put(NotificationActions.getTimelineNotification());
}
