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
  await rollbackAndUpdateAccount({ id, values })
  return Common.patch(`${BILL_URL}/${id}`, values)
}

export const remove = async (id) => {
  await rollbackAccount(id)
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
  // 转账可以分解为payment和income 只需配置对应参数即可
  const {
    payment_account_id,
    income_account_id,
    money
  } = values
  await updatePaymentAccount({ account_id: payment_account_id, money })
  await updateIncomeAccount({ account_id: income_account_id, money })
}

const rollbackAccount = async (bill_id) => {
  const { data: bill } = await fetchById(bill_id)
  // Rollback account balance
  switch (bill.type) {
    case 'PAYMENT':
      await rollbackPaymentAccount(bill)
      break
    case 'INCOME':
      await rollbackIncomeAccount(bill)
      break
    case 'TRANSFER':
      await rollbackTransferAccount(bill)
      break
    default:
      break
  }
}

const rollbackPaymentAccount = async (bill) => {
  const { account_id, money } = bill
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)

  await Accounts.patch({
    id: account_id,
    values: {
      balance: debt ? (balance - money) : (balance + money)
    }
  })
}

const rollbackIncomeAccount = async (bill) => {
  const { account_id, money } = bill
  const { data: { balance } } = await Accounts.fetchById(account_id)

  await Accounts.patch({
    id: account_id,
    values: {
      balance: (balance - money)
    }
  })
}

const rollbackTransferAccount = async (bill) => {
  const {
    payment_account_id,
    income_account_id,
    money
  } = bill

  await rollbackIncomeAccount({ account_id: income_account_id, money })
  await rollbackPaymentAccount({ account_id: payment_account_id, money })
}

const rollbackAndUpdateAccount = async ({ id: bill_id, values }) => {
  const { type } = values

  // Rollback account balance
  await rollbackAccount(bill_id)

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
