import request from '../utils/request'

export const create = (url, body) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(body)
  })
}

export const patch = (url, body) => {
  return request(url, {
    method: 'PATCH',
    body: JSON.stringify(body)
  })
}

export const remove = (url) => {
  return request(url, {
    method: 'DELETE'
  })
}
