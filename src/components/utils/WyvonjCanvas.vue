<template>
  <canvas id="canvas"></canvas> 
	
</template>

<script type="text/javascript">
	export default{
		data(){
			return {

			}
		},
		methods:{},
		mounted(){
      let cvs = document.getElementById('canvas')
      let cxt = cvs.getContext('2d')
      let circleArr = []
			const WIDTH = cvs.parentNode.clientWidth
      const HEIGHT = cvs.parentNode.clientHeight
      const POINT = 30
      
      cvs.width = WIDTH
      cvs.height = HEIGHT
      cxt.strokeStyle = 'rgba(123,152,196,0.8)'
      cxt.strokeWidth = 3
      cxt.fillStyle = 'rgba(121,134,203,0.3)'
      function Line(x, y, _x, _y, o) {
        this.beginX = x
        this.beginY = y
        this.closeX = _x
        this.closeY = _y
        this.o = o
      }
      //点：圆心xy坐标，半径，每帧移动xy的距离
      function Circle(x, y, r, moveX, moveY) {
        this.x = x
        this.y = y
        this.r = r
        this.moveX = moveX
        this.moveY = moveY
      }
      function num(max, _min) {
        let min = arguments[1] || 0
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      // 绘制原点
      function drawCricle(cxt, x, y, r, moveX, moveY) {
        let circle = new Circle(x, y, r, moveX, moveY)
        cxt.beginPath()
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
        cxt.closePath()
        cxt.fill()
        return circle
      }
      function drawLine(cxt, x, y, _x, _y, o) {
        let line = new Line(x, y, _x, _y, o)
        cxt.beginPath()
        cxt.strokeStyle = 'rgba(196,193,216,' + o + ')'
        cxt.moveTo(line.beginX, line.beginY)
        cxt.lineTo(line.closeX, line.closeY)
        cxt.closePath()
        cxt.stroke()
      }
      function init() {
        circleArr = []
        for (let i = 0; i < POINT; i++) {
          circleArr.push(drawCricle(cxt, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10) / 40, num(10, -10) / 40))
        }
        draw()
      }
      //每帧绘制
      function draw() {
        cxt.clearRect(0, 0, cvs.width, cvs.height);
        for (let i = 0; i < POINT; i++) {
          drawCricle(cxt, circleArr[i].x, circleArr[i].y, circleArr[i].r)
        }
        for (let i = 0; i < POINT; i++) {
          for (let j = 0; j < POINT; j++) {
            if (i + j < POINT) {
              let A = Math.abs(circleArr[i + j].x - circleArr[i].x)
              let B = Math.abs(circleArr[i + j].y - circleArr[i].y)
              let lineLength = Math.sqrt(A * A + B * B)
              let C = 1 / lineLength * 7 - 0.009
              let lineOpacity = C > 0.4 ? 0.44 : C
              if (lineOpacity > 0) {
                drawLine(cxt, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity)
              }
            }
          }
        }
      }
        init()
        setInterval(function() {
          for (let i = 0; i < POINT; i++) {
            //边界检测
            let cir = circleArr[i]
            cir.x += cir.moveX
            cir.y += cir.moveY
            if (cir.x > WIDTH)
              cir.x = 0
            else if (cir.x < 0)
              cir.x = WIDTH
            if (cir.y > HEIGHT)
              cir.y = 0
            else if (cir.y < 0)
              cir.y = HEIGHT
          }
          draw()
        }, 16)
		}
	}
</script>

<style type="text/css" scoped>
  #canvas{

  width: 100%;
  height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
