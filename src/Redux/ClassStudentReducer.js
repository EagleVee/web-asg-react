import Immutable from "seamless-immutable";
import { createReducer } from "reduxsauce";
import { ClassStudentTypes } from "./ClassStudentActions";
import ImmutableHelper from "../Common/ImmutableHelper";

export const INITIAL_STATE = Immutable({});

export const getStudentListSuccess = (state, action) => {
  const { response, classId } = action;
  return state.merge({
    [classId]: response.data
  });
};

export const updateClassStudentSuccess = (state, action) => {
  const { response, classId } = action;
  const { data } = response;
  const studentList = state[classId];
  const index = studentList.findIndex(v => v._id === data._id);
  const _studentList = ImmutableHelper.updateSingleElement(
    studentList,
    index,
    data
  );
  return state.merge({
    [classId]: _studentList
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [ClassStudentTypes.GET_STUDENT_LIST_SUCCESS]: getStudentListSuccess,
  [ClassStudentTypes.UPDATE_CLASS_STUDENT_SUCCESS]: updateClassStudentSuccess
});
