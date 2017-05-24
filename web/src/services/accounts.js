import request from '../utils/request'

import * as Common from './common'

const ACCOUNT_URL = '/api/accounts'

export const fetch = () => {
  return request(ACCOUNT_URL)
}

export const create = (values) => {
  return Common.create(ACCOUNT_URL, values)
}

export const patch = (id, values) => {
  return Common.patch(`${ACCOUNT_URL}/${id}`, values)
}

export const remove = (id) => {
  return Common.remove(`${ACCOUNT_URL}/${id}`)
}
