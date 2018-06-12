<template>
  <div>
    <form class="login-form" @submit="doSubmit">
      <h1>
        <span>login</span>
        <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
      </h1>
      <input
        type="text"
        class="login-input"
        placeholder="User Name"
        v-model="username"
      >
      <input
        type="password"
        class="login-input"
        placeholder="Password"
        v-model="password"
      >
      <button type="submit" class="login-btn">登录</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    metaInfo: {
      title: 'Login Page'
    },
    data() {
      return {
        username: '',
        password: '',
        errorMsg: ''
      }
    },
    methods: {
      doSubmit(e) {
        e.preventDefault()
        if (this.validate()) {

        }
      },
      validate() {
        if (!this.username.trim()) {
          this.errorMsg = '姓名不能为空'
          return false
        }
        if (!this.password.trim()) {
          this.errorMsg = '密码不能为空'
          return false
        }
        this.errorMsg = ''
        return true
      }
    }
  }
</script>

<style scoped>

</style>
