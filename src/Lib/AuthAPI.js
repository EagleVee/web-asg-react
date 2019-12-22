import { instance, GET, POST, PUT, DELETE } from "./API";
import * as qs from "query-string";
const API = {
  setAccessToken: accessToken => {
    if (accessToken && accessToken.length > 0) {
      instance.defaults.headers.common["Authorization"] = accessToken;
    }
  },
  login: (username, password) => {
    const path = "/auth/login";
    const data = {
      username: username,
      password: password
    };
    return POST(path, data);
  },
  logout: () => {
    const path = "/auth/logout";
    return POST(path);
  }
};

export default API;
