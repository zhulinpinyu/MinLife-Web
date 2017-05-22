import * as membersService from '../services/members'

export default {
  namespace: 'members',
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
      const { data } = yield call(membersService.fetch)
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
