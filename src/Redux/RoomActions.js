import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getRoomList: ["params", "onSuccess", "onFailed"],
  getRoomListSuccess: ["classId", "response"],
  updateRoom: ["id", "data", "onSuccess", "onFailed"],
  updateRoomSuccess: ["classId", "response"],
  editR: ["id", "data", "onSuccess", "onFailed"]
});

export const RoomTypes = Types;

export default Creators;
