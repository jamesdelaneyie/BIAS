
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
 
import { CRTFilter } from '@pixi/filter-crt'
import { AsciiFilter } from '@pixi/filter-ascii'

var FontFaceObserver = require('fontfaceobserver');

class PIXIRenderer {

    constructor() {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.collection = []

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            autoDensity: true,
            antialias: true,
            transparent: false,
            resolution: 2
        })

        

        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()

        this.background = new PIXI.Container()
        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()
        
        var font = new FontFaceObserver('Trade Gothic Next');
        this.UIBuilder = new UIBuilder(this.renderer);    
        
        font.load()

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)

        const noise = new PIXI.filters.NoiseFilter(0.1, 0.2893);
        //this.stage.filters = [noise]
        
        this.camera.x = 500
        this.camera.y = 250

        this.stage.addChild(this.camera)
        this.stage.addChild(this.UIBuilder)

        const fpsCounter = new PixiFps();
        //this.stage.addChild(fpsCounter)

        this.fishCountOne = 7;
        this.fishCountTwo = 2;
        this.fishes = [];
        this.bounds = new PIXI.Rectangle(
            10200,
            5205,

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
            this.foreground.addChild(fish);
            this.fishes.push(fish);
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
            this.foreground.addChild(fish);
            this.fishes.push(fish);
        }


        
        this.ascaiiFilter = new AsciiFilter()
        
        this.displacementSprite = PIXI.Sprite.from('images/displacement-3.png');
	    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
        this.displacementFilter.padding = 50





        const scienceGalleryLogo = PIXI.Sprite.from('images/sg-white.svg');
        scienceGalleryLogo.x = 11050
        scienceGalleryLogo.y = 5805
        scienceGalleryLogo.alpha = 0.5
        scienceGalleryLogo.width = 187
        scienceGalleryLogo.height = 90

        this.middleground.addChild(scienceGalleryLogo)



        const welcomeText = new PIXI.Text('Welcome to BIAS ONLINE.\nA real-time virtual exhibition space at Science Gallery Dublin', {fontFamily: "Trade Gothic Next", fontSize: "18px", fill: "#ffffff", align: "center", lineHeight: 24})
        welcomeText.x = (11055-130)
        welcomeText.y = 5700-50
        welcomeText.alpha = 0.5
        this.middleground.addChild(welcomeText)



        const introText = new PIXI.Text('What is bias? \nWhy and how does it exist?', {fontFamily: "Trade Gothic Next", fontSize: "18px", fill: "#ffffff", align: "center", lineHeight: 24})
        introText.x = 11055
        introText.y = 6000
        introText.alpha = 0.5
        this.middleground.addChild(introText)


        const directionText = new PIXI.Text('TO GALLERY ↓', {fontFamily: "Trade Gothic Next", fontSize: "18px", fontWeight: 700, fill: "#ffffff", align: "center", lineHeight: 24})
        directionText.x = 11090
        directionText.y = 6150
        directionText.alpha = 0
        this.middleground.addChild(directionText)
        setTimeout(function(){
            directionText.alpha = 1
        }, 500)






        const noahBackground = new PIXI.Graphics()
        noahBackground.beginFill(0x000000)
        noahBackground.drawCircle(7600, 525, 85)
        noahBackground.endFill()
        this.middleground.addChild(noahBackground)

        const noahBackgroundTwo = new PIXI.Graphics()
        noahBackground.beginFill(0xFFFFFF)
        noahBackground.lineStyle(2, 0x000000)
        noahBackground.drawCircle(7000, 525, 80)
        noahBackground.endFill()
        this.middleground.addChild(noahBackgroundTwo)



        
        window.addEventListener('resize', () => {
            this.resize()
        })
    }


    
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight)
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

        //this.biasShape.x += delta*50;
        //this.biasShape.y -= delta*50;

        this.displacementSprite.y = delta*500
        this.displacementSprite.x = delta*500


        this.foreground.filters =  [this.ascaiiFilter, this.displacementFilter]
        


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
       // animatedSprite.x = entity.x;
    }
}

export default PIXIRenderer
