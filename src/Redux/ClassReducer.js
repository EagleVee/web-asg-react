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

export const getClassDetailSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    [data._id]: data
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [ClassTypes.GET_LIST_CLASS_SUCCESS]: getListClassSuccess,
  [ClassTypes.GET_CLASS_DETAIL_SUCCESS]: getClassDetailSuccess
});
