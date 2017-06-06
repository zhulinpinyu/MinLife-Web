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
  console.log(values)
}

const rollBackAccount = async (bill_id) => {
  const { data: { type, account_id, money } } = await fetchById(bill_id)
  const { data: { debt, balance } } = await Accounts.fetchById(account_id)
  // Rollback account balance
  let newBalance = balance
  switch (type) {
    case 'PAYMENT':
      newBalance = debt ? (balance - money) : (balance + money)
      break
    case 'INCOME':
      newBalance = balance - money
      break
    case 'TRANSFER':
      // await rollBackTransferAccount(values)
      // 转账rollBack也需分解为两个操作 分别为回滚支出账户也就是PAYMENT；回滚转入账户也就是INCOME；
      //  需要做的就是再次重构账户rollback函数
      break
    default:
      break
  }

  await Accounts.patch({
    id: account_id,
    values: {
      balance: newBalance
    }
  })
}

const rollBackAndUpdateAccount = async ({ id: bill_id, values }) => {
  const { type } = values

  // Rollback account balance
  await rollBackAccount(bill_id)

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
