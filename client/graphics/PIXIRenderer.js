
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
import { AsciiFilter } from '@pixi/filter-ascii'

class PIXIRenderer {

    constructor(client) {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.collection = []

        let resolution = window.devicePixelRatio

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            antialias: true,
            resolution: resolution
        })

        PIXI.settings.ROUND_PIXELS = true
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR

        

        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()

        this.background = new PIXI.Container()
        this.backbackground = new PIXI.Container()
        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()

        this.UIBuilder = new UIBuilder(this.renderer, client);    

        this.cameraWrapper = new PIXI.Container()

        this.cameraWrapper.addChild(this.backbackground)
        this.cameraWrapper.addChild(this.background)
        this.cameraWrapper.addChild(this.middleground)
        this.cameraWrapper.addChild(this.foreground)

        this.noise = new PIXI.filters.NoiseFilter(0.01, 0.2893);
        this.stage.filters = [this.noise]

        this.camera.x = 6000
        this.camera.y = 6000
        this.camera.addChild(this.cameraWrapper)

        this.stage.addChild(this.camera)
        this.stage.addChild(this.UIBuilder)

        const fpsCounter = new PixiFps();
        //this.stage.addChild(fpsCounter)











        
        //FISHIES
        this.fishCountOne = 7;
        this.fishCountTwo = 2;
        this.fishes = [];
        this.bounds = new PIXI.Rectangle(
            0,
            0,
            window.innerWidth + 500,
            window.innerHeight + 500,
        );

        for (let i = 0; i < this.fishCountOne; i++){
            const fish = new PIXI.Sprite.from('images/fish.svg');

            fish.anchor.set(0.5);

            fish.direction = Math.random() * Math.PI * 2;
            fish.speed = 2 + (Math.random() * 2);
            fish.turnSpeed = Math.random() - 0.8;

            fish.x = Math.random() * 1000;
            fish.y = Math.random() * 1000;

            fish.scale.set(0.3 + (Math.random() * 0.8));
            //this.backbackground.addChild(fish);
            fish.alpha = 0.5
            //this.fishes.push(fish)
        }

        for (let i = 0; i < this.fishCountTwo; i++){
            const fish = new PIXI.Sprite.from('images/fish-white.svg');

            fish.anchor.set(0.5);

            fish.direction = Math.random() * Math.PI * 2;
            fish.speed = 2 + (Math.random() * 2);
            fish.turnSpeed = Math.random() - 0.8;

            fish.x = Math.random() * 1000;
            fish.y = Math.random() * 1000;
            fish.alpha = 0.2

            fish.scale.set(2.3 + (Math.random() * 0.8));
            //this.backbackground.addChild(fish);
            //this.fishes.push(fish);
        }


        
        this.ascaiiFilter = new AsciiFilter()
        
        this.displacementSprite = PIXI.Sprite.from('images/displacement-3.png');
	    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
        this.displacementFilter.padding = 50
        
        


        
        window.addEventListener('resize', () => {
            this.resize()
        })
    }


    
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
        this.UIBuilder.resize(window.innerWidth, window.innerHeight)
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
        this.renderer.render(this.stage)
        this.UIBuilder.update(delta)


        this.displacementSprite.y = delta*500
        this.displacementSprite.x = delta*500


        //this.backbackground.filters =  [this.ascaiiFilter, this.displacementFilter]


        for (let i = 0; i < this.fishes.length; i++) {
            const fish = this.fishes[i];

            fish.direction += fish.turnSpeed * 0.01;

            fish.x += Math.sin(fish.direction) * fish.speed;
            fish.y += Math.cos(fish.direction) * fish.speed;

            fish.rotation = -fish.direction - (Math.PI / 2);

            if (fish.x < this.bounds.x)
            {
                fish.x += this.bounds.width;
            }
            if (fish.x > this.bounds.x + this.bounds.width)
            {
                fish.x -= this.bounds.width;
            }
            if (fish.y < this.bounds.y)
            {
                fish.y += this.bounds.height;
            }
            if (fish.y > this.bounds.y + this.bounds.height)
            {
                fish.y -= this.bounds.height;
            }
        }
    }
}

export default PIXIRenderer
