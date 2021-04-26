import * as PIXI from 'pixi.js'
import BackgroundGrid from './BackgroundGrid.js'
import { Joystick }  from './Joystick.js'
import p2 from 'p2'


class PIXIRenderer {

    constructor() {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.world = new p2.World();
        this.graphics = new PIXI.Graphics();

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            antialias: true,
            transparent: false,
            resolution: 1
        })

        var boxShape, boxBody, planeBody, planeShape;

        // Add a box
        boxShape = new p2.Box({ width: 200, height: 100 });
        boxBody = new p2.Body({
            mass:1,
            position:[0,2],
            angularVelocity:1
        });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);

        // Add a plane
        planeShape = new p2.Plane();
        planeBody = new p2.Body({ position:[0,-1] });
        planeBody.addShape(planeShape);
        this.world.addBody(planeBody);

        // Draw the box.
        //graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x00ff00);
        this.graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);

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

        this.middleground.addChild(this.graphics)

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
        this.world.step(1/60);

        //console.log(this.world.boxBody.position[0])
        this.graphics.position.x = this.world.bodies[0].position[0]
        console.log(this.graphics.position.x)
        // Transfer positions of the physics objects to Pixi.js
        //console.log(this.world.boxBody.position[0])//.graphics.x = this.world.boxBody.position[0];
        //this.middleground.graphics.y = this.world.boxBody.position[1];
        //this.middleground.graphics.rotation =   boxBody.angle;

        this.renderer.render(this.stage)
    }
}

export default PIXIRenderer
