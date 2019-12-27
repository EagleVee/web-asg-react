import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListShift: ["params", "onSuccess", "onFailed"],
  getListShiftSuccess: ["response"],
  updateShift: ["id", "data", "onSuccess", "onFailed"],
  updateShiftSuccess: ["response"],
  createShift: ["data", "onSuccess", "onFailed"]
});

export const ShiftTypes = Types;

export default Creators;
