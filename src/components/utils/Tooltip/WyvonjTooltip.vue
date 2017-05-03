<template>
	<span class="wyvonj-tooltip" :class="classes" :style="style">
		<slot></slot>
	</span>
</template>

<script type="text/javascript">
	import transitionEvent from './transitionEvent'

	export default {
		props:{
			direction:{
				type:String,
				default:'top'
			},
			delay:{
				type:String,
				default:'0'
			}
		},
		data: ()=>({
				active:false,
				parentClass: null,
				transitionOff:false,
				topPosition:false,
				leftPosition:false
		}),
		computed:{
			classes(){
				const cssClasses={
					'wyvonj-active':this.active,
					'wyvonj-transition-off': this.transitionOff,
          'wyvonj-tooltip-top': this.direction === 'top',
          'wyvonj-tooltip-right': this.direction === 'right',
          'wyvonj-tooltip-bottom': this.direction === 'bottom',
          'wyvonj-tooltip-left': this.direction === 'left'
				}
				if (this.parentClass) {
					cssClasses[this.parentClass]=true
				}
				return cssClasses
			},
			style(){
				return {
					'transition-delay':this.delay+'ms',
					top:this.topPosition+'px',
					left:this.leftPosition+'px'
				}
			}
		},
		watch:{
			direction(){
				this.calcPosition()
			}
		},
		methods:{
			removeTooltips(){
				if (this.tooltipElement.parentNode) {
					this.tooltipElement.removeEventListener(transitionEvent,this.removeTooltips)
					this.tooltipElement.parentNode.removeChild(this.tooltipElement)
				}
			},
			calcPosition(){
				let pos=this.parentElement.getBoundingClientRect()
				let cssPos={}
				switch (this.direction) {
          case 'top':
            cssPos.top = pos.top - this.$el.offsetHeight
            cssPos.left = pos.left + pos.width / 2
            break
          case 'right':
            cssPos.top = pos.top
            cssPos.left = pos.left + pos.width
            break
          case 'bottom':
            cssPos.top = pos.bottom
            cssPos.left = pos.left + pos.width / 2
            break;
          case 'left':
            cssPos.top = pos.top
            cssPos.left = pos.left - this.$el.offsetWidth
            break
          default:
            console.warn(`Invalid direction option to direction option`)
        }
        this.topPosition=cssPos.top
        this.leftPosition=cssPos.left
			},
			generateTooltipClasses(){
				let classes=[]
				this.parentElement.classList.forEach((cssClass)=>{
					if(cssClass.indexOf('wyvonj-')>=0 && cssClass!=='wyvonj-active'){
						classes.push(cssClass+'-tooltip')
					}
				})
				this.parentClass=classes.join(' ')
			},
			open(){
				this.removeTooltips()
				this.$nextTick(()=>{
					document.body.appendChild(this.tooltipElement)
					getComputedStyle(this.tooltipElement).top
					this.transitionOff=true
					this.generateTooltipClasses()
          this.calcPosition()

          window.setTimeout(() => {
            this.transitionOff = false
            this.active = true
          }, 10)
				})
			},
			close(){
				 this.active = false
        this.tooltipElement.removeEventListener(transitionEvent, this.removeTooltips)
        this.tooltipElement.addEventListener(transitionEvent, this.removeTooltips)
			}
		},
    mounted() {
      this.$nextTick(() => {
        this.tooltipElement = this.$el
        this.parentElement = this.tooltipElement.parentNode
        this.$el.parentNode.removeChild(this.$el)
        this.parentElement.addEventListener('mouseenter', this.open)
        this.parentElement.addEventListener('focus', this.open)
        this.parentElement.addEventListener('mouseleave', this.close)
        this.parentElement.addEventListener('blur', this.close)
      })
    },
    beforeDestroy() {
      this.active = false
      this.removeTooltips()
      if (this.parentElement) {
        this.parentElement.removeEventListener('mouseenter', this.open)
        this.parentElement.removeEventListener('focus', this.open)
        this.parentElement.removeEventListener('mouseleave', this.close)
        this.parentElement.removeEventListener('blur', this.close)
      }
    }
	}
</script>

<style lang="sass" src="./WyvonjTooltip.scss">
</style>