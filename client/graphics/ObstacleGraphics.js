import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { ease } from 'pixi-ease'


class ObstacleGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.name = state.name
        this.width = state.width
        this.height = state.height
        this.color = state.color
        this.rotation = state.angle

        this.wrapper = new PIXI.Container()

        if(this.name == "libbyVideoPreview") {
            this.videoTexture = PIXI.Texture.from('/video/Libby.mp4');
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.loop = true
            this.videoTexture.baseTexture.resource.source.playsinline = true
            this.videoTexture.baseTexture.resource.autoPlay = true
            this.videoTexture.baseTexture.resource.volume = 0
            //this.videoTexture.baseTexture.resource.updateFPS = 10

            this.displacementSprite = PIXI.Sprite.from('images/displacement-1.png')
            this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
            this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)

            this.displacementFilter.padding = 0

            const video = this.videoTexture.baseTexture.resource.source
            video.muted = true
            video.playbackRate = 0.5;

            const videoSprite = new PIXI.Sprite(this.videoTexture);

            videoSprite.width = state.width;
            videoSprite.height = state.height;
            this.wrapper.addChild(videoSprite);

        } else {

            this.body = new Graphics()
            this.body.lineStyle(0)
            this.body.beginFill(PIXI.utils.string2hex(state.color), 1.0, true)
            if(state.name == "merryGoRound") {
                this.body.pivot.set(0.5)
                this.body.drawRect(-state.width/2, -state.height/2, state.width, state.height)
                console.log('log')
            } else {
                this.body.drawRect(0, 0, state.width, state.height)
            }
            
            this.body.endFill()
            this.wrapper.addChild(this.body)
            
        }
        
        
        this.addChild(this.wrapper)

        this.interactive = true
        this.buttonMode = true



        this.count = 0.01
        
    }

    addSticker(value){
        if(value > 1) {
            let choice = Math.floor(Math.random() * (4 - 1) + 1)
            if(choice == 1) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-calm.svg');
            } else if (choice == 2) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-sad.svg');
            } else if (choice == 3) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker.svg');
            }
            let size = Math.floor(Math.random() * (6 - 2) + 1)
            this.smileyStamp.width = size*10;
            this.smileyStamp.height = size*10;
            this.smileyStamp.x = Math.floor(Math.random() * (300) - 150)
            this.smileyStamp.y = Math.floor(Math.random() * (300)  - 150)
            let angle = Math.floor(Math.random() * (360 - 1) + 1)
            this.smileyStamp.scale.set(3)
            this.smileyStamp.angle = angle 
            this.smileyStamp.anchor.set(0.5, 0.5)
            this.smileyStamp.alpha = 0
            this.addChild(this.smileyStamp)
            ease.add(this.smileyStamp, {alpha: 1, scale: 0.5}, { duration: 150, ease: 'easeOutExpo' })

        }
    }

   

    update(delta) {

        let rotation = this.angle
        let pi = Math.PI
        rotation = rotation * (180/pi)
        //console.log(rotation)
        if(this.name == "merryGoRound") {
            this.angle = rotation + 45//-0.785398
        } else {
            this.angle = rotation
        }
       
        
        if(this.name == "libbyVideoPreview") {
            
            this.displacementFilter.scale.x = 20 * Math.sin(this.count)//1
            this.displacementFilter.scale.y = 20 * Math.sin(this.count*1.5)
            this.count = this.count + 0.01
            this.wrapper.filters =  [this.displacementFilter]
        }
    }
}

export default ObstacleGraphics