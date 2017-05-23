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
