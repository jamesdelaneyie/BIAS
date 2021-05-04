
var Ball = (function () {

  function Ball(game, position) {

    P2Pixi.GameObject.call(this, game);

    var ball = new p2.Body({
      mass: 0.1,
      position: position
    });

    var ballCircle = new p2.Circle({ radius: 1 });
    ballCircle.material = game.ballMaterial;

    this.addBody(ball).addShape(ball,ballCircle,{});
  }

  Ball.prototype = Object.create(P2Pixi.GameObject.prototype);


  return Ball;
})();


var Terrain = (function () {

  function Terrain(game) {

    P2Pixi.GameObject.call(this, game);

    var wall = new p2.Body({
      mass: 0,
      position: [0, -2.75]
    });

    var wallBox = new p2.Box({ 
      width: 5.75, 
      height: 0.25
    });

    wallBox.material = game.hardMaterial;

    this.addBody(wall).addShape(wall, wallBox, {});

  }

  Terrain.prototype = Object.create(P2Pixi.GameObject.prototype);

  return Terrain;
})();



  var Game = (function () {

    function Game() {

      var options = {
        worldOptions: {
          gravity: [0, -9.2]
        },
        pixiAdapterOptions: {
          rendererOptions: {
            view: document.getElementById('viewport'),
            transparent: true, 
            antialias: true
          }
        },
        assetUrls: [
          'img/tile-pink.png',
        ]
      };

      P2Pixi.Game.call(this, options);
    }

    Game.prototype = Object.create(P2Pixi.Game.prototype);

    Game.prototype.beforeRun = function () {

      this.ballMaterial = new p2.Material();
      this.hardMaterial = new p2.Material();
      this.world.addContactMaterial(new p2.ContactMaterial(this.ballMaterial, this.hardMaterial, {
        restitution: 1,
        friction: 1
      }));

      var terrain = new Terrain(this);
      this.addGameObject(terrain);

      var ball = new Ball(this, [-1, 1]);
      this.addGameObject(ball);

      document.getElementById('loading').style.display = 'none';
      document.getElementById('viewport').style.display = 'block';
    };

    return Game;
  })();

  new Game();
