import { store } from "../App";

export default class RoleHelper {
  static isAdmin(user) {
    return user.role && user.role === "admin";
  }

  static isStudent(user) {
    return user.role && user.role === "student";
  }
}
