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
var kamehamehaAvailable = 0;
var charging = 0;
var odabir = prompt("Odaberite težinu, što je niži broj, to je igra teža ;) \n(Odaberite 2 za najbolji doživljaj igranja)");
var executedgameover = 0;
//timer za crate
var timeInMinutes = 1;
var currentTime = Date.parse(new Date());
var deadline = new Date(currentTime + timeInMinutes*60*1000);
//mutebutton
var mutebutton = document.createElement("BUTTON");
var t = document.createTextNode("Mute audio");
mutebutton.appendChild(t);
foo.appendChild(mutebutton);
mutebutton.addEventListener('click', function(){
	music.volume = 0;
	pucanj.volume = 0;
	gameover.volume = 0;
	yoursoul.volume = 0;
	explosion.volume = 0;
	safet.volume = 0;
	celebration.volume = 0;
	woohoo.volume = 0;
	kamehamehaFire.volume = 0;
	});
//sounds
var music = new Audio('sounds/music.mp3');
var pucanj = new Audio('sounds/wave2.mp3');
var gameover = new Audio('sounds/GameOver.mp3');
var yoursoul = new Audio('sounds/yoursoul.wav');
var explosion = new Audio('sounds/explosion.wav');
var safet = new Audio('sounds/safet.wav');
var celebration = new Audio('sounds/pu$$y.wav');
var woohoo = new Audio('sounds/woohoo.wav');
var kamehamehaFire = new Audio('sounds/kamehamehaFire.wav');
music.play();
music.volume = 0.17;
music.currentTime = 25;
pucanj.volume = 0.10;

var lista = [1, 2, 3, 4, 5, 6, 7];

var cratesrceReady = false;
var cratesrceImage = new Image();
cratesrceImage.onload = new function(){
	cratesrceReady = true;
};

var powerupReady = false;
var powerupImage = new Image();
powerupImage.onload = new function(){
	powerupReady = true;
};
powerupImage.src = "images/kamehamehaReady.png";

var crateReady = false;
var crateImage = new Image();
crateImage.onload = new function(){
	crateReady = true;
};

