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

export const getShiftRoomsSuccess = (state, action) => {
  const { classId, response } = action;
  return state.merge({
    [classId]: response.data
  });
};
export const reducer = createReducer(INITIAL_STATE, {
  [ShiftTypes.GET_LIST_SHIFT_SUCCESS]: getListShiftSuccess,
  [ShiftTypes.GET_SHIFT_ROOMS_SUCCESS]: getShiftRoomsSuccess
});
