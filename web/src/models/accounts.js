import * as accountsService from '../services/accounts'

export default {
  namespace: 'accounts',
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
      const { data } = yield call(accountsService.fetch)
      yield put({
        type: 'save',
        payload: {
          data
        }
      })
    },
    *remove({ payload: id }, { call, put }) {
      yield call(accountsService.remove, id)
      yield put({ type: 'fetch' })
    },
    *create({ payload: values }, { call, put }) {
      yield call(accountsService.create, values)
      yield put({ type: 'fetch' })
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(accountsService.patch, { id, values })
      yield put({ type: 'fetch' })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/account') {
          dispatch({
            type: 'fetch',
            payload: query
          })
        }
      })
    }
  }
};
