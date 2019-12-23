import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListClass: [],
  getListClassSuccess: ["response"]
});

export const ClassTypes = Types;

export default Creators;
