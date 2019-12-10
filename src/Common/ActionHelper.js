import { store } from "../App";

export default class ActionHelper {
  static dispatch(action, ...params) {
    store.dispatch(action, params);
  }
}
