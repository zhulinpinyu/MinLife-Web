import request from '../utils/request'
import * as Accounts from './accounts'
import * as Common from './common'

const BILL_URL = '/api/bills'

export const fetch = () => {
  return request(BILL_URL)
}

export const create = (values) => {
  updateAccount(values)
  return Common.create(BILL_URL, values)
}

export const patch = ({ id, values }) => {
  updateAccount(values)
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = (id) => {
  return Common.remove(`${BILL_URL}/${id}`)
}

const updateAccount = async ({ account_id, money }) => {
  const { data: account } = await Accounts.fetchById(account_id)
  const { debt, balance } = account
  let newBalance = balance
  if (debt) {
    newBalance += money
  } else {
    newBalance -= money
  }
  Accounts.patch({
    id: account_id,
    values: {
      ...newBalance,
      balance: newBalance
    }
  })
}
