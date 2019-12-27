import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { RoomTypes } from "./RoomActions";

export const INITIAL_STATE = Immutable({
  listRoom: []
});

export const getListRoomSuccess = (state, action) => {
  const { response } = action;
  return state.merge({
    listRoom: response.data
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [RoomTypes.GET_LIST_ROOM_SUCCESS]: getListRoomSuccess
});
