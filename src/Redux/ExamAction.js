import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListExam: ["params", "onSuccess", "onFailed"],
  getListExamSuccess: ["response"],
  downloadListExam: ["data", "onSuccess", "onFailed"],
  downloadListExamSuccess: ["response"]
});

export const ExamTypes = Types;

export default Creators;





