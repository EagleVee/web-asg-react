import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { AuthTypes } from "./AuthActions";

export const INITIAL_STATE = Immutable({
  isAuthenticated: false,
  user: {}
});

export const loginSuccess = (state, action) => {
  const { data } = action.response;
  const { user } = data;
  return state.merge({
    isAuthenticated: true,
    user: user
  });
};

export const validateTokenSuccess = (state, action) => {
  const { response } = action;
  return state.merge({
    isAuthenticated: response.data.is_alive
  });
};

export const meSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    user: data
  });
};

export const refreshTokenSuccess = (state, action) => {
  return state.merge({
    isAuthenticated: true
  });
};

export const logoutTokenSuccess = (state, action) => {
  return state.merge({
    isAuthenticated: false,
    user: {}
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.VALIDATE_TOKEN_SUCCESS]: validateTokenSuccess,
  [AuthTypes.REFRESH_TOKEN_SUCCESS]: refreshTokenSuccess,
  [AuthTypes.LOGOUT_TOKEN_SUCCESS]: logoutTokenSuccess,
  [AuthTypes.ME_SUCCESS]: meSuccess
});
