import { GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  get: (params = {}) => {
    const path = "/shift";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getDetail: id => {
    const path = "/shift/" + id;
    return GET(path);
  },
  create: data => {
    const path = "/shift";
    return POST(path, data);
  },
  upload: data => {
    const path = "/shift/upload";
    return POST(path, data);
  },
  update: (id, data) => {
    const path = "/shift/" + id;
    return PUT(path, data);
  }
};

export default API;
