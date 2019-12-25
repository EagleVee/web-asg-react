import { GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  get: (params = {}) => {
    const path = "/class-student";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getDetail: id => {
    const path = "/class-student/" + id;
    return GET(path);
  },
  create: data => {
    const path = "/class-student";
    return POST(path, data);
  },
  upload: data => {
    const path = "/class-student/upload";
    return POST(path, data);
  },
  update: (id, data) => {
    const path = "/class-student/" + id;
    return PUT(path, data);
  }
};

export default API;
