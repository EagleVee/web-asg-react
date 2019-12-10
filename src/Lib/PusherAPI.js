import axios from "axios";
import * as qs from "query-string";

import {
  API_PUSHER_ENDPOINT,
  REQUEST_TIME_OUT,
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_UNAUTHORIZED
} from "../Config/Remote";

const instance = axios.create({
  baseURL: API_PUSHER_ENDPOINT,
  timeout: REQUEST_TIME_OUT,
  headers: {}
});

const checkStatus = response => {
  console.log("RESPONSE:", response);
  if (response.status === STATUS_OK) {
    return response.data;
  }
  return {};
};

const logError = error => {
  console.log("ERROR RESPONSE:", error);
  console.log("ERROR RESPONSE:", error.response);
  if (error.response) {
    const { status, data } = error.response;
    if (status === STATUS_BAD_REQUEST) {
      return data;
    } else if (status === STATUS_UNAUTHORIZED) {
      return data;
    } else if (status === STATUS_INTERNAL_SERVER_ERROR) {
      return {
        data: "Mã lỗi" + status,
        msg: "Mã lỗi" + status,
        code: status
      };
    }
  }
  return {
    status: false,
    message: "Lỗi server",
    error: error
  };
};

const GET = (url, config = {}) => {
  return instance
    .get(url, config)
    .then(checkStatus)
    .catch(logError);
};

const POST = (url, params, config = {}) => {
  return instance
    .post(url, params, config)
    .then(checkStatus)
    .catch(logError);
};

const PUT = (url, params, config = {}) => {
  return instance
    .put(url, params, config)
    .then(checkStatus)
    .catch(logError);
};

const DELETE = (url, config = {}) => {
  return instance
    .delete(url, config)
    .then(checkStatus)
    .catch(logError);
};

const API = {
  triggerMessage: uuid => {
    const path = "/message/" + uuid;
    return POST(path);
  }
};

export default API;
