import request from '../utils/request';
import * as Common from './common'

const CATEGORY_URL = '/api/categories'

export const fetch = () => {
  return request(CATEGORY_URL)
}

export const remove = (id) => {
  return Common.remove(`${CATEGORY_URL}/${id}`)
}

export const create = (values) => {
  return Common.create(CATEGORY_URL, values)
}
