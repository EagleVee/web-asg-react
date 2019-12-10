import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  login: ["email", "password", "onSuccess", "onFailed"],
  loginSuccess: ["response"],
  register: [
    "firstName",
    "lastName",
    "email",
    "password",
    "onSuccess",
    "onFailed"
  ],
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
