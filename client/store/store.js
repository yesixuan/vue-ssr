import Vuex from 'vuex'
import actions from './actions/actions'
import mutations from './mutations/mitations'

const items = {
  id_1: {
    title: 'id_1 title'
  },
  id_2: {
    title: 'id_2 title'
  }
}

function fetchItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items[id])
    }, 2000)
  })
}

export default () => {
  return new Vuex.Store({
    state: {
      count: 0,
      todos: [],
      item: {}
    },
    mutations: {
      setItem(state, {item}) {
        state.item = item
      },
      updateCount(state, num) {
        state.count = num
      },
      ...mutations
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      },
      ...actions
    },
  })
}
