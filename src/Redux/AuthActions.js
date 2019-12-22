import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  login: ["username", "password", "onSuccess", "onFailed"],
  loginSuccess: ["response"],
  validateToken: [],
  validateTokenSuccess: ["response"],
  me: [],
  meSuccess: ["response"],
  refreshToken: [],
  refreshTokenSuccess: ["response"],
  logoutToken: ["onSuccess", "onFailed"],
  logoutTokenSuccess: ["response"]
});

export const AuthTypes = Types;

export default Creators;
