import * as GithubAPI from '../services/github';

export default {
  namespace: 'feeds',
  state: {
    data: [],
    syncLoading: false,
    syncStatus: '',
  },
  reducers: {
    'sync/start' (state, action) {
      return { ...state, syncLoading: true, syncStatus: action.payload };
    },

    'sync/save' (state, action) {
      return { ...state, data: action.data };
    },

    'sync/end' (state) {
      return { ...state, syncLoading: false, syncStatus: '' }
    }
  },
  effects: {
    *sync(action, { select, put, call }) {

      const { username,  password } = yield select(state => state.user);
      const { current_user_url } = yield call(GithubAPI.fetchFeeds, username, password);
      const token = /atom\?token=([^&]+)/.exec(current_user_url)[1] || null;
      const xml = yield call(GithubAPI.fetchPrivateFeeds, username, token);

      console.log(xml);
    },
  },
  subscriptions: {},
};
