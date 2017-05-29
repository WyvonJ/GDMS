<script>
  export default {
    props: {
      tag: String,
      wjname: {
        type: String,
        default: 'default'
      }
    },
    data: () => ({
      name: 'md-theme'
    }),
    render(render) {
      if (this.tag || this.$slots.default.length > 1) {
        return render(this.tag || 'div', {
          staticClass: 'md-theme'
        }, this.$slots.default);
      }

      return this.$slots.default[0];
    }
  };
</script>
