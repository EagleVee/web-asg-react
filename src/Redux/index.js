import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/";

import { reducer as AuthReducer } from "./AuthReducer";
import { reducer as ClassReducer } from "./ClassReducer";
import { reducer as ShiftReducer } from "./ShiftReducer";
import { reducer as ClassStudentReducer } from "./ClassStudentReducer";
import { reducer as RoomReducer } from "./RoomReducer";
import { reducer as AccountReducer } from "./AccountReducer";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: AuthReducer,
  class: ClassReducer,
  classStudent: ClassStudentReducer,
  shift: ShiftReducer,
  room: RoomReducer,
  account: AccountReducer
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    reducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../Sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
