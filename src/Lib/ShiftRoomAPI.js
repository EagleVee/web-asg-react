import { GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  get: (params = {}) => {
    const path = "/shift-room";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getDetail: (id, params) => {
    const path = "/shift-room/" + id;
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  create: data => {
    const path = "/shift-room";
    return POST(path, data);
  },
  upload: data => {
    const path = "/shift-room/upload";
    return POST(path, data);
  },
  update: (id, data) => {
    const path = "/shift-room/" + id;
    return PUT(path, data);
  }
};

export default API;
