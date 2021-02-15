var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var line_width = 6;
var player_num = 2;
var players = [];
var ball_num = 1;
var balls = [];
//// player1 control
var pressDown = false;
var pressUp = false;
var pressLeft = false;
var pressRight = false;
//// player2 control
var pressDown1 = false;
var pressUp1 = false;
var pressLeft1 = false;
var pressRight1 = false;
var countBlue = 0;
var countRed = 0;
///class control players(1 ,2)

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}


class Control {
  static controller1() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyLeftRightdownHandler, false);
    document.addEventListener("keyup", keyLeftRightupHandler, false);

    function keyDownHandler(e) {
      if (e.keyCode == 87) {
        pressUp = true;
      } else if (e.keyCode == 83) {
        pressDown = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode == 87) {
        pressUp = false;
      } else if (e.keyCode == 83) {
        pressDown = false;
      }
    }

    function keyLeftRightdownHandler(e) {
      if (e.keyCode == 65) {
        pressLeft = true;
      } else if (e.keyCode == 68) {
        pressRight = true;
      }
    }

    function keyLeftRightupHandler(e) {
      if (e.keyCode == 65) {
        pressLeft = false;
      } else if (e.keyCode == 68) {
        pressRight = false;
      }
    }
  }

  static controller2() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyLeftRightdownHandler, false);
    document.addEventListener("keyup", keyLeftRightupHandler, false);

    function keyDownHandler(e) {
      if (e.keyCode == 38) {
        pressUp1 = true;
      } else if (e.keyCode == 40) {
        pressDown1 = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode == 38) {
        pressUp1 = false;
      } else if (e.keyCode == 40) {
        pressDown1 = false;
      }
    }

    function keyLeftRightdownHandler(e) {
      if (e.keyCode == 37) {
        pressLeft1 = true;
      } else if (e.keyCode == 39) {
        pressRight1 = true;
      }
    }

    function keyLeftRightupHandler(e) {
      if (e.keyCode == 37) {
        pressLeft1 = false;
      } else if (e.keyCode == 39) {
        pressRight1 = false;
      }
    }
  }


}
Control.controller1();
Control.controller2();

class RandomSign {
  // for ball rand direction
  static generateRandomInteger() {
    var int_ = Math.floor(0 + Math.random() * (1 + 1 - 0))
    switch (int_) {
      case 0:
        return -1.2;
        break;
      case 1:
        return 1.2;
        break
    }
  }
}

/// draw place of game
class Graphic {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw_line() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height, this.color);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  static vertical_line() {

    var mid_line = new Graphic(canvas.width / 2 - line_width / 2, 0, line_width, canvas.height, "#e5f5de");
    var goal_keep_line = new Graphic((canvas.width / 5) - (line_width / 2), canvas.height - canvas.height / 4, line_width, -canvas.height / 2, "#e5f5de");
    var goal_keep_line2 = new Graphic((canvas.width - ((canvas.width / 5))) - (line_width / 2), canvas.height - canvas.height / 4, line_width, -canvas.height / 2, "#e5f5de");
    var penal_line = new Graphic((canvas.width / 12) - (line_width / 2), canvas.height - canvas.height / 3, line_width, -canvas.height / 3, "#e5f5de");
    var penal_line2 = new Graphic((canvas.width - ((canvas.width / 12))) - (line_width / 2), canvas.height - canvas.height / 3, line_width, -canvas.height / 3, "#e5f5de");

