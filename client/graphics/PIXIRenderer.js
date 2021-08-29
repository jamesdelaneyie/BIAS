
import * as PIXI from 'pixi.js'
import UIBuilder from './UIBuilder.js'

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
        this.UIBuilder = new UIBuilder();    
        
        font.load().then(function () {
            //this.UIBuilder = new UIBuilder();    
        });
        

        this.camera.addChild(this.background)
        this.camera.addChild(this.middleground)
        this.camera.addChild(this.foreground)
        
        this.camera.x = 500
        this.camera.y = 250

        this.stage.addChild(this.camera)
        this.stage.addChild(this.UIBuilder)






    
        //ADD VIDEO
        this.videoTexture = PIXI.Texture.from('/video/video.mp4');
        this.videoTexture.baseTexture.resource.muted = true
        this.videoTexture.baseTexture.resource.autoPlay = false
        
        const videoSprite = new PIXI.Sprite(this.videoTexture);
        
        videoSprite.width = 620;
        videoSprite.height = 348;
        videoSprite.x = -500;
        videoSprite.y = -400;
        videoSprite.rotation = -0.1

        this.foreground.addChild(videoSprite);







        const style = new PIXI.TextStyle({
            fill: "white",
            fontFamily: "Monaco, monospace",
            fontSize: 19,
            fontWeight: 400,
            lineHeight: 25,
            whiteSpace: "breakword",
            wordWrap: true,
            wordWrapWidth: 350,
            leading: 1
        });
        const explainerText = new PIXI.Text('Libbys Room ☝ \n\n Welcome to BIAS Online!\n * Arrows Keys/WASD to Move\n * Tap person to talk\n\n  Play nicely :)', style);
        explainerText.x = 1600
        explainerText.y = 50
        this.foreground.addChild(explainerText)


        const libbyRoomText = new PIXI.Text('Libby\'$ Room \n\n Touch Box to Start Video', style);
        libbyRoomText.x = -400
        libbyRoomText.y = 50
        this.foreground.addChild(libbyRoomText)

        
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
        this.UIBuilder.update()
    }
}

export default PIXIRenderer
