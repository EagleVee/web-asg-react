import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListAccount: ["params", "onSuccess", "onFailed"],
  getListAccountSuccess: ["response"],
  uploadListAccount: ["params", "onSuccess", "onFailed"],
  uploadListAccountSuccess: ["response"]
});

export const AccountTypes = Types;

export default Creators;
