import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListShift: ["classId"],
  getListShiftSuccess: ["response"]
});

export const ShiftTypes = Types;

export default Creators;
