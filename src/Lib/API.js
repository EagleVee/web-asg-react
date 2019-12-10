import axios from "axios";
import * as qs from "query-string";

import {
  API_ENDPOINT,
  REQUEST_TIME_OUT,
  STATUS_BAD_REQUEST,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_UNAUTHORIZED
} from "../Config/Remote";

const instance = axios.create({
  baseURL: API_ENDPOINT,
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
  setAccessToken: accessToken => {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  getConversationList: (params = { paginate: 10, page: 1 }) => {
    const path = "/conversation";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getMessageList: (uuid, params = { paginate: 10, page: 1 }) => {
    const path = "/messages/" + uuid;
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  addMessage: messageData => {
    const path = "/message";
    return POST(path, messageData);
  },
  getBrandList: () => {
    const path = "/brand";
    return GET(path);
  },
  getPostList: (params = { brand_uuid: "0", paginate: 10, page: 1 }) => {
    const path = "/post";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  getPostDetail: (uuid, params) => {
    const path = "/post/" + uuid;
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  updatePost: (uuid, data) => {
    const path = "/post/" + uuid;
    return POST(path, data);
  },
  deletePost: uuid => {
    const path = "/post/" + uuid;
    return DELETE(path);
  },
  getCommentList: (uuid, params) => {
    const path = "/comment/" + uuid;
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  addComment: data => {
    const path = "/comment";
    return POST(path, data, {});
  },
  addLike: data => {
    const path = "/like";
    return POST(path, data, {});
  },
  addPost: postData => {
    const path = "/post";
    return POST(path, postData, {});
  },
  getNotifications: params => {
    const path = "/notifications";
    const queryString = qs.stringify(params);
    return GET(path + "?" + queryString);
  },
  setSeenNotification: params => {
    const path = "/notification/seen";
    return POST(path, params);
  }
};

export default API;
