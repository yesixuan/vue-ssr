<script type="text/jsx">
  export default {
    name: 'tabs',
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    render() {
      return (
        <div class="tabs">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
        </div>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tab-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
