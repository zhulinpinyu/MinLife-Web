import request from '../utils/request'

const MEMBER_URL = '/api/members'

export const fetch = () => {
  return request(MEMBER_URL)
}
