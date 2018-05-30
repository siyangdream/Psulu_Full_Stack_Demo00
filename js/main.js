//Global Variable (since it has to be interacted with html5, and it will be easier)
var background;
var submarine;
var finish_line;

var graphics;


///////////////////////////////////////////////////////////////////////////////////////////
//MARK: STEP1 : INITIALIZATION ---


//this game will have only 1 state
var GameState = {
  
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/water_background.jpg');
    this.load.image('submarine', 'assets/images/submarine.png');
    this.load.image('finish_line', 'assets/images/finish_line.png');
  },
  
  //executed after everything is loaded
  create: function() {
    
    //Drawing Background
    background = this.game.add.sprite(0, 0, 'background'); // two roles here : one is to add sprite, the other one is to assign reference
    
    //Drawing Submarine
    submarine = this.game.add.sprite(100, 1000, 'submarine');
    submarine.anchor.setTo(0.5, 0.5);
    submarine.scale.setTo(-0.1, 0.1);
    this.game.physics.arcade.enable(submarine);
    
    //Drawing Finish Line
    finish_line = this.game.add.sprite(1000, 100, 'finish_line');
    finish_line.anchor.setTo(0.5, 0.5);
    finish_line.scale.setTo(0.3, 0.3);
    this.game.physics.arcade.enable(finish_line);
    //finish_line.body.immovable = true;
    
    //Drawing Obstacle Objects
    //this.obstacles_group = this.game.add.group();

    poly = new Phaser.Polygon([ new Phaser.Point(500, 166), new Phaser.Point(550, 166), new Phaser.Point(550, 216), new Phaser.Point(500, 216) ]);
    poly0 = new Phaser.Polygon([ new Phaser.Point(700, 166), new Phaser.Point(750, 166), new Phaser.Point(750, 216), new Phaser.Point(700, 216) ]);

    graphics = game.add.graphics(0, 0);
      
    graphics.beginFill(0xFF33ff);
    tmp = graphics.drawPolygon(poly.points);
    graphics.drawPolygon(poly0.points);
    graphics.endFill();
    
    //fill the shapeSprite with graphics objects
      
    this.game.physics.arcade.enable(tmp);  
    
    
      
  },
  
  //this is executed multiple times per second
  update: function() {
      
      //Events:
      //Submarine reachs to the finish line and won the game
      if (submarine.x == 1000 && submarine.y == 100) {
          alert("Won!!!");
          game.state.start('GameState');
      }
      
      
      //Overlap event
      
      //reach the finish line
      this.game.physics.arcade.overlap(submarine, tmp, this.gameFailed);

      
  },

  //MARK: Helper functions for failing the game
  gameFailed: function(submarine, obstacles) {
      alert("Failed!!!")
      game.state.start('GameState');
  }
    
};





//////////////////////////////////////////////////////////////////////////////////////////
//MARK: STEP2 : INTERACTION ---

//Interaction with Front-End User
function submarine_move(x, y) {
    var dx = parseFloat(x);
    var dy = parseFloat(y);
    
    var submarine_movement = game.add.tween(submarine);
    //to(properties, duration, ease, autoStart, delay, repeat, yoyo)
    submarine_movement.to({x: dx, y: dy}, 300);
    //submarine_movement.to({x: dx, y: dy}, 1000, Phaser.Easing.Bounce.Out);
    submarine_movement.start()
}


//initiate the Phaser framework
var game = new Phaser.Game(1100, 1100, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');