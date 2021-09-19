
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
import TaggedText from 'pixi-tagged-text'
 
import { CRTFilter } from '@pixi/filter-crt'
import { AsciiFilter } from '@pixi/filter-ascii'

var FontFaceObserver = require('fontfaceobserver');

class PIXIRenderer {

    constructor() {
        this.canvas = document.getElementById('main-canvas')
        this.entities = new Map()
        this.collection = []

        let resolution
        if(window.innerWidth < 500) {
            resolution = 1
        } else {
            resolution = window.devicePixelRatio
        }

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth, 
            height: window.innerHeight, 
            view: this.canvas,
            antialias: true,
            transparent: false,
            resolution: resolution
        })
        

        this.stage = new PIXI.Container()
        this.camera = new PIXI.Container()

        this.background = new PIXI.Container()
        this.backbackground = new PIXI.Container()
        this.middleground = new PIXI.Container()
        this.foreground = new PIXI.Container()
        
        var font = new FontFaceObserver('Trade Gothic Next');
        this.UIBuilder = new UIBuilder(this.renderer);    
        
        font.load()

        this.cameraWrapper = new PIXI.Container()

        this.cameraWrapper.addChild(this.backbackground)
        this.cameraWrapper.addChild(this.background)
        this.cameraWrapper.addChild(this.middleground)
        this.cameraWrapper.addChild(this.foreground)

        //this.noise = new PIXI.filters.NoiseFilter(0.01, 0.2893);
        //this.stage.filters = [this.noise]

        this.introCRTFilter = new CRTFilter({
            vignetting: 0.1,
            vignettingAlpha: 1,
            vignettingBlur: 0.1,
            padding: 0,
            animating: true,
            verticalLine: true,
            lineContrast: 0.005,
            noise: 0.005,
            noiseSize: 1.0,
            padding: 4,
        })
        

       // this.cameraWrapper.filters = [this.introCRTFilter]
        
        this.camera.x = 6000
        this.camera.y = 6000
        this.camera.addChild(this.cameraWrapper)

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
            this.backbackground.addChild(fish);
            fish.alpha = 0.5
            this.fishes.push(fish)
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
            this.backbackground.addChild(fish);
            this.fishes.push(fish);
        }


        
        this.ascaiiFilter = new AsciiFilter()
        
        this.displacementSprite = PIXI.Sprite.from('images/displacement-3.png');
	    this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)
        this.displacementFilter.padding = 50

















        const scienceGalleryLogo = PIXI.Sprite.from('images/sg-white.svg');
        scienceGalleryLogo.x = 11050
        scienceGalleryLogo.y = 5605
        scienceGalleryLogo.alpha = 1
        scienceGalleryLogo.width = 187
        scienceGalleryLogo.height = 90

        this.middleground.addChild(scienceGalleryLogo)

       

        const welcomeText = new TaggedText("Welcome to <bold>BIAS ONLINE</bold>\nA real-time virtual exhibition space at Science Gallery Dublin", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "18px",
                wordWrap: true,
                fill: "#FFFFFF",
                lineHeight: 24,
                padding: 10,
                wordWrapWidth: 300,
                leading: 1,
                align: "center",
                textBaseline: "middle"
            },
            "bold": {
                fontWeight: 900,
                fontSize: "18px",
                lineHeight: 24,
            }
        });
        welcomeText.alpha = 0
        welcomeText.x = (11055-60)
        welcomeText.y = 5720
        this.middleground.addChild(welcomeText)
       




        const controlsDesktop = new PIXI.Sprite.from('images/wasd-controls.svg');
        controlsDesktop.anchor.set(0.5);
        controlsDesktop.width = 267
        controlsDesktop.height = 229
        controlsDesktop.x = 11150
        controlsDesktop.y = 6130
        controlsDesktop.alpha = 0.5
        this.middleground.addChild(controlsDesktop)





        const desktopControlsTextLeft = new TaggedText("Use the WASD keys to \nmove your character", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "16px",
                fill: "#FFFFFF",
                lineHeight: 24,
            }
        });
        desktopControlsTextLeft.alpha = 0
        desktopControlsTextLeft.x = 10850
        desktopControlsTextLeft.y = 5925
        this.middleground.addChild(desktopControlsTextLeft)


        const desktopControlsTextRight = new TaggedText("Bump into objects\nto activate them", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "16px",
                fill: "#FFFFFF",
                align: "right",
                lineHeight: 24,
            }
        });
        desktopControlsTextRight.alpha = 0
        desktopControlsTextRight.x = 10950
        desktopControlsTextRight.y = 5925
        this.middleground.addChild(desktopControlsTextRight)


        const downArrowFloor = new PIXI.Sprite.from('images/floor-arrow-down.svg');
        downArrowFloor.anchor.set(0.5);
        downArrowFloor.width = 32
        downArrowFloor.height = 42
        downArrowFloor.x = 11150
        downArrowFloor.y = 6300
        downArrowFloor.alpha = 0.25
        this.middleground.addChild(downArrowFloor)



        setTimeout(function(){
            welcomeText.alpha = 1
            desktopControlsTextLeft.alpha = 0.5
            desktopControlsTextRight.alpha = 0.5
        }, 200)




        const texture = PIXI.Texture.from('images/blue-black-capsule-pattern.svg');
        const tilingSprite = new PIXI.TilingSprite(texture, 400, 200);
        tilingSprite.x = 800
        tilingSprite.y = 900
        this.middleground.addChild(tilingSprite);

        const scienceGalleryLogoFull = new PIXI.Sprite.from('images/science-gallery-full-logo.svg');
        scienceGalleryLogoFull.anchor.set(0.5);
        scienceGalleryLogoFull.x = 1000
        scienceGalleryLogoFull.y = 1000
        this.middleground.addChild(scienceGalleryLogoFull)

        



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



/*

        const introScreen = new PIXI.Container()
        introScreen.width = window.innerWidth
        introScreen.height = window.innerHeight

        const introBackground = new PIXI.Graphics()
        introBackground.beginFill(0xFF0000)
        introBackground.drawRect(0, 0, window.innerWidth, window.innerHeight)
        introBackground.endFill()
        introScreen.addChild(introBackground)

        const introText = new TaggedText("BIAS", {
            "default": {
                fontFamily: "Trade Gothic Next",
                fontSize: "54px",
                fontWeight: 900,
                align: "center"
            }
        })
        introText.alpha = 0
        setTimeout(function(){ 
            introText.alpha = 1
        }, 200)
        
        //introText.anchor.set(0.5);
        introText.x = window.innerWidth/2
        introText.y = window.innerHeight/2
        introScreen.addChild(introText)
        this.stage.addChild(introScreen)


      */

        
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


        this.backbackground.filters =  [this.ascaiiFilter, this.displacementFilter]
    

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