    mid_line.draw_line();
    goal_keep_line.draw_line();
    goal_keep_line2.draw_line();
    penal_line.draw_line()
    penal_line2.draw_line()
  }

  static horizontal_line() {
    var goal_keep_line_d = new Graphic((canvas.width / 5) - (line_width / 2), canvas.height - canvas.height / 4, -canvas.height / 2, -line_width, "#e5f5de");
    var goal_keep_line_u = new Graphic((canvas.width / 5) - (line_width / 2), canvas.height - 3 * ((canvas.height / 4)) + line_width, -canvas.height / 2, -line_width, "#e5f5de");
    var goal_keep_line_d1 = new Graphic((canvas.width - ((canvas.width / 5))) - (line_width / 2), canvas.height - canvas.height / 4, canvas.height / 2, -line_width, "#e5f5de");
    var goal_keep_line_u1 = new Graphic((canvas.width - ((canvas.width / 5))) - (line_width / 2), canvas.height - 3 * ((canvas.height / 4)) + line_width, canvas.height / 2, -line_width, "#e5f5de");
    // u is switch d  /////////
    var penal_line_u = new Graphic((canvas.width / 12) - (line_width / 2), (canvas.height - canvas.height / 3) - line_width, -canvas.height / 3, line_width, "#e5f5de");
    var penal_line2_d = new Graphic((canvas.width / 12) - (line_width / 2), (canvas.height - canvas.height / 3) - canvas.height / 3, -canvas.height / 3, line_width, "#e5f5de");
    var penal_line_u1 = new Graphic((canvas.width - ((canvas.width / 12))) - (line_width / 2), (canvas.height - canvas.height / 3) - line_width, canvas.height / 3, line_width, "#e5f5de");
    var penal_line2_d1 = new Graphic((canvas.width - ((canvas.width / 12))) - (line_width / 2), (canvas.height - canvas.height / 3) - canvas.height / 3, canvas.height / 3, line_width, "#e5f5de");

    goal_keep_line_d.draw_line();
    goal_keep_line_u.draw_line();
    goal_keep_line_d1.draw_line();
    goal_keep_line_u1.draw_line();

    penal_line_u.draw_line();
    penal_line2_d.draw_line();
    penal_line_u1.draw_line();
    penal_line2_d1.draw_line();
  }

  draw_cyrcle() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, this.height, this.color);
    ctx.strokeStyle = "#e5f5de";
    ctx.lineWidth = line_width;
    ctx.stroke();
    ctx.closePath();
  }

  static cyrcle_area() {
    //draw cyrcle shape in place of game
    var cyrcle = new Graphic(canvas.width / 2, canvas.height / 2, 65, 0, Math.PI * 2);
    var penalcyrcle = new Graphic(canvas.width / 8, canvas.height / 2, 1, 0, Math.PI * 2);
    var penalcyrcle1 = new Graphic(canvas.width - (canvas.width / 8), canvas.height / 2, 1, 0, Math.PI * 2);
    var start_cyrcle = new Graphic(canvas.width / 2, canvas.height / 2, 3, 0, Math.PI * 2);
    var corner_cyrcle1 = new Graphic(0, 0, 15, 0, Math.PI * 2);
    var corner_cyrcle2 = new Graphic(0, canvas.height, 15, 0, Math.PI * 2)
    var corner_cyrcle3 = new Graphic(canvas.width, 0, 15, 0, Math.PI * 2)
    var corner_cyrcle4 = new Graphic(canvas.width, canvas.height, 15, 0, Math.PI * 2)
    var half_cyrcle1 = new Graphic(canvas.width / 5, canvas.height / 2, 50, 1.5 * Math.PI, 0.5 * Math.PI);
    var half_cyrcle2 = new Graphic(canvas.width - (canvas.width / 5), canvas.height / 2, 50, -1.5 * Math.PI, -0.5 * Math.PI);

    cyrcle.draw_cyrcle();
    penalcyrcle.draw_cyrcle();
    penalcyrcle1.draw_cyrcle();
    start_cyrcle.draw_cyrcle();
    corner_cyrcle1.draw_cyrcle();
    corner_cyrcle2.draw_cyrcle();
    corner_cyrcle3.draw_cyrcle();
    corner_cyrcle4.draw_cyrcle();
    half_cyrcle1.draw_cyrcle();
    half_cyrcle2.draw_cyrcle();
  }
  static start_play_area() {
    Graphic.vertical_line();
    Graphic.horizontal_line()
    Graphic.cyrcle_area()
  }

}

