import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListClass: ["params", "onSuccess", "onFailed"],
  getListClassSuccess: ["response"]
});

export const ClassTypes = Types;

export default Creators;
