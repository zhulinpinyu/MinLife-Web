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

export const create = async (values) => {
  const { type } = values
  switch (type) {
    case 'PAYMENT':
      await updatePaymentAccount(values)
      break
    case 'INCOME':
      await updateIncomeAccount(values)
      break
    case 'TRANSFER':
      await updateTransferAccount(values)
      break
    default:
      break
  }

  return Common.create(BILL_URL, values)
}

export const patch = async ({ id, values }) => {
  await rollBackAndUpdateAccount({ id, values })
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = async (id) => {
  await rollBackAccount(id)
  return Common.remove(`${BILL_URL}/${id}`)
}

const updatePaymentAccount = async ({ account_id, money }) => {
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)
  await Accounts.patch({
    id: account_id,
    values: {
      balance: debt ? (balance + money) : (balance - money)
    }
  })
}

const updateIncomeAccount = async (values) => {
  console.log(values)
}

const updateTransferAccount = async (values) => {
  console.log(values)
}

const rollBackAccount = async (bill_id) => {
  const { data: { account_id, money } } = await fetchById(bill_id)
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)
  // Rollback account balance
  await Accounts.patch({
    id: account_id,
    values: {
      balance: debt ? (balance - money) : (balance + money)
    }
  })
}

const rollBackAndUpdateAccount = async ({ id: bill_id, values }) => {
  // Rollback account balance
  await rollBackAccount(bill_id)
  // Update Account Balance
  await updatePaymentAccount(values)
}
