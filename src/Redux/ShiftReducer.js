import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { ShiftTypes } from "./ShiftActions";

export const INITIAL_STATE = Immutable({
  listShift: []
});

export const getListShiftSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    listShift: data
  });
};
export const reducer = createReducer(INITIAL_STATE, {
  [ShiftTypes.GET_LIST_SHIFT_SUCCESS]: getListShiftSuccess
});
