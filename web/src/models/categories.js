import * as categoryService from '../services/categories'

export default {
  namespace: 'categories',
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
      const { data } = yield call(categoryService.fetch)
      yield put({
        type: 'save',
        payload: {
          data
        }
      })
    },
    *remove({ payload: id }, { call, put }) {
      yield call(categoryService.remove, id)
      yield put({
        type: 'fetch'
      })
    },
    *create({ payload: values }, { call, put }) {
      yield call(categoryService.create, values)
      yield put({
        type: 'fetch'
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          dispatch({
            type: 'fetch',
            payload: query
          })
        }
      })
    }
  },
};
