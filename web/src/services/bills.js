import request from '../utils/request'

import * as Common from './common'

const BILL_URL = '/api/bills'

export const fetch = () => {
  return request(BILL_URL)
}

export const create = (values) => {
  return Common.create(BILL_URL, values)
}

export const patch = ({ id, values }) => {
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = (id) => {
  return Common.remove(`${BILL_URL}/${id}`)
}
