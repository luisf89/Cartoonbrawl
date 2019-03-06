var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var Jack = "./ImagenesC/SJack.png"
var Peppa = "./ImagenesC/Peppa-Head.png"
var espadas = [];

class Peleador{
    constructor(){
        this.x = 925;
        this.y = 550;
        this.width = 225;
        this.height = 250;
        this.image = new Image();
        this.image.src = Jack;
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

class Boss{
    constructor(){
        this.x = 925;
        this.y = 5;
        this.width = 250;
        this.height = 255;
        this.image = new Image();
        this.image.src = Peppa; 
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

class Fondo{
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

class Espada{
    constructor(){
        this.x = samurai.x;
        this.y = samurai.y;
        this.width = 10;
        this.heigth = 10;
        this.image = new Image();
        this.image. src = "./Imagenes/Espada.png"
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

//Instancias
var fondo = new Fondo();
var samurai = new Peleador();
var boss = new Boss();
var sword = new Espada();
//Helpers
function start(){
    interval = setInterval(update, 1000/60)
}

function update(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    boss.draw();
    samurai.draw();
    generateSwords();
    drawSwords();
}

addEventListener('keydown', e =>{
    if(e.keyCode === 38){
    console.log("Hola estas en juego")
    espadas.push(sword);
    console.log(espadas)
    }
})
function generateSwords(){
    
}

function drawSwords(){
    espadas.forEach(function(sword){
        sword.draw()
    })
}

/*function bossm(){
    if(frames % 2000 == 0){
        boss.x = Math.floor(Math.random() * 1801);
    }
}*/

addEventListener('keydown', e =>{
    if(e.keyCode === 37){
        samurai.x -= 30;
    }
})

addEventListener('keydown', e =>{
    if(e.keyCode === 39){
        samurai.x += 30;
    }
})

start();