import request from '../utils/request'

export const create = (url, body) => {
  // Format Date moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") //"2017-05-25 22:23:07"
  return request(url, {
    method: 'POST',
    body: JSON.stringify({ ...body, created_at: Date.now(), updated_at: Date.now() })
  })
}

export const patch = (url, body) => {
  return request(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...body, updated_at: Date.now() })
  })
}

export const remove = (url) => {
  return request(url, {
    method: 'DELETE'
  })
}
