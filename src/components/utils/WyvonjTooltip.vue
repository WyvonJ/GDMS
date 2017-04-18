<template>
	<div class="wyvonj-tooltip" :class="classes" :style="style">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	import transitionEvent from './js/transitionEvent'

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
		data(){
			return {
				active:false,
				parentClass: null,
				transitionOff:false,
				topPosition:false,
				leftPosition:false
			}
		},
		computed:{
			classes(){
				const cssClasses={
					'wj-active':this.active,
					'wj-transition-off': this.transitionOff,
          'wj-tooltip-top': this.direction === 'top',
          'wj-tooltip-right': this.direction === 'right',
          'wj-tooltip-bottom': this.direction === 'bottom',
          'wj-tooltip-left': this.direction === 'left'
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
					this.tooltipElement.parentNode.removeTooltips(this.tooltipElement)
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
            console.warn(`Invalid ${this.direction} option to direction option`)
        }
        this.topPosition=cssPos.top
        this.leftPosition=cssPos.left
			},
			generateTooltipClasses(){
				let classes=[]
				[...this.parentElement.classList].forEach((cssClass)=>{
					if(cssClass.indexOf('wj-')>=0&&cssClass!=='wj-active'){
						classes.push(cssClass+'tooltip')
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
				})
			}
		}
	}
</script>