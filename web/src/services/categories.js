import request from '../utils/request';

export const fetch = async () => {
  return request('/api/categories')
}
