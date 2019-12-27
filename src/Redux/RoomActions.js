import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListRoom: ["params", "onSuccess", "onFailed"],
  getListRoomSuccess: ["response"],
  createRoom: ["data", "onSuccess", "onFailed"],
  updateRoom: ["id", "data", "onSuccess", "onFailed"],
  uploadRoom: ["data", "onSuccess", "onFailed"]
});

export const RoomTypes = Types;

export default Creators;
