var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dinero;
var boton = document.getElementById("bttn")
var item;
var interval;
var intervalC;
var frames = 0;
var monedas = 0;
var BM = "./ImagenesC/B&M.png";
var Chow = "./ImagenesC/Chow.png"
var Corraje = "./ImagenesC/Corraje.png"
var Dexter = "./ImagenesC/Dexter.png"
var Edds = "./ImagenesC/Edds.png"
var Johnny = "./ImagenesC/Johnny.png"
var PPG = "./ImagenesC/PPG.png"
var Jack = "./ImagenesC/SJack.png"

var Album = [Chow, BM, Corraje, Dexter, Edds, Johnny, PPG, Jack]

class Personajes{
    constructor(){

        this.x = Math.floor(Math.random() * 1801);
        this.y = Math.floor(400 + (Math.random() * 160));
        this.width = 225;
        this.height = 250;
        this.image = new Image();
        this.image.src = Album[0]
       
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }
}

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "./ImagenesC/Background.png"
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
} 


//Instancias
var fondo = new Background();
var chowder = new Personajes();
var billy = new Personajes();

//Helpers
function start(){
    interval = setInterval(update, 1000/60)
    intervalC = setInterval(coinsG, 1000/1)
}

function coins(){
    ctx.font = "30px Avenir";
    ctx.fillText("Monedas:", 1400, 30);
    ctx.fillText(monedas, 1560, 33)
}

function coinsG(){
        monedas = monedas +5;
    }

boton.onclick = function(){
    if(monedas >= 100){
        monedas = monedas -100;
    }

}

function update(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    chowder.draw();
    billy.draw();
    coins();
}
/*var item = new Personajes()
addEventListener("click", e => {
    let {clientX:x, clientY:y} = e;
    let obj = {x, y, width: 10, height:10}
    item.collision(obj)
    console.log(obj)
})*/

addEventListener("mousedown", e =>{
    if(utils.circlePointCollision(e.clientX, e.clientY, chowder)){
        addEventListener("mousemove", onMouseMove);
        addEventListener("mouseup", onMouseUp);
    }
})

function onMouseMove(e){
    chowder.x = e.clientX;
    chowder.y = e.clientY;
    draw();

}

function onMOuseUp(e){
    removeEventListener("mousemove", onMouseMove);
    removeEventListener("mouseup", onMouseUp); 
}
      
start();
        