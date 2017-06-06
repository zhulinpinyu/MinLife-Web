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
      return Common.create(BILL_URL, values)
    case 'INCOME':
      await updateIncomeAccount(values)
      return Common.create(BILL_URL, values)
    case 'TRANSFER':
      await updateTransferAccount(values)
      break
    default:
      break
  }
}

export const patch = async ({ id, values }) => {
  await rollBackAndUpdateAccount({ id, values })
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = async (id) => {
  await rollBackPaymentAccount(id)
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

const updateIncomeAccount = async ({ account_id, money }) => {
  const { data: { balance } } = await Accounts.fetchById(account_id)
  await Accounts.patch({
    id: account_id,
    values: {
      balance: (balance + money)
    }
  })
}

const updateTransferAccount = async (values) => {
  console.log(values)
}

const rollBackPaymentAccount = async (bill_id) => {
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

const rollBackIncomeAccount = async (bill_id) => {
  const { data: { account_id, money } } = await fetchById(bill_id)
  const { data: { balance } } = await Accounts.fetchById(account_id)
  // Rollback account balance
  await Accounts.patch({
    id: account_id,
    values: {
      balance: (balance - money)
    }
  })
}

const rollBackAndUpdateAccount = async ({ id: bill_id, values }) => {
  const { type } = values

  // Rollback account balance
  switch (type) {
    case 'PAYMENT':
      await rollBackPaymentAccount(bill_id)
      break
    case 'INCOME':
      await rollBackIncomeAccount(bill_id)
      break
    case 'TRANSFER':
      // await rollBackTransferAccount(values)
      break
    default:
      break
  }

  // Update Account Balance
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
}
