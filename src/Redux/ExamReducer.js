import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { ExamTypes } from "./ExamAction";

export const INITIAL_STATE = Immutable({
  listExam: []
});

export const getListExamSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    listExam: data
  });
};

export const downloadListClassSuccess = (state, action) => {
  const { data } = action.response;
  return state.merge({
    listExam: data
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [ExamTypes.GET_LIST_EXAM_SUCCESS]: getListExamSuccess,
  [ExamTypes.DOWNLOAD_LIST_EXAM_SUCCESS]: DOWNloadListExamSuccess
});
