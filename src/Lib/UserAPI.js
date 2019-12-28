import { GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  get: (params = {}) => {
    const path = "/user";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getDetail: id => {
    const path = "/user/" + id;
    return GET(path);
  },
  create: data => {
    const path = "/user";
    return POST(path, data);
  },
  upload: data => {
    const path = "/user/upload";
    return POST(path, data);
  },
  update: (id, data) => {
    const path = "/user/" + id;
    return PUT(path, data);
  }
};

export default API;
