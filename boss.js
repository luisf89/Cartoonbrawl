var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");
var Jack = "./ImagenesC/SJack.png"
var Peppa = "./ImagenesC/Peppa-Head.png"
var espadas = [];
var enemigos = [];
var frames = 0;
var score = 0;
var health = 100;
var health2 = 100;

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
        if(frames % 200 === 0) this.x = Math.floor(Math.random() * 1801)
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

class Tocino{
    constructor(){
        this.x = Math.floor(Math.random() * 1801);
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "./ImagenesC/Tocino.png"
    }

    draw(){
        if(frames % 10 === 0)  this.y += 20;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        
    }
}

class Espada{
    constructor(){
        this.x = samurai.x + 50;
        this.y = samurai.y;
        this.width = 70;
        this.height = 50;
        this.image = new Image();
        this.image.src = "./ImagenesC/Shuriken.png"
    }

    draw(){
        if(frames % 10 === 0) this.y -= 50;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

//Instancias
var fondo = new Fondo();
var samurai = new Peleador();
var boss = new Boss();
//Helpers
function start(){
    interval = setInterval(update, 1000/60)
}

function drawHealthBar(canvas, x, y, width, height, health, max_health){
    if(health >=max_health){
        health = max_health;
    }
    if(health <= 0){
        health = 0;
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(x,y,width,height);
    var colorNumber = Math.round((1-(health/max_health))*0xff)*0x10000+Math.round((health/max_health)*0xff)*0x100;
    var colorString = colorNumber.toString(16);
    if(colorNumber >= 0x100000){
        ctx.fillStyle = '#'+colorString;
    }else if(colorNumber << 0x100000 && colorNumber >= 0x100000){
        ctx.fillStyle = '#0'+colorString;
    }else if(colorNumber << 0x100000){
        ctx.fillStyle = '#00'+colorString;
    }
    ctx.fillRect(x+1, y+1, (health/max_health)*(width-2),height-2);
    
}

function drawHealthBar2(canvas, x, y, width, height, health2, max_health){
    if(health2 >=max_health){
        health2 = max_health;
    }
    if(health2 <= 0){
        health2 = 0;
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(x,y,width,height);
    var colorNumber = Math.round((1-(health2/max_health))*0xff)*0x10000+Math.round((health2/max_health)*0xff)*0x100;
    var colorString = colorNumber.toString(16);
    if(colorNumber >= 0x100000){
        ctx.fillStyle = '#'+colorString;
    }else if(colorNumber << 0x100000 && colorNumber >= 0x100000){
        ctx.fillStyle = '#0'+colorString;
    }else if(colorNumber << 0x100000){
        ctx.fillStyle = '#00'+colorString;
    }
    ctx.fillRect(x+1, y+1, (health2/max_health)*(width-2),height-2);
    
}

function generateTocino(){
    if(frames % 100 === 0 || frames % 200 === 0 || frames % 300 === 0 || frames % 50 === 0){
        let tocino = new Tocino();
        enemigos.push(tocino)
    }
}

function drawTocino(){
    enemigos.forEach(function(tocino){
        tocino.draw();
        if(samurai.collision(tocino)){
            health = health -2;
        }if(samurai.collision(tocino)){
            enemigos.splice(0,1)
        }
    })
}

function update(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fondo.draw();
    boss.draw();
    samurai.draw();
    generateTocino();
    drawTocino();
    drawSwords();
    drawHealthBar(canvas2,10,10,350,20,health,100);
    drawHealthBar2(canvas2,1480,10,350,20,health2,100);
    //collisions();
}

addEventListener('keydown', e =>{
    if(e.keyCode === 38){
        let katana = new Espada();
        espadas.push(katana)
    }
})
function drawSwords(){
    espadas.forEach(function(katana){
        katana.draw();
        if(boss.collision(katana)){
            health2 = health2 -3;
        }if(boss.collision(katana)){
            espadas.splice(0,1);
        }
    })
}

/*function collisions(){
    
    if(samurai.collision(tocino)){
        health2 = health2 -5;
    }
}*/

addEventListener('keydown', e =>{
    if(e.keyCode === 37){
        samurai.x -= 50;
    }
})

addEventListener('keydown', e =>{
    if(e.keyCode === 39){
        samurai.x += 50;
    }
})

start();