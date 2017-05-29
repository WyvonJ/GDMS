<template>
  <div class="Wyvonj-snackbar" :class="[themeClass, classes]" :id="snackbarId" @mouseenter="pauseTimeout" @mouseleave="resumeTimeout">
    <div class="Wyvonj-snackbar-container" ref="container">
      <div class="Wyvonj-snackbar-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template> 

<style lang="sass" src="./WyvonjSnackbar.scss"></style>

<script>
  import transitionEvent from '../tooltip/transitionEvent'
  import manager from './manager'
  import theme from '../../core/components/mdTheme/mixin';

const uniqueId = () => {
  return Math.random().toString(36).slice(4)
}
  export default {
    props: {
      id: [String, Number],
      WjPosition: {
        type: String,
        default: 'top right'
      },
      WjDuration: {
        type: [String, Number],
        default: 4000
      }
    },
    mixins: [theme],
    data() {
      return {
        snackbarId: this.id || 'snackbar-' + uniqueId(),
        active: false,
        rootElement: {},
        snackbarElement: {},
        directionClass: null,
        closeTimeout: null
      }
    },
    computed: {
      classes() {
        let cssClasses = {
          'wyvonj-active': this.active
        }

        this.directionClass = this.WjPosition.replace(/ /g, '-')

        cssClasses['wyvonj-position-' + this.directionClass] = true

        return cssClasses
      }
    },
    watch: {
      active(active) {
        const directionClass = 'wyvonj-has-toast-' + this.directionClass
        const toastClass = 'wyvonj-has-toast'

        if (active) {
          document.body.classList.add(directionClass)
          document.body.classList.add(toastClass)
        } else {
          document.body.classList.remove(directionClass)
          document.body.classList.remove(toastClass)
        }
      }
    },
    methods: {
      removeElement() {
        if (document.body.contains(this.snackbarElement)) {
          const activeRipple = this.snackbarElement.querySelector('.wyvonj-ripple.Wyvonj-active')

          if (activeRipple) {
            activeRipple.classList.remove('wyvonj-active')
          }

          document.body.removeChild(this.snackbarElement)
        }
      },
      open() {
        if (manager.current) {
          manager.current.close()
        }

        manager.current = this
        document.body.appendChild(this.snackbarElement)
        window.getComputedStyle(this.$refs.container).backgroundColor
        this.active = true
        this.$emit('open')
        this.closeTimeout = window.setTimeout(this.close, this.WjDuration)
        this.timeoutStartedAt = Date.now()
      },
      close() {
        if (this.$refs.container) {
          const removeElement = () => {
            this.$refs.container.removeEventListener(transitionEvent, removeElement)
            this.removeElement()
          }

          manager.current = null
          this.active = false
          this.$emit('close')
          this.$refs.container.removeEventListener(transitionEvent, removeElement)
          this.$refs.container.addEventListener(transitionEvent, removeElement)
          window.clearTimeout(this.closeTimeout)
          this.pendingDuration = this.WjDuration
        }
      },
      pauseTimeout() {
        this.pendingDuration = this.pendingDuration - (Date.now() - this.timeoutStartedAt)
        this.timeoutStartedAt = 0
        window.clearTimeout(this.closeTimeout)
      },
      resumeTimeout() {
        this.timeoutStartedAt = Date.now()
        this.closeTimeout = window.setTimeout(this.close, this.pendingDuration)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.snackbarElement = this.$el
        this.snackbarElement.parentNode.removeChild(this.snackbarElement)
        this.timeoutStartedAt = 0
        this.pendingDuration = this.WjDuration
      })
    },
    beforeDestroy() {
      window.clearTimeout(this.closeTimeout)
      this.removeElement()
    }
  }
</script>