var rocketReady = false;
var rocketImage = new Image();
rocketImage.onload = function() {
    rocketReady = true;
};
rocketImage.src = "images/rocket.png";

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
var powerup = {
	speed: 0
}
var cratesrce = {
	speed: 350
}
var crate = {
	speed: 350
}
var rocket = {
	speed: 400
}
var bossHealth = {
	speed: 0
}
var boss = {
	speed: 75
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
		pucanj.currentTime = 0;
		pucanj.play();
		}		
	if (e.keyCode == 69 && kamehamehaAvailable == 1) {
		kamehamehaFire.play();
		heroImage.src = "images/heroCharge.png";
		charging = 1;
		setTimeout(function(){ kamehameha.speed = 720;
		kamehamehaImage.src = "images/kamehameha.png";
		kamehameha.x = hero.x + 8;
		kamehameha.y = hero.y + 15;
		kamehamehaAvailable = 0; 
		charging = 0;}, 1000);
	}
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);
var update = function(modifier) {
	//movement and limits
    if (38 in keysDown && hero.y > 250) {
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < 630) {
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > 0 && kamehamehaAvailable == 0) {
        hero.x -= hero.speed * modifier;
        heroImage.src = "images/heroleft.png";
    }
	if (39 in keysDown && hero.x < 670 && kamehamehaAvailable == 0) {
        hero.x += hero.speed * modifier;
        heroImage.src = "images/hero.png";
	}
	if (37 in keysDown && hero.x > 0 && kamehamehaAvailable == 1) {
        hero.x -= hero.speed * modifier;
        heroImage.src = "images/heroUPLeft.png";
    }
	if (39 in keysDown && hero.x < 670 && kamehamehaAvailable == 1) {
        hero.x += hero.speed * modifier;
        heroImage.src = "images/heroUP.png";
	}
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
	if(charging ==1){
		heroImage.src = "images/heroCharge.png";
	}
	//crate srce
	if(Math.abs(getTimeRemaining(deadline).seconds) == 10 || Math.abs(getTimeRemaining(deadline).seconds) == 30 || Math.abs(getTimeRemaining(deadline).seconds) == 50){
		cratesrceImage.src = "images/cratesrce.png";
		cratesrce.y = 0;
		cratesrce.x = Math.floor(Math.random()*670) + 1;
	}
	if(cratesrce.y >= 700){
		cratesrceImage.src = "";
	}
	//collision detection hero/cratesrce
	if((hero.x < cratesrce.x + 45 && hero.x + 42 > cratesrce.x ) && (hero.y < cratesrce.y + 45 && hero.y + 69 > cratesrce.y) && srceta <= 2){
		cratesrceImage.src = "";
		srceta += 1;
		woohoo.play();
	} 
	//crate 
	if(Math.abs(getTimeRemaining(deadline).seconds) == 0 || Math.abs(getTimeRemaining(deadline).seconds) == 20 || Math.abs(getTimeRemaining(deadline).seconds) == 40){
		crateImage.src = "images/crate.png";
		crate.y = 0;
		crate.x = Math.floor(Math.random()*670) + 1;
	}
	if(crate.y >= 700){
		crateImage.src = "";
	}
	if(kamehamehaAvailable == 1){
		powerupImage.src = "images/kamehamehaReady.png";
	}
	if(kamehamehaAvailable == 0){
		powerupImage.src = "images/kamehamehaNotReady.png";
	}
	//collision detection hero/crate
	if((hero.x < crate.x + 45 && hero.x + 42 > crate.x ) && (hero.y < crate.y + 45 && hero.y + 69 > crate.y)){
		kamehamehaAvailable = 1;
		crateImage.src = "";
		heroImage.src = "images/heroUP.png";
		celebration.play();
	}
	//waves
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
		//collision detection wave/boss
		if ((x >= boss.x && x <= boss.x+ 20) && (y >= boss.y && y <= boss.y+350)) {
			waves.splice(waves[i], 1);
			bossImage.src = "images/raptorsharkDamaged.png";
			setTimeout(function(){ bossImage.src = "images/raptorshark.png"; }, 500);
			bossHP -= 1;
		}    
    }	
	//collision detection kamehameha/mob
	if ((kamehameha.x + 78>= mob.x && kamehameha.x + 78 <= mob.x+50) && (kamehameha.y+15 >= mob.y && kamehameha.y+15 <= mob.y+86)) {
		mob.x = 1024;
		mob.y = rendom;
		killovi = killovi + 1;
		kamehamehaImage.src = "";
	}
	//collision detection kamehameha/boss
	if ((kamehameha.x + 78>= boss.x && kamehameha.x + 78 <= boss.x+20) && (kamehameha.y+15 >= boss.y && kamehameha.y <= boss.y+350)) {
		bossImage.src = "images/raptorsharkDamaged.png";
		setTimeout(function(){ bossImage.src = "images/raptorshark.png"; }, 1000);
		bossImage.src = "images/raptorshark.png";
		bossHP -= 3;
		kamehamehaImage.src = "";
		kamehameha.x = 0;
		kamehameha.speed = 0;
		explosion.play();
	}	
	if(kamehameha.x >= 1024){
		kamehameha.x = 0;
		kamehameha.speed = 0;
		kamehamehaImage.src = "";
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
		if(executedgameover == 0){
			executedgameover = 1;
			music.pause();
			gameover.play();			
		}
    }	
	if(Math.trunc(killovi/10) < diff){
		diff += 1;
	}
    //Boss appearance
	if(killovi == 10){
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
		yoursoul.play();
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
	if(bossHP <= 1){
		bossHealthImage.src = "images/health1.png";
	}  
	//boss death
	if(bossHP <= 0 && pauzirano == 0){
		mobImage.src = "images/mob2.png";
		rocketImage.src = "";
		bossImage.src = "";
		bossHP = 10; 
		bossAlive = 0;
		bossHealthImage.src = "";
		mob.speed = 500;
		boss.x = 1400;
		safet.play();
		music.volume = 0;
	}	
	//boss movement 
	if(boss.y < 150){
		novaVar = -(Math.floor(Math.random()*(650-0+1)+0));		
	}
	if(boss.y > 600){
		novaVar = Math.floor(Math.random()*(650-0+1)+0);	
	}
	if(novaVar > 0){
		boss.y -= 8*(boss.speed * modifier);
		novaVar -= 10;
		if(novaVar <= 0){
			novaVar = Math.floor(Math.random()*(650-0+1)+0);
		}
    }
	if(novaVar <= 0){
		boss.y += 8*(boss.speed * modifier);
		novaVar += 10;
		if(novaVar >= 0){
			novaVar = -(Math.floor(Math.random()*(650-0+1)+0));
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
	if(safet.currentTime == 12){
		music.volume = 100;
	}
	//opće varijable
	rendom = Math.floor(Math.random()*(600-280+1)+280);
	mob.x -= Math.log2(mob.speed * modifier * diff);	
	bossHealth.x = boss.x + 100;
	bossHealth.y = boss.y + 250;
	kamehameha.x += kamehameha.speed * modifier;
	crate.y += crate.speed * modifier;
	cratesrce.y += cratesrce.speed * modifier;
	//console.log
	console.log(getTimeRemaining(deadline).seconds);
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
	
	crate.y = 0;
	cratesrce.y = 0;
	
	powerup.x = 0;
	powerup.y = 610;
    
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
	if(cratesrceReady) {
		ctx.drawImage(cratesrceImage, cratesrce.x, cratesrce.y);
	}
	if(powerupReady) {
		ctx.drawImage(powerupImage, powerup.x, powerup.y);
	}
	if(bossHealthReady) {
		ctx.drawImage(bossHealthImage, bossHealth.x, bossHealth.y);
	}	
	if(crateReady) {
		ctx.drawImage(crateImage, crate.x, crate.y);
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
	crate.speed = 0;
	mob.speed = 0;
	boss.speed = 0;
	rocket.speed = 0;
	waveImage.src = "";
	kamehamehaImage.src = "";
	heroImage.src = "images/hero.png";
	crateImage.src = "";
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	restart.x = 300;
	restart.y = 350;
	crate.x = 1024;
	restartImage.src = "images/startOver.png";	
    if(13 in keysDown){
		startAgain();
	}
	//sounds
	music.pause();
	pucanj.pause();
	yoursoul.pause();
	explosion.pause();
	safet.pause();
	celebration.pause();
	woohoo.pause();
	kamehamehaFire.pause();
}

function getTimeRemaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
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