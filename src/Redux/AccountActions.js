import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListAccount: ["params", "onSuccess", "onFailed"],
  getListAccountSuccess: ["response"],
  uploadListAccount: ["data", "onSuccess", "onFailed"]
});

export const AccountTypes = Types;

export default Creators;