class Ball {
  constructor(dx, dy, x, y, r, color) {
    this.dx = dx;
    this.dy = dy;
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  draw_ball() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  ball_update() {
    //ball and rect concat
    for (var i = 0; i < player_num; i++) {
      if (this.x < players[i].x + players[i].height + this.r &&
        ((this.y > players[i].y) && (this.y < players[i].y + players[i].width))
      ) {

        this.dx = -this.dx;
      }

      if (this.x < players[i].x - this.r &&
        ((this.y > players[i].y) && (this.y < players[i].y + players[i].width))
      ) {

        this.dx = -this.dx;
      }
      if (((this.y <= players[i].y + players[i].width + this.r) && (this.y + this.r >= players[i].y)) &&
        ((this.x + 5 > players[i].x) && (this.x < players[i].x + players[i].height))
      ) {

        this.dy = -this.dy;
      }
    }

    //frame concat
    if ((this.y > ((canvas.height - canvas.height / 3) - line_width)) || (this.y < ((canvas.height - canvas.height / 3) - canvas.height / 3))) {
      if (this.x - this.r <= 0) this.dx = -this.dx;

    }
    if ((this.y > ((canvas.height - canvas.height / 3) - line_width)) || (this.y < ((canvas.height - canvas.height / 3) - canvas.height / 3))) {
      if (this.x + this.r >= width) this.dx = -this.dx;

    }
    /// goal and reset position of ball and player
    if (this.x < -5) {
      play()
      countRed++;
      players[0].y = canvas.height / 2 - 25;
      players[0].x = 10;
      players[1].y = canvas.height / 2 - 25;
      players[1].x = canvas.width - 10 - 50;
      this.y = canvas.height / 2;
      this.x = canvas.width / 2;
    }
    if (this.x > canvas.width + 5) {
      play()
      countBlue++;
      players[0].y = canvas.height / 2 - 25;
      players[0].x = 10;
      players[1].y = canvas.height / 2 - 25;
      players[1].x = canvas.width - 10 - 50;
      this.y = canvas.height / 2;
      this.x = canvas.width / 2;
    }

    if (this.y - this.r <= 0) this.dy = -this.dy;
    if (this.y + this.r >= height) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
  }

  static generate_ball() {
    for (var i = 0; i < ball_num; i++) {
      balls[i] = new Ball(RandomSign.generateRandomInteger(), RandomSign.generateRandomInteger(), this.x = canvas.width / 2, canvas.height / 2, 10, "yellow");
    }
  }
}

Ball.generate_ball();

class Player {
  constructor(dx, dy, x, y, width, height, color) {
    this.dx = dx;
    this.dy = dy;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw_player() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update_player1() {
    // player in place
    if ((this.x >= 0) && (this.x + this.width <= width) && (this.y >= 0) && (this.y + this.height <= height)) {
      if (pressUp) this.y += this.dy;
      if (pressDown) this.y -= this.dy;
      if (pressRight) this.x += this.dx;
      if (pressLeft) this.x -= this.dx;
    } else {
      if (this.y + 50 >= canvas.height) {
        this.y = this.y - 2;
      }
      if (this.x + 50 >= canvas.width) {
        this.x = this.x - 2;
      }
      if (this.y <= 0) {
        this.y = this.y + 2;
      }
      if (this.x <= 0) {
        this.x = this.x + 2;
      }
    }

  }
  update_player2() {
    // player in plac
    if ((this.x >= 0) && (this.x + this.width <= width) && (this.y >= 0) && (this.y + this.height <= height)) {

      if (pressUp1) this.y += this.dy;
      if (pressDown1) this.y -= this.dy;
      if (pressRight1) this.x += this.dx;
      if (pressLeft1) this.x -= this.dx;

    } else {
      if (this.y + 50 >= canvas.height) {
        this.y = this.y - 2;
      }
      if (this.x + 50 >= canvas.width) {
        this.x = this.x - 2;
      }
      if (this.y <= 0) {
        this.y = this.y + 2;
      }
      if (this.x <= 0) {
        this.x = this.x + 2;
      }
    }
  }

  static generate_player() {
    for (var i = 0; i < player_num; i++) {
      if (i % 2 == 0) {
        players[i] = new Player(1, -1, 10, canvas.height / 2 - 25, 50, 50, "blue");
      } else {
        players[i] = new Player(1, -1, canvas.width - 50 - 10, canvas.height / 2 - 25, 50, 50, "red");
      }
    }
  }
}


function result() {
  document.getElementById("demo").innerHTML = countBlue + " : " + countRed;
}

Player.generate_player();
class Main {
  static main_() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Graphic.start_play_area();

    for (var j = 0; j < ball_num; j++) {
      balls[j].draw_ball();
      balls[j].ball_update();
    }
    for (var i = 0; i < players.length; i++) {
      players[i].draw_player();
      if (i % 2 == 0) {
        players[i].update_player1();
      } else {
        players[i].update_player2();
      }
    }
    result();
  }

  static start() {
    setInterval(Main.main_, 1)
  }
}
