
import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import BackgroundGrid from './BackgroundGrid.js'
import UIBuilder from './UIBuilder.js'


import { CRTFilter } from '@pixi/filter-crt'
import { EmoteSelector } from 'pixi-emote-selector'
import MultiStyleText from 'pixi-multistyle-text'
import cryptoRandomString from 'crypto-random-string'

//pass a port via argument
//parse url NODE

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

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)

        this.stage.addChild(this.camera)



        this.background.addChild(new BackgroundGrid({name:'Lobby', width:1000, height:1000}));

        const blurFilter1 = new CRTFilter({
            vignetting: 0.3, 
            vignettingAlpha: 1,
            vignettingBlur: 0.2
        });
        //this.background.filters = [blurFilter1];

        //Build UI
        //this.UILayer = new UIBuilder(); 

        //this.stage.addChild(this.UILayer)


        window.addEventListener('resize', () => {
            this.resize()
            //this.UILayer.resize();
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
        
        //this.UILayer.update();
        this.renderer.render(this.stage)
    }
}

export default PIXIRenderer
