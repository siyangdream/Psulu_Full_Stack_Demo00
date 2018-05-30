//Global Variable (since it has to be interacted with html5, and it will be easier)
var background;
var submarine;
var finish_line;

var graphics;

//Obstacles
//So far just manually copy data from map2 ***Remember to deal with y which should be 1 - y in this js phaser map***
//Still planning on upload the map data in frontend method or backend method, but not a problem in this development stage
var obs_105 = [[0.75, 0.25000000000000006], [0.8, 0.25000000000000006], [0.8, 0.30000000000000004], [0.75, 0.30000000000000004]];
var obs_110 = [[0.16666666666666666, 0.16666666666666669], [0.21666666666666667, 0.16666666666666669], [0.21666666666666667, 0.21666666666666667], [0.16666666666666666, 0.21666666666666667]];
var obs_126 = [[0.5, 0.08333333333333341], [0.55, 0.08333333333333341], [0.55, 0.13333333333333341], [0.5, 0.13333333333333341]];
var obs_20 = [[0.6666666666666666, 0.8333333333333333], [0.7166666666666667, 0.8333333333333333], [0.7166666666666667, 0.8833333333333333], [0.6666666666666666, 0.8833333333333333]];
var obs_26 = [[0.16666666666666666, 0.75], [0.21666666666666667, 0.75], [0.21666666666666667, 0.8], [0.16666666666666666, 0.8]];
var obs_31 = [[0.5833333333333333, 0.75], [0.6333333333333333, 0.75], [0.6333333333333333, 0.8], [0.5833333333333333, 0.8]];
var obs_36 = [[0.0, 0.6666666666666666], [0.05, 0.6666666666666666], [0.05, 0.7166666666666667], [0.0, 0.7166666666666667]];
var obs_39 = [[0.25, 0.6666666666666666], [0.3, 0.6666666666666666], [0.3, 0.7166666666666667], [0.25, 0.7166666666666667]];
var obs_42 = [[0.5, 0.6666666666666666], [0.55, 0.6666666666666666], [0.55, 0.7166666666666667], [0.5, 0.7166666666666667]];
var obs_54 = [[0.5, 0.5833333333333334], [0.55, 0.5833333333333334], [0.55, 0.6333333333333334], [0.5, 0.6333333333333334]];
var obs_57 = [[0.75, 0.5833333333333334], [0.8, 0.5833333333333334], [0.8, 0.6333333333333334], [0.75, 0.6333333333333334]];
var obs_77 = [[0.41666666666666663, 0.4166666666666667],[0.4666666666666666, 0.4166666666666667], [0.4666666666666666, 0.4666666666666667], [0.41666666666666663, 0.4666666666666667]]
var obs_78 = [[0.5, 0.4166666666666667], [0.55, 0.4166666666666667], [0.55, 0.4666666666666667], [0.5, 0.4666666666666667]];

