import request from '../utils/request'

export const fetch = () => {
  return request('/api/members')
}