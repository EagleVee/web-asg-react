// export const API_ENDPOINT = (process.env.ENVIRONMENT === 'proxy-local')
//   ? 'https://cors-anywhere.herokuapp.com/http://165.22.49.37/api'
//   : 'http://165.22.49.37/api'
export const API_ENDPOINT =
  process.env.REACT_APP_ENVIRONMENT === "local"
    ? process.env.REACT_APP_API_ENDPOINT_LOCAL
    : process.env.REACT_APP_API_ENDPOINT;
export const API_PUSHER_ENDPOINT = process.env.REACT_APP_API_PUSHER;
console.log(API_ENDPOINT);
export const REQUEST_TIME_OUT = 30000;
export const STATUS_OK = 200;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 410;
export const STATUS_NOT_FOUND = 404;
export const STATUS_INTERNAL_SERVER_ERROR = 500;
export const STATUS_BAD_GATEWAY = 502;
export const STATUS_GATE_WAY_TIMEOUT = 504;
