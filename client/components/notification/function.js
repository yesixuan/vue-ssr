import Vue from 'vue'
import Component from './func-nitification'

const instances = []
let seed = 1

const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

// 返回一个 Vue 的子类
const NotificationConstructor = Vue.extend(Component)

const notify = options => {
  if (Vue.prototype.$isServer) return

  const { autoClose, ...rest } = options

  const instance = new NotificationConstructor({
    propsData: { ...rest },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  // 生成带有 DOM 节点的 Vue 实例
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除 DOM 节点
    instance.vm.$destroy() // 销毁 Vue 实例
  })

  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
