import Server from '@/libs/Server'
export default{
  state: {
    news: {
      list: [],
      startPage: 1,
      totalPages: 1
    }
  },
  mutations: {
    news (state, payload) {
      state.news.startPage++
      state.news.list = state.news.list.concat(payload.hits)
      state.news.totalPages = payload.nbPages
    },
    newsClear (state) {
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
        commit('news', response.data)
        // resolve(response)
      })
    }
  },
  getters: {
    News: (state) => state.news
  }
}
