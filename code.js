var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dinero;
var sonido = new Audio();
sonido.src ="./Super Smash Bros. Brawl - Gerudo Valley.mp3";
var boton = document.getElementById("bttn")
var end = document.getElementById("end")
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
var inv = "./ImagenesC/Espada.png"
var caricaturas = [];
var character = [];

var Album = [Chow, BM, Corraje, Dexter, Edds, Johnny, PPG, Jack,inv]

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
var chowder2 = new Personajes();

//Helpers
function start(){
    interval = setInterval(update, 1000/60)
    intervalC = setInterval(coinsG, 1000/1)
}

function coins(){
    ctx.font = "30px Lemon";
    ctx.fillText("Monedas:", 1390, 30);
    ctx.fillText(monedas, 1560, 33);
}

function coinsG(){
        monedas = monedas +5;
    }

boton.onclick = function(){
    if(monedas >= 50){
        monedas = monedas -50;
        crear();
        console.log(caricaturas)
    }

}

function crear(){
     character = new Personajes();
    caricaturas.push(character);
}

function dibujarP(){
    caricaturas.forEach(function(character){
        character.draw();
        if(chowder.collision(character)){
            chowder.image.src = Album[1]
            caricaturas.splice(0,1)
        }if(chowder2.collision(character)){
            chowder2.image.src = Album[1]
            caricaturas.splice(0,1)
        }
    })
}

function update(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    chowder.draw();
    chowder2.draw();
    coins();
    dibujarP();
}

var click = 0;


addEventListener("mousedown", e =>{
    if(click== 0){
    let {clientX:x, clientY:y} = e;
    let obj = {x, y, width: 10, height:10}
    
    if(chowder.collision(obj)){
        addEventListener("mousemove", onMouseMove);
        addEventListener("mouseup", onMouseUp);
    }
    if(chowder2.collision(obj)){
        addEventListener("mousemove", onMouseMove3);
        addEventListener("mouseup", onMouseUp3);
    }
    if(chowder.collision(chowder2)){
        chowder.image.src = Album[2]
        chowder2.image.src = Album[8];
    }
    caricaturas.forEach((character, i)=>{
        if(character.collision(obj)){
            console.log(character.collision(obj))
            addEventListener("mousemove", onMouseMove2);
            addEventListener("mouseup", onMouseUp2);
        }
    })

  }
    
})

function onMouseMove(e){
    chowder.x = e.clientX;
    chowder.y = e.clientY;
}

function onMouseMove2(e){
    character.x = e.clientX;
    character.y = e.clientY;
}
function onMouseMove3(e){
    chowder2.x = e.clientX;
    chowder2.y = e.clientY;
}

function onMouseUp2(e){
    removeEventListener("mousemove", onMouseMove2);
    removeEventListener("mouseup", onMouseUp2); 
}

function onMouseUp(e){
    removeEventListener("mousemove", onMouseMove);
    removeEventListener("mouseup", onMouseUp); 
}
function onMouseUp3(e){
    removeEventListener("mousemove", onMouseMove3);
    removeEventListener("mouseup", onMouseUp3); 
}

      
start();
        