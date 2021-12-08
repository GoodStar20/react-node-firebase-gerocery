import axios from 'axios';

const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR_CODE';
const NETWORK_ERROR = 'Network Error';

const BASEURL = process.env.REACT_APP_API_URL;

function ApiError({ code = UNKNOWN_ERROR_CODE, message = NETWORK_ERROR, status, fields }) {
  this.name = 'ApiError';
  this.code = code;
  this.message = message;
  this.fields = fields;
  this.status = status;
  this.stack = new Error().stack;
}
ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

export const api = axios.create({
  baseURL: BASEURL,
  headers: {
    'content-type': 'application/json',
  },
});

async function request({ method = 'get', url, params, data, cancelToken }) {
  try {
    const response = await api.request({
      method,
      url,
      params,
      data,
      cancelToken,
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw new ApiError({});
    }
    if (error.response.data) {
      throw new ApiError(error.response.data);
    }
    throw new ApiError({ code: error.response.status });
  }
}

export function get(url, params, cancelToken) {
  return request({
    method: 'get',
    url,
    params,
    cancelToken,
  });
}

export function post(url, data, cancelToken) {
  return request({
    method: 'post',
    url,
    data,
    cancelToken,
  });
}

export function put(url, data, cancelToken) {
  return request({
    method: 'put',
    url,
    data,
    cancelToken,
  });
}

export function patch(url, data, cancelToken) {
  return request({
    method: 'patch',
    url,
    data,
    cancelToken,
  });
}

export function remove(url, data, cancelToken) {
  return request({
    method: 'delete',
    url,
    data,
    cancelToken,
  });
}
