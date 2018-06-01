<template>
  <div id="app">
    {{name}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'vic'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #app {
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }

  #cover {
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>
