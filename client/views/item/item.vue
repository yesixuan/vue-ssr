<template>
  <h1>{{ item.title }}</h1>
</template>

<script>
  export default {
    name: 'item',
    asyncData ({ store, route }) {
      return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
      item () {
        return this.$store.state.item
      }
    }
  }
</script>

<style scoped>

</style>
