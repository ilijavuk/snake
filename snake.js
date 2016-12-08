var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rendom;
var srceta;
var foo = document.getElementById("center");
var killovi = 0;
var killovi10 = 0;
var pauzirano = 0;
var diff = 1;
var smjerboss = 0;
var novaVar = 300;
var bossHP = 10;;
var bossAlive = 0;
var odabir = 2;//prompt("Odaberite težinu, što je niži broj, to je igra teža ;) \n(Odaberite 2 za najbolji doživljaj igranja)");

var lista = [1, 2, 3, 4, 5, 6, 7];

var rocketReady = false;
var rocketImage = new Image();
rocketImage.onload = function() {
    rocketReady = true;
};
rocketImage.src = "images/rocket.jpg";

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.png";

var bossHealthReady = false;
var bossHealthImage = new Image();
bossHealthImage.onload = function() {
	bossHealthReady = true;
};

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
    heroReady = true;
};
heroImage.src = "images/hero.png";

var mobReady = false;
var mobImage = new Image();
mobImage.onload = function() {
	mobReady = true;
};
mobImage.src = "images/mob2.png";



var bossReady = false;
var bossImage = new Image();
bossImage.onload = function(){
	bossReady = true;
};
//bossImage.src = "images/raptorshark.png";

var restartReady = false;
var restartImage = new Image();
restartImage.onload = function() {
	restartReady = true;
};

//pucaljka
var waveReady = false;
var waveImage = new Image();
waveImage.onload = function() {
	waveReady = true;
};
waveImage.src = "images/wave.png";

var kamehamehaReady = false;
var kamehamehaImage = new Image();
kamehamehaImage.onload = function() {
	kamehamehaReady = true;
};

var srcaReady = false;
var srcaImage = new Image();
srcaImage.onload = function() {
	srcaReady = true;
};
srcaImage.src = "images/3srca.png";


