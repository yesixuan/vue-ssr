<template>
  <div id="app">
    <div id="cover"></div>
    <span>{{count}}</span>
    <Header></Header>
    <!--<Tabs value="1">-->
      <!--<Tab label="tab1" index="1"></Tab>-->
      <!--<Tab index="2">-->
        <!--<span slot="label" style="color: red">tab2</span>-->
      <!--</Tab>-->
      <!--<Tab label="tab3" index="3"></Tab>-->
    <!--</Tabs>-->
    <router-view></router-view>
    <button @click="notify">notify</button>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/header.vue'
  import Footer from './layout/footer.jsx'
  import Todo from './views/todo/todo.vue'

  export default {
    metaInfo: {
      title: 'Vic\'s Todo App'
    },
    components: {
      Header,
      Footer,
      Todo,
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    },
    mounted() {},
    methods: {
      notify() {
        this.$notify({
          content: 'hehe',
          btn: 'close'
        })
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


