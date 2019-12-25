import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { ClassTypes } from "./ClassActions";

export const INITIAL_STATE = Immutable({
  listClass: []
});

export const getListClassSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    listClass: data
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [ClassTypes.GET_LIST_CLASS_SUCCESS]: getListClassSuccess
});
