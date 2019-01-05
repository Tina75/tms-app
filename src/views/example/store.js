import Server from '@/libs/server'
export default{
  state: {
    news: {
      list: [],
      startPage: 1,
      totalPages: 1
    }
  },
  mutations: {
    NEWS (state, payload) {
      state.news.startPage++
      state.news.list = state.news.list.concat(payload.hits)
      state.news.totalPages = payload.nbPages
    },
    NEWS_CLEAR (state) {
      state.news = { list: [], startPage: 1, totalPages: 1 }
    }
  },
  actions: {
    getNews: ({ commit, state }, payload) => {
      return Server({
        method: 'get',
        url: 'search_by_date',
        params: {
          tags: 'story',
          page: state.news.startPage
        }
      }).then((response) => {
        commit('NEWS', response.data)
        // resolve(response)
      })
    }
  },
  getters: {
    News: (state) => state.news
  }
}
