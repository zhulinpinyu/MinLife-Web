import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  checkStatus(response)
  const data = await response.json()
  return { data }
}

export default request
