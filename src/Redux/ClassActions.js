import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListClass: ["params", "onSuccess", "onFailed"],
  getListClassSuccess: ["response"],
  getClassDetail: ["id", "params", "onSuccess", "onFailed"],
  getClassDetailSuccess: ["response"],
  uploadListClass: ["data", "onSuccess", "onFailed"],
  uploadListClassSuccess: ["response"]
});

export const ClassTypes = Types;

export default Creators;
