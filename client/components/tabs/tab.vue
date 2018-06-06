<script type="text/jsx">
  export default {
    name: 'tab',
    props: {
      index: {
        type: [String, Number],
        required: true
      },
      label: {
        type: [String],
        default: 'tab'
      }
    },
    computed: {
      active() {
        return false
      }
    },
    render() {
      const tab = this.$slots.label || <span>{this.label}</span>
      const classNames = {
        tab: true,
        active: this.active
      }
      return (
        <li class={classNames}>
          {tab}
        </li>
      )
    }
  }
</script>

<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer

    &.active
      border-bottom 2px solid blue

    &:last-child
      margin-right 0
</style>
