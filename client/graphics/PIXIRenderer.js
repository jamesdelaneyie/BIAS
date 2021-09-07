
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'
import PixiFps from "pixi-fps";
 


import { CRTFilter } from '@pixi/filter-crt'


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
        this.stage.addChild(fpsCounter)





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
    }
}

export default PIXIRenderer
