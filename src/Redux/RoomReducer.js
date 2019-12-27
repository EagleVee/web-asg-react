import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { RoomTypes } from "./RoomActions";

export const INITIAL_STATE = Immutable({
  listRoom: []
});

export const getRoomListSuccess = (state, action) => {
  const { response } = action;
  return state.merge({
    listRoom: response.data
  });
};

export const updateRoomSuccess = (state, action) => {
  const { response } = action;
  const { data } = response;
};

export const reducer = createReducer(INITIAL_STATE, {
  [RoomTypes.GET_ROOM_LIST_SUCCESS]: getRoomListSuccess,
  [RoomTypes.UPDATE_ROOM_SUCCESS]: updateRoomSuccess
});
