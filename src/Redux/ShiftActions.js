import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListShift: ["params", "onSuccess", "onFailed"],
  getListShiftSuccess: ["response"],
  getListShiftDetail: ["params", "onSuccess", "onFailed"],
  getListShiftDetailSuccess: ["response"],
  updateShift: ["id", "data", "onSuccess", "onFailed"],
  createShift: ["data", "onSuccess", "onFailed"],
  uploadShift: ["data", "onSuccess", "onFailed"],
  uploadListShiftDetail: ["params", "onSuccess", "onFailed"],
  getShiftRooms: ["params", "onSuccess", "onFailed"],
  getShiftRoomsSuccess: ["classId", "response"]
});

export const ShiftTypes = Types;

export default Creators;