//Brzine
var rocket = {
	speed: 400
}
var bossHealth = {
	speed: 0
}
var boss = {
	speed: 45
}
var restart = {
  speed: 0
}
var srca = {
  speed: 0
}
var hero = {
    speed: 750 
}
var kamehameha = {
	speed: 720
}
var wave = {
	speed: 400
}
var mob = {
  speed: 500
}
var waves = [];
var rockets = [];
var keysDown = {};
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
	if (e.keyCode == 32 && waves.length < odabir ) {
		var wave = {
          speed: 400
        }
    	wave.x = hero.x - 10;
		wave.y = hero.y + 10;
		waves.push(wave);
		}		
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);
var update = function(modifier) {
    if (38 in keysDown && hero.y > 250) {
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < 630) {
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > 0) {
        hero.x -= hero.speed * modifier;
        heroImage.src = "images/heroleft.png";
    }
	if (39 in keysDown && hero.x < 670) {
        hero.x += hero.speed * modifier;
        heroImage.src = "images/hero.png";
	}
	/* Kamehameha
	if (69 in keysDown) {
		kamehamehaImage.src = "images/kamehameha.png";
		kamehameha.x = hero.x + 8;
		kamehameha.y = hero.y - 15;
	}
	*/
	if (27 in keysDown) {
		pause();
		pauzirano = 1;
	}
	if(32 in keysDown && pauzirano == 1) {
		pokreni();
		pauzirano = 0;
	}
	if(hero.x <= 0){
		hero.x = 0;
	}
	while(rendom > 600 || rendom <280){
		rendom = Math.floor((Math.random() * 1000) + 1);
	}
	for (i = 0; i < waves.length; i++) {
		waves[i].x = waves[i].x + 10;
		var x = waves[i].x + 23;
		var y = waves[i].y + 22;
		var z = waves[i].x;
		if(z > 1023){
			waves.splice(waves[i], 1);
		}
		//collision detection wave/mob
		if ((x >= mob.x && x <= mob.x+50) && (y >= mob.y && y <= mob.y+86)) {
			waves.splice(waves[i], 1);
			mob.x = 1024;
			mob.y = rendom;
			killovi = killovi + 1;
		}
		//collision detection boss/mob
		if ((x >= boss.x && x <= boss.x+ 20) && (y >= boss.y && y <= boss.y+350)) {
			waves.splice(waves[i], 1);
			bossImage.src = "images/raptorsharkDamaged.png";
			setTimeout(function(){ bossImage.src = "images/raptorshark.png"; }, 1000);
			bossImage.src = "images/raptorshark.png";
			bossHP -= 1;
		}    
    }
    if(mob.x <= 0) {
		mob.x = 1024;
		mob.y = rendom;
		srceta -= 0.5;
	}
	if(mob.x > 1024) {
		mob.x = 1024;
	}
	//collision detection player/mob
	if((hero.x - 15 <= mob.x && hero.x+15 >= mob.x) && (hero.y-40 <= mob.y && hero.y+40 >= mob.y)){
		srceta -= 1;
		hero.x = hero.x - 350;
	} 
	//Player HP
	if(srceta === 3){
		srcaImage.src = "images/3srca.png";
	}
	if(srceta === 2.5){
		srcaImage.src = "images/2ipolsrca.png";
	}
	if(srceta ===  2){
		srcaImage.src = "images/2srca.png";
	}  
	if(srceta === 1.5){
		srcaImage.src = "images/1srceipol.png";
	}
    if(srceta === 1){
		srcaImage.src = "images/1srce.png";
	}
	if(srceta === 0.5){
		srcaImage.src = "images/polasrca.png";
	}
    if(srceta <= 0){
		srcaImage.src = "images/ded.png";
		setGameOver();
    }
	if(Math.trunc(killovi/10) < diff){
		diff += 1;
	}
    //Boss appearance
	if(killovi == 10 || killovi == 20 || killovi == 30){
		boss.x = 750;
		boss.y = canvas.height/2;
		mobImage.src = "";
		bossImage.src = "images/raptorshark.png";
		bossHealthImage.src = "images/health10.png";
		bossAlive = 1;
		mob.speed = 0;
		killovi = 0;
		killovi10 += 1;
		rocketImage.src = "images/rocket.png"
    }	
	//Boss healthbar
	if(bossHP == 10 && bossAlive == 1){
		bossHealthImage.src = "images/health10.png";
	}
	if(bossHP == 9){
		bossHealthImage.src = "images/health9.png";
	}
	if(bossHP == 8){
		bossHealthImage.src = "images/health8.png";
	}
	if(bossHP == 7){
		bossHealthImage.src = "images/health7.png";
	}
	if(bossHP == 6){
		bossHealthImage.src = "images/health6.png";
	}
	if(bossHP == 5){
		bossHealthImage.src = "images/health5.png";
	}
	if(bossHP == 4){
		bossHealthImage.src = "images/health4.png";
	}
	if(bossHP == 3){
		bossHealthImage.src = "images/health3.png";
	}
	if(bossHP == 2){
		bossHealthImage.src = "images/health2.png";
	}
	if(bossHP == 1){
		bossHealthImage.src = "images/health1.png";
	}  
	//boss death
	if(bossHP == 0 && pauzirano == 0){
		mobImage.src = "images/mob2.png";
		rocketImage.src = "";
		bossImage.src = "";
		bossHP = 10; 
		bossAlive = 0;
		bossHealthImage.src = "";
		mob.speed = 500;
		boss.x = 1400;
	}	
	//boss movement 
	if(boss.y < 250){
		boss.y = 250;		
	}
	if(boss.y > 650){
		boss.y = 650;		
	}
	if(novaVar > 0){
		boss.y -= 8*(boss.speed * modifier);
		novaVar -= 10;
		if(novaVar <= 0){
			novaVar = -300;
		}
    }
	if(novaVar <= 0){
		boss.y += 8*(boss.speed * modifier);
		novaVar += 10;
		if(novaVar >= 0){
			novaVar = 300;
		}
	}
	//rakete
	if(bossAlive == 1){
		for (i = 0; i < rockets.length; i++) {
			rockets[i].x -= rocket.speed * modifier;
			var k = rockets[i].x;
			var l = rockets[i].y;
			var o = rockets[i].x;
			//collision detection hero/rocket
			if ((k >= hero.x && k <= hero.x+ 46) && (l >= hero.y && l <= hero.y+69)) {
				rockets.splice(rockets[i], 1);
				srceta -= 1;
				hero.y -= 40;
			} 
			//spliceaj kad izađu sa screena
			if(k < 0){
				rockets.splice(rockets[i], 1);
			}
		}
		//pushaj rakete	
		if(rockets.length < 2){
			rocket.x = boss.x - 5;;
			rocket.y = boss.y + 65;
			rockets.push(rocket);
		}
	}	
	//opće varijable
	mob.x -= Math.log2(mob.speed * modifier * diff);
	rendom = Math.floor((Math.random() * 1000) + 1);
	bossHealth.x = boss.x + 100;
	bossHealth.y = boss.y + 250;
	kamehameha.x += kamehameha.speed * modifier;
	//console.log
}