//Map is defined as 1100 * 1100
//Then, scale would be 1000 and bias would be 100 in this case
var scale = 1000;
var bias = 100;
var m2pos = [obs_105, obs_110, obs_126, obs_20, obs_26, obs_31, obs_36, obs_39, obs_42, obs_54, obs_57, obs_77, obs_78];
var map2_obstacles_object = [];




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
    
    //*Draw Background
    background = this.game.add.sprite(0, 0, 'background'); // two roles here : one is to add sprite, the other one is to assign reference
    
    //*Draw Submarine
    submarine = this.game.add.sprite(100, 1000, 'submarine');
    submarine.anchor.setTo(0.5, 0.5);
    submarine.scale.setTo(-0.08, 0.08);
    this.game.physics.arcade.enable(submarine);
    
    //*Draw Finish Line
    finish_line = this.game.add.sprite(1000, 100, 'finish_line');
    finish_line.anchor.setTo(0.5, 0.5);
    finish_line.scale.setTo(0.3, 0.3);
    this.game.physics.arcade.enable(finish_line);
    //finish_line.body.immovable = true;
    
    //*Draw Obstacle Objects
    for (var i = 0; i < m2pos.length; ++i) {
        var polyObject = new Phaser.Polygon([ new Phaser.Point(bias + m2pos[i][0][0] * scale, (1 - m2pos[i][0][1]) * scale), new Phaser.Point(bias + m2pos[i][1][0] * scale, (1 - m2pos[i][1][1]) * scale), new Phaser.Point(bias + m2pos[i][2][0] * scale, (1 - m2pos[i][2][1]) * scale), new Phaser.Point(bias + m2pos[i][3][0] * scale, (1 - m2pos[i][3][1]) * scale) ]);
        map2_obstacles_object.push(polyObject)
    }

    graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xD7FF33);
    for (var i = 0; i < map2_obstacles_object.length; ++i) {
        graphics.drawPolygon(map2_obstacles_object[i].points); //it is possible that in future phaser.poly.points will be deprecated according to official documenthttps://www.w3schools.com/jsref/jsref_length_array.asp
    }
    graphics.endFill();
    
    
    
      
  },
  
  //this is executed multiple times per second
  update: function() {
      
      //Events:
      //*Reach the target and won the game!
//      if (submarine.x == 1000 && submarine.y == 100) {
//          alert("Won!!!");
//          game.state.start('GameState');
//      }
      
      //*Crash into obstacles and lost the game!
      //ps. I have to say, I hate this O(n) check, but it can be improved later by Cache or other algorithm
      for (var i = 0; i < m2pos.length; ++i) {
          if (isInPolygon(submarine.x, submarine.y, m2pos[i]) == true) {
              alert("Crashed and Failed!!!");
              game.state.start('GameState');
          }
      }
      
      
      
      //Overlap event
      
      //reach the finish line
      //this.game.physics.arcade.overlap(submarine, tmp, this.gameFailed);

      
  },

  //MARK: Helper functions for failing the game
//  gameFailed: function(submarine, obstacles) {
//      alert("Failed!!!")
//      game.state.start('GameState');
//  }
    
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
    
    //*Callback Events!
    submarine_movement.onComplete.add(function(){
      //*Reach the target and won the game!    
      if (submarine.x == 1000 && submarine.y == 100) {
        alert("Won!!!");
        game.state.start('GameState');
      }
      //*Crash into obstacles and lost the game!
        
    }, this);
    
    submarine_movement.start()

}



//////////////////////////////////////////////////////////////////////////////////////////
//MARK : Helpers Function

//Inside the Polygon Judge --- Winding Number Algorithm
/*
 * @parameter: px - submarine curr postion X
 *             py - submarine curr position Y
 *             poly - coordinates like [[x1, y1], [x2, y2], [x3, y3], ...]
 * @return: true - isInside the Polygon, false - Outside the Polygon
 */
function isInPolygon(px, py, poly) {
    var sum = 0

    for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
      var sx = poly[i][0];
      var sy = poly[i][1];
      var tx = poly[j][0];
      var ty = poly[j][1];

      // If it is on the edge
      if ( (sx - px) * (px - tx) >= 0 && (sy - py) * (py - ty) >= 0 && (px - sx) * (ty - sy) === (py - sy) * (tx - sx) ) {
        return true;
      }

      // angle calculation
      var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px);

      // angle should be in the valid -180 degree ~ 180 degree
      if (angle >= Math.PI) {
        angle = angle - Math.PI * 2;
      } else if (angle <= -Math.PI) {
        angle = angle + Math.PI * 2;
      }

      sum += angle;
    }

    // whether it is in the polygon
    return Math.round(sum / Math.PI) === 0 ? false : true;
}

//////////////////////////////////////////////////////////////////////////////////////////
//MARK: Entry Point

//initiate the Phaser framework
var game = new Phaser.Game(1100, 1100, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');