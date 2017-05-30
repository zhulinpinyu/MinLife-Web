import request from '../utils/request'
import * as Accounts from './accounts'
import * as Common from './common'

const BILL_URL = '/api/bills'

export const fetch = () => {
  return request(BILL_URL)
}

export const fetchById = (id) => {
  return request(`${BILL_URL}/${id}`)
}

export const create = (values) => {
  updateAccount(values)
  return Common.create(BILL_URL, values)
}

export const patch = ({ id, values }) => {
  rollBackAndUpdateAccount({ id, values })
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = (id) => {
  return Common.remove(`${BILL_URL}/${id}`)
}

const updateAccount = async ({ account_id, money }) => {
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)
  Accounts.patch({
    id: account_id,
    values: {
      balance: debt ? (balance + money) : (balance - money)
    }
  })
}

const rollBackAndUpdateAccount = async ({ id: bill_id, values }) => {
  const { data: { account_id, money } } = await fetchById(bill_id)
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)
  // Rollback account balance
  await Accounts.patch({
    id: account_id,
    values: {
      balance: debt ? (balance - money) : (balance + money)
    }
  })
  // Update Account Balance
  updateAccount(values)
}
