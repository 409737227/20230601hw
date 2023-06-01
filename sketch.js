// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10]
// ]


// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[-2, 0], [-1,1], [-1, 3],[-2,2],[-3,2],[-4,3],[-4,1],[-3,0],[-3,-1],[-4,-2],[-3,-2],[-2,-1],[-2,-2],[-1,-2],[-1,-1],[1,-1],[1,-2],[2,-2],[2,-1],[3,-2],[4,-2],[2,1],[4,3],[3,3],[1,1],[-1,1],[-2,0],]; //list資料，

var fill_colors = "03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8".split("-").map(a=>"#"+a)
var line_colors = "e63946-f1faee-a8dadc-457b9d-1d3557".split("-").map(a=>"#"+a)

//class:類別，粒子
class Obj{  //宣告一個類別，針對一個畫的圖案
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
        this.p = args.p || {x: random(width) ,y:random(height)} //描述為該物件的初始位置
                                                                //||(or)當產生一個物件時，有傳給位置參數，則使用該參數，否則以||後面產出
        this.v = {x: random(-1,1),y:random(-1,1)}  //設定一個物件的移動速度
        this.size = random(15,20)  //一個物件的放大倍率
        this.color = random(fill_colors)
        this.stroke = random(line_colors)
    }
    draw(){  //畫出單一形狀
      push() //執行push()後，依照我的設定，設定原點(0,0)的位置
        translate(this.p.x,this.p.y)
        scale(this.v.x<0?1:-1,-1)
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4) //線條粗細
        beginShape()
        for(var k=0; k < points.length;k=k+1){
          // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size) //須提供兩個點的座標
          // vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endShape()，會把所有的點串接在一起
          curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫線為圓弧方式畫圖
        }
        endShape()
      pop()//執行pop()，原點(0,0)設定回整個視窗的右上角
    }
    update(){ //移動的程式碼內容
      this.p.x = this.p.x +this.v.x
      this.p.y = this.p.y +this.v.y
    }
}

var ball //目前要處理物件，暫時放在ball變數內
var balls = [] //把產生的"所有"的物件
function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i=0;i<30;i=i+1){ //i=0,1,2,3,4.......8,9
   ball = new Obj({})  //產生一個Obj class元件
   balls.push(ball)  //把ball的物件放到balls陣列內
  }
}

function draw() {
  background(220);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball = balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  for(let ball of balls)
  {
    ball.draw()
    ball.update()
  }
}

function mousePressed(){
  ball = new Obj({
    p:{x:mouseX,y:mouseY}
  }) //再滑鼠按下的地方，產生一個新的Obj class元件
  balls.push(ball) //把ball的物件放入到balls陣列內(丟到倉庫)

}