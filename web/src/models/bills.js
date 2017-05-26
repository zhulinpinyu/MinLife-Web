import * as billsService from '../services/bills'

export default {
  namespace: 'bills',
  state: {
    list: []
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(billsService.fetch)
      yield put({
        type: 'save',
        payload: { data }
      })
    },
    *load(action, { put }) {
      yield put({ type: 'fetch' })
      yield put({ type: 'categories/fetch' })
      yield put({ type: 'accounts/fetch' })
      yield put({ type: 'members/fetch' })
    },
    *create({ payload: values }, { call, put }) {
      yield call(billsService.create, values)
      yield put({ type: 'fetch' })
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(billsService.patch, { id, values })
      yield put({ type: 'fetch' })
    },
    *remove({ payload: id }, { call, put }) {
      yield call(billsService.remove, id)
      yield put({ type: 'fetch' })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'load' })
        }
      })
    }
  },
};
