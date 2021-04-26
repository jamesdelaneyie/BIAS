import * as PIXI from 'pixi.js'
import BackgroundGrid from './BackgroundGrid.js'
import { Joystick }  from './Joystick.js'
import p2 from 'p2'

        // p2→pixi
        function p2ToPixiX(p2X) {
            return p2X * 100;
        }
        function p2ToPixiY(p2Y) {
            return -(p2Y * 100);
        }
        function p2ToPixiValue(p2Value) {
            return p2Value * 100;
        }
        
        // pixi→p2
        function pixiToP2X(pixiX) {
            return pixiX / 100;
        }
        function pixiToP2Y(pixiY) {
            return -(pixiY / 100);
        }
        function pixiToP2Value(pixiValue) {
            return pixiValue / 100;
        }


class PIXIRenderer {

    constructor() {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.world = new p2.World({gravity: [0, 9.82]});
        this.graphics = new PIXI.Graphics();
        this.graphicCircle = new PIXI.Graphics();
        this.itemList = []


        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            antialias: true,
            transparent: false,
            resolution: 1
        })


        var wallMaterial = new p2.Material();
        function createWall(world, middleground, x, y, w, h, rotation) {
          var p2X = pixiToP2X(x);
          var p2Y = pixiToP2Y(y);
          var p2W = pixiToP2Value(w);
          var p2H = pixiToP2Value(h);
          var shape = new p2.Box({
              width:w, 
              height:h,
          });
          var body = new p2.Body({
              mass:0,
              position: [x, y],
              angle: -0.1
          });
          body.addShape(shape);
          world.addBody(body);
          
          shape.material = wallMaterial;
          
          var graphic = new PIXI.Graphics();
          graphic.beginFill(0x666666);
          console.log('x:' + x + ' y:' + y + ' w:' + w + ' h:' +h);
          graphic.drawRect(-w/2, -h/2, w, h);
          //graphic.drawCircle(0, 0, 10);
          graphic.endFill();
          graphic.pivot.set(0.5, 0.5);
          graphic.x = x;
          graphic.y = y;
          graphic.rotation = -0.1;
          middleground.addChild(graphic);
          graphic.body = body;
          graphic.shape = shape;
        }

    

        var circleShape = new p2.Circle({ radius: 60 });
        var circleMaterial = new p2.Material();
        circleShape.material = circleMaterial;
        var circleBody = new p2.Body({
            mass: 5,
            position: [0, 0],
            angle: 0,
            velocity: [0, 0],
            angularVelocity: 0
        });
        
    
        

        var boxVsBall = new p2.ContactMaterial(circleMaterial, wallMaterial, {
            // friction
            friction: 0.5,
            // bounce
            restitution: 1
            // see p2 docs for other options allowed here
        });
        this.world.addContactMaterial(boxVsBall);


        circleBody.addShape(circleShape);
        this.world.addBody(circleBody);
        this.itemList.push(circleBody);

        this.graphicCircle.beginFill(0xffffff);
        this.graphicCircle.drawCircle(30, 30, 30);
        this.graphicCircle.endFill();

        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()
        this.background = new PIXI.Container()
        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)
        this.stage.addChild(this.camera)

        this.background.addChild(new BackgroundGrid())

        this.middleground.addChild(this.graphicCircle)

        createWall(this.world, this.middleground, 0, 200, 500, 20, 0)

        const style = new PIXI.TextStyle({
            font : '72px Helvetica',
            fill : 0xffffff,
            cacheAsBitmap: true // for better performance
            //height: 57,
            //width: 82
        });
        const text = new PIXI.Text('Bias Space, you\'re here!', style);
        this.middleground.addChild(text);
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;

        this.controller = new Joystick({
            onStart: () => console.log('start'),
            onEnd: () => console.log('end'),
        });
        this.stage.addChild(this.controller);

        window.addEventListener('resize', () => {
            this.resize()
        })

        this.resize()
    }


    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
        this.controller.position.set(this.controller.width, window.innerHeight - this.controller.height);
    }
 
    centerCamera(entity) {
        this.camera.x = -entity.x + 0.5 * window.innerWidth
        this.camera.y = -entity.y + 0.5 * window.innerHeight
    }

    followSmoothlyWithCamera(entity, delta) {
        const cameraSpeed = 5
        const targetX = -entity.x + 0.5 * window.innerWidth
        const targetY = -entity.y + 0.5 * window.innerHeight
        const dx = targetX - this.camera.x
        const dy = targetY - this.camera.y
        this.camera.x += dx * cameraSpeed * delta
        this.camera.y += dy * cameraSpeed * delta
    }

    toWorldCoordinates(mouseX, mouseY) {
        return {
            x: -this.camera.x + mouseX,
            y: -this.camera.y + mouseY
        }
    }

    update(delta) {
        this.entities.forEach(entity => {
            entity.update(delta)
        })

        // Move physics bodies forward in time
        this.world.step(1/10);

        for (var i = this.itemList.length - 1; i >= 0; i--) {
          var graphic = this.itemList[i];
          //if (graphic.body.world && graphic.shape.type == p2.Shape.CIRCLE) {
              var x = this.world.bodies[0].position[0];
              var y = this.world.bodies[0].position[1];
              this.graphicCircle.position.set(x,y)
              //this.graphicCircle.position.set(x,y)

          //}
        }
        //console.log(delta);
        

        //console.log()

        //console.log(this.world.boxBody.position[0])
        
        //this.graphics.position.set(this.world.bodies[0].position[0], this.world.bodies[0].position[1]) 
        //this.graphicCircle.position.set(this.world.bodies[1].position[0], this.world.bodies[1].position[1]) 

        //console.log(this.graphics.position.set(x, 0)
        // Transfer positions of the physics objects to Pixi.js
        //console.log(this.world.boxBody.position[0])//.graphics.x = this.world.boxBody.position[0];
        //this.middleground.graphics.y = this.world.boxBody.position[1];
        //this.middleground.graphics.rotation =   boxBody.angle;

        this.renderer.render(this.stage)
    }
}

export default PIXIRenderer
