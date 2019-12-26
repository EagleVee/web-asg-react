import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getStudentList: ["params", "onSuccess", "onFailed"],
  getStudentListSuccess: ["classId", "response"],
  updateClassStudent: ["id", "data", "onSuccess", "onFailed"],
  updateClassStudentSuccess: ["classId", "response"],
  uploadClassStudent: ["id", "data", "onSuccess", "onFailed"]
});

export const ClassStudentTypes = Types;

export default Creators;