var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
	
	boss.x = 1400;
	boss.y = 400;
    
    srca.x = 0;
    srca.y = 0;
    
    mob.x = 1024;
    mob.y = 300;
    
    restart.x = 0;
    restart.y = 0;
    
    srceta = 3;
};

var render = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
		//kill counter
		ctx.font = '40px Arial';
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#00ff00';
		ctx.strokeText("Broj killova " + killovi10 + killovi, 500, 40);
	}	
	if(bossHealthReady) {
		ctx.drawImage(bossHealthImage, bossHealth.x, bossHealth.y);
	}	
    if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
    }   
    if(bossReady){
		ctx.drawImage(bossImage, boss.x, boss.y);
    }    
    if(mobReady){
		ctx.drawImage(mobImage, mob.x, mob.y);
    }  
    if(srcaReady){
		ctx.drawImage(srcaImage, srca.x, srca.y);
    } 
    if(restartReady) {
		ctx.drawImage(restartImage, restart.x, restart.y);
    }  
	if(waveReady) {
		ctx.drawImage(waveImage, wave.x, wave.y);
	}
	if(kamehamehaReady) {
		ctx.drawImage(kamehamehaImage, kamehameha.x, kamehameha.y);
	}
	for (i = 0; i < waves.length; i++) {
        ctx.drawImage(waveImage, waves[i].x, waves[i].y);
	}		
	for (i	= 0; i < rockets.length; i++) {
        ctx.drawImage(rocketImage, rockets[i].x, rockets[i].y);
    }
};

function pause(){
	hero.speed = 0;
	mob.speed = 0;
	waveImage.src = "";
	heroImage.src = "images/hero.png";
	mobImage.src = "images/mob2.png";
	restartImage.src = "images/unpause.png";
	restart.x = (canvas.width-500)/2;
	restart.y = canvas.height/2;
}

function pokreni(){
	hero.speed = 750;
	mob.speed = 500;
	waveImage.src = "images/wave.png";
	kamehamehaImage.src = "images/kamehameha.png";
	restartImage.src = "";
}

function admin(){
	srceta = 3;
	hero.speed = 750;
	mob.speed = 0;
	waveImage.src = "images/wave.png";
	kamehamehaImage.src = "images/kamehameha.png";
	restartImage.src = "";
}

function setGameOver(){
	hero.speed = 0;
	mob.speed = 0;
	waveImage.src = "";
	kamehamehaImage.src = "";
	heroImage.src = "images/hero.png";
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	restart.x = 300;
	restart.y = 350;
	restartImage.src = "images/startOver.png";
    if(13 in keysDown){
		startAgain();
	}
}

function startAgain(){
	location.reload();
}

var main = function() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();