import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { AccountTypes } from "./AccountAction";

export const INITIAL_STATE = Immutable({
  listAccount: []
});

export const getListAccountSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    listAccount: data
  });
};

export const uploadListAccountSuccess = (state, action) => {
    const { data } = action.response;
    return state.merge({
      listAccount: data
    });
  };

export const reducer = createReducer(INITIAL_STATE, {
  [AccountTypes.GET_LIST_ACCOUNT_SUCCESS]: getListAccountSuccess,
  [AccountTypes.UPLOAD_LIST_ACCOUNT_SUCCESS]: uploaduploadListAccountSuccess
  
});
