<template>
	<footer>
		<div class="copyright">
			&copy; 2016 - {{(new Date()).getFullYear()}} | WyvonJ | Fang G | <a href="mailto:wyvonj@gmail.com">wyvonj@gmail.com</a> | JNUDM
		</div>
	</footer>
</template>

<style lang="sass" rel="stylesheet/scss">
	footer{
		position: absolute;
		width: 100%;
		bottom: 0;
		div.copyright{
			text-align: center;
			color: #aaa;
			font-weight: 100;
			font-size: 12px;
			height: 18px;
			border-top: 1px solid #ddd;
			transition: all .8s cubic-bezier(.1,.1,.4,1);
			a{
				text-decoration: none !important;
				color: #aaa !important;
			}
		}
	}
</style>