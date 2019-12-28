import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListShift: ["params", "onSuccess", "onFailed"],
  getListShiftSuccess: ["response"],
  updateShift: ["id", "data", "onSuccess", "onFailed"],
  createShift: ["data", "onSuccess", "onFailed"],
  uploadShift: ["data", "onSuccess", "onFailed"]
});

export const ShiftTypes = Types;

export default Creators;
