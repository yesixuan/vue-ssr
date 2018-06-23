// 这里引入的 model 是通过webapck 动态配置的引用文件
import model from 'model'
import notify from '../../components/notification/function'

const handleError = err => {
  if (err.code === 401) {
    notify({
      content: '请先登录'
    })
  }
}

export default {
  fetchTodos({ commit }) {
    return model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  },
  addTodo({ commit }, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        notify({ content: '你又多了件事要做' })
      })
      .catch(err => {
        handleError(err)
      })
  },
  updateTodo({ commit }, { id, todo }) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
      })
      .catch(err => {
        handleError(err)
      })
  },
  deleteTodo({ commit }, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({ content: '你又少了件事要做' })
      })
      .catch(err => {
        handleError(err)
      })
  },
  deleteAllCompleted({ commit, state }) {
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllTodo', ids)
      })
      .catch(err => {
        handleError(err)
      })
  },
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          resolve(data)
        })
    })
  }
}
