var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rendom;
var srceta;
var foo = document.getElementById("center");
var killovi = 0;
var pauzirano = 0;
var diff = 1;
var smjerboss = 0;

var lista = [1, 2, 3, 4, 5, 6, 7];




var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
	
};
bgImage.src = "images/background.png";

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
bossImage.src = "images/raptorshark.png";

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
var smjer;


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



var boss = {
	speed: 250
}

var restart = {
  speed: 0
}

var srca = {
  speed: 0
}

var hero = {
    speed: 750 
};

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

var keysDown = {};
addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
	if (e.keyCode == 32 ) {
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
    if (38 in keysDown) {
		if(hero.y <= 300){
			hero.y = 300;
		}
		else{	
        hero.y -= hero.speed * modifier;
		}
    }
    if (40 in keysDown) {
			
		if(hero.y >= 625){
			hero.y = 625;
		}
		else{
			hero.y += hero.speed * modifier;
		}
    }
    if (37 in keysDown) {
		heroImage.src = "images/heroleft.png"
		smjer = "lijevo";
		if(hero.x <= 0){
			hero.x = 0;
		}
		else{
			hero.x -= hero.speed * modifier;
		}		
	}
    if (39 in keysDown) {
		heroImage.src = "images/hero.png"
		smjer = "desno";
		
		if(hero.x >= 690){
				hero.x = 690;
		}		
		else{
			hero.x += hero.speed * modifier;
		}
	}
	
	if (69 in keysDown) {
		kamehamehaImage.src = "images/kamehameha.png";
		kamehameha.x = hero.x + 8;
		kamehameha.y = hero.y - 15;
     
	}
	
	if (27 in keysDown) {
		pause();
		pauzirano = 1;
		
	}
	
	if(32 in keysDown && pauzirano == 1) {
		pokreni();
		pauzirano = 0;
	}
	
	
	kamehameha.x += kamehameha.speed * modifier;
	if(hero.x <= 0){
			hero.x = 0;
		}
  
	rendom = Math.floor((Math.random() * 1000) + 1);
    while(rendom > 600 || rendom <280){
  
    rendom = Math.floor((Math.random() * 1000) + 1);
  }
  
   for (i = 0; i < waves.length; i++) {
      waves[i].x = waves[i].x + 10;
      var x = waves[i].x + 23;
      var y = waves[i].y + 22;
      
      //collision detection wave/mob
      if ((x >= mob.x && x <= mob.x+50) && (y >= mob.y && y <= mob.y+86)) {
        waves.splice(waves[i], 1);
		mob.x = 1024;
        mob.y = rendom;
        
        killovi = killovi + 1;

      }
    }
    
  if(mob.x <= 0 || mob.x > 1024) {
    mob.x = 1024;
    mob.y = rendom;
  }
  
  //collision detection player/mob
  if((hero.x - 15 <= mob.x && hero.x+15 >= mob.x) && (hero.y-40 <= mob.y && hero.y+40 >= mob.y)){
    srceta -= 1;
    hero.x = hero.x - 350;
	
  } 
  
  if(srceta == 2){
    srcaImage.src = "images/2srca.png";
  }
  
  if(srceta == 1){
    srcaImage.src = "images/1srce.png";
  }
  
  if(srceta == 0){
    srcaImage.src = "images/ded.png";
    setGameOver();
    
  }
  
  
   if(Math.trunc(killovi/10) < diff){
	diff += 1;
   }
  
	
    mob.x -= Math.log2(mob.speed * modifier * diff);
	console.log(Math.log2(mob.speed * modifier * diff));
	console.log("I am at " + mob.x);

	
	
	//Boss appearance
	if(killovi/10 === 1){
		mobImage.src = "";
		bossImage.src = "images/raptorshark.png";
		
		mob.speed = 0;
		
		
		
	}
	
	console.log(smjerboss);
	
	for(j = 0; j < 1000000; j++ ){
		
		if(j % 666555566 === 0){
			smjerboss = Math.round(Math.random());
			if(smjerboss === 1){
				boss.y -= boss.speed * modifier;
				}
		
			if(smjerboss === 0){
				boss.y += boss.speed * modifier;
				}
		
			if(boss.y <= 0){
				boss.y = 0;
				}
	
			if(boss.y >= 600){
				boss.y = 600;
				}
		}
	}
	
}




var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
	
	boss.x = 750;
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
      ctx.strokeText("Broj killova " + killovi, 500, 40);
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
};



function pause(){
  hero.speed = 0;
  mob.speed = 0;
  waveImage.src = "";
  heroImage.src = "images/hero.png";
  mobImage.src = "images/mob2.png";
  restart.x = (canvas.width-500)/2;
  restart.y = canvas.height/2;
  restartImage.src = "images/unpause.png";
  

}

function pokreni(){
	hero.speed = 750;
	mob.speed = 500;
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
  
  
     //textcraft
  if(13 in keysDown){
    startAgain();
  }
  
}

function startAgain(){
  /*hero.speed = 750;
  mob.speed = 500;
  waveImage.src = "images/wave.png";
  kamehamehaImage.src = "images/kamehameha.png";
  restartImage.src = "";
  
  hero.x = canvas.width/2;
  hero.y = canvas.height/2;
  */
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