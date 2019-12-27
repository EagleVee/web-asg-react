import { GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  get: (params = {}) => {
    const path = "/room";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getDetail: id => {
    const path = "/room/" + id;
    return GET(path);
  },
  create: data => {
    const path = "/room";
    return POST(path, data);
  },
  upload: data => {
    const path = "/room/upload";
    return POST(path, data);
  },
  update: (id, data) => {
    const path = "/room/" + id;
    return PUT(path, data);
  }
};

export default API;
