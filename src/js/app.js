const warn = document.querySelector(".title");
const level = document.getElementById('score').querySelector("span");
const lives = document.getElementById("lives").querySelector("span");

//---Printing 'game over' information in the screen.
function gameOver() {
  document.querySelector(".right").style.display = "none";
  let lev = "";
  if (player.highestLevelStore > 2) {
    lev = "REALLY GOOD JOB";
  } else {
    lev = "YOU ARE NOVICE";
  }
  warn.innerHTML = `GAME OVER ! HIGHTEST LEVEL:${player.highestLevelStore} ${lev}`;///
}

//--recover game.
function recover() {
  document.querySelector(".right").style.display = "";
  warn.innerHTML = `AHHH, Spaceships!`
  player.highestLevelStore = 0;
}

class Sun {
  constructor() {
    this.x = 380;
    this.y = 0;
  }
}

class Enemy {
  constructor(x, y, style, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speed = parseInt(level.innerText) + Math.random() * 100;
  }

  update(dt = 1) {
    if (this.x <= 0) {
      this.direction = "ltr"
    } else if (this.x >= 800) {
      this.direction = "rtl";
    }

    if (this.direction === "ltr") {
      this.x += this.speed * dt;
    }

    if (this.direction === "rtl") {
      this.x -= this.speed * dt;
    }
  }
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.highestLevelStore = parseInt(level.innerText);
  }

  handleInput(keyCode) {
    switch (keyCode) {
      case 'left':
        if (this.x > 0) {
          if (this.x < 20) {
            this.x = 0;
          } else {
            this.x -= 30;
          }
        }
        break;

      case "up":
        if (this.y > 0) {
          if (this.y < 20) {
            this.y = 0;
          } else {
            this.y -= 30;
          }
        }
        break;

      case "right":
        if (this.x < 800) {
          if (this.x > 780) {
            this.x = 800;
          } else {
            this.x += 30;
          }
        }
        break;

      case "down":
        if (this.y < 430) {
          if (this.y > 410) {
            this.y = 430;
          } else {
            this.y += 30;
          }
        }
        break;
    }
  }

  update() {
    //--Test crush.
    let test = false;
    for (let i = 0; i < allEnemies.length; i++) {
      if (Math.abs(this.x - allEnemies[i].x) <= 80 && Math.abs(this.y - allEnemies[i].y) <= 80) {
        test = true;
      }
    }

    if (test === true) {
      this.x = 390;
      this.y = 430;
      parseInt(lives.innerText) > 1 ? lives.innerText = parseInt(lives.innerText) - 1 : lives.innerText = 3;
      parseInt(lives.innerText) === 3 ? level.innerText = 0 : level.innerText = level.innerText;

      if (parseInt(lives.innerText) === 3) {
        allEnemies[0].x = 0;
        allEnemies[0].y = 30;
        allEnemies[1].x = 0;
        allEnemies[1].y = 150;
        allEnemies[2].x = 0;
        allEnemies[2].y = 240;
        sun.x = 380;
        sun.y = 0;

        for (let i = 0; i < allEnemies.length; i++) {
          allEnemies[i].speed = parseInt(level.innerText) + Math.random() * 100;
        }

        ////----Game over.
        gameOver();
        setTimeout(() => {
          recover();
        }, 3000);
      }
    }
    //--Test success.
    if (Math.abs(sun.x - this.x) <= 100 && Math.abs(sun.y - this.y) <= 100) {
      this.x = 390;
      this.y = 430;
      level.innerText = parseInt(level.innerText) + 1;
      for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].speed += 100;
      }
      //---Recode hightest level.
      this.highestLevelStore < parseInt(level.innerText) ? this.highestLevelStore = parseInt(level.innerText) : this.highestLevelStore = this.highestLevelStore;
    }
  }
};

const player = new Player(390, 430);
const sun = new Sun(380, 0);
const allEnemies = [
  new Enemy(0, 30, "enemy4", "ltr"),
  new Enemy(0, 100, "enemy3", "ltr"),
  new Enemy(0, 220, "enemy1", "ltr"),
]

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


//This method makes more hard for game,can delete 
//below all and game can run normally!!!
let circleSun = 0;
let fluctuateEnemy = 0;

setInterval(function () {

  if (parseInt(level.innerHTML) > 1) {

    if (circleSun >= Math.PI * 2) {
      moveSun = 0;
    }

    sun.x += Math.sin(circleSun) * 4;
    sun.y -= Math.cos(circleSun) * 4;
    circleSun += 0.1;
  }

  if (parseInt(level.innerHTML) > 0) {

    if (fluctuateEnemy >= Math.PI * 2) {
      fluctuateEnemy = 0;
    }
    allEnemies[2].y += Math.cos(fluctuateEnemy) * 3;
    allEnemies[1].y += Math.cos(fluctuateEnemy+1) * 5;
    fluctuateEnemy += 0.1;
  }
}, 50)
