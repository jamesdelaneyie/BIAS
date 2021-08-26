
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'

import { CRTFilter } from '@pixi/filter-crt'
import { EmoteSelector } from 'pixi-emote-selector'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'

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
        
        var font = new FontFaceObserver('Trade Gothic');
        this.UIBuilder = new UIBuilder();    
        
        font.load().then(function () {
            //this.UIBuilder = new UIBuilder();    
        });
        
        

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)
        
        

        
        

        this.stage.addChild(this.camera)
        this.stage.addChild(this.UIBuilder)

        //PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.sprite = PIXI.Sprite.from('images/bunny.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = window.innerWidth / 2;
        this.sprite.y = window.innerHeight / 2;
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;

        

        // Pointers normalize touch and mouse
        this.sprite.on('pointerdown', this.onClick);

        // Alternatively, use the mouse & touch events:
         //this.sprite.on('click', onClick); // mouse-only
         //this.sprite.on('tap', onClick); // touch-only

        //this.foreground.addChild(this.sprite);
        
        window.addEventListener('resize', () => {
            this.resize()
        })
    }

    onClick(){
        console.log(this.x)
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
        this.UIBuilder.update()
    }
}

export default PIXIRenderer
