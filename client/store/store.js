import Vuex from 'vuex'
import actions from './actions/actions'
import mutations from './mutations/mitations'

export default () => {
  return new Vuex.Store({
    state: {
      count: 0,
      todos: []
    },
    mutations: {
      updateCount(state, num) {
        state.count = num
      },
      ...mutations
    },
    actions,
  })
}
