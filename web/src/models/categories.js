import * as categoryService from '../services/categories'

export default {
  namespace: 'categories',
  state: {
    list: [],
    total: null
  },
  reducers: {
    save(state, { payload: { data: list } }) {
      return { ...state, list }
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(categoryService.fetch)
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
        if (pathname === '/categories') {
          dispatch({
            type: 'fetch',
            payload: query
          })
        }
      })
    }
  },
};
