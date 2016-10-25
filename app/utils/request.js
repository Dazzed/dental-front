import 'whatwg-fetch';

import { getItem } from 'utils/localStorage';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options = {}) {
  const authToken = getItem('auth_token');
  const headers = { Accept: 'application/json' };
  const opts = Object.assign({}, options);

  if (authToken) {
    headers.Authorization = `JWT ${authToken}`;
  }

  opts.headers = Object.assign({}, options.headers, headers);

  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => data);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON (response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {objct} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkStatus (response) {
  if (response.ok) { // response.status >= 200 && response.status < 300
    return response;
  } else if (response.status === 400 || response.status === 403) {
    return response.json().then(err => {
      throw err;
    });
  }

  const error = new Error('Request endpoint Error');
  error.res = response;

  throw error;
}
