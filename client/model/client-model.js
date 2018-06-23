/**
 * 基础的 API 封装，供 action 消费
**/
import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  // 在客户端默认是同域的情况下，可以省略主机名。但是在服务器端没有这样的概念，所以要写全（但是目测 / 也是可以的）
  baseURL: '/'
  // baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333/' : '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (!data) {
        return reject(createError(400, 'no data'))
      }
      if (!data.success) {
        return reject(createError(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      const resp = err.response
      if (resp.status === 401) {
        reject(createError(401, 'need auth'))
      }
    })
  })
}

export default {
  getAllTodos() {
    return handleRequest(request.get('/api/todos'))
  },
  login(username, password) {
    return handleRequest(request.post('/user/login', { username, password }))
  },
  updateTodo(id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo(todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  deleteTodo(id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted(ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
