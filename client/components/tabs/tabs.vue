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
