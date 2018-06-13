import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
import Item from '../views/item/item.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/item/:id',
    component: Item
  }
]
