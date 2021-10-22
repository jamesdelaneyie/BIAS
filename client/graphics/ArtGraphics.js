import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import TaggedText from 'pixi-tagged-text';
import { ease } from 'pixi-ease'


class ArtGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.name = state.name
        this.type = state.type

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color    
        this.radius = state.radius
       
        this.color = PIXI.utils.string2hex(state.color);


        if(this.name == "<bold>CLASSES</bold>\nLibby Heaney") {
            this.videoTexture = PIXI.Texture.from('/video/Libby.mp4');
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.loop = true
            this.videoTexture.baseTexture.resource.source.playsinline = true
            this.videoTexture.baseTexture.resource.autoPlay = true
            this.videoTexture.baseTexture.resource.volume = 0

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
            videoSprite.x = -state.width/2
            videoSprite.y = -state.height/2

            this.addChild(videoSprite);

        } else {

            this.body = new Graphics()
           
            
            if(this.type == "circle") {

                if(this.name == "<bold>DARK MATTERS</bold>\nJohann Diedrick") {

                    this.body.beginFill(0x000000, 0.6, true)
                    this.body.drawCircle(0, 0, state.width)
                    this.body.beginFill(this.color, 0.5, true)
                    this.body.lineStyle(2, this.color, 0.8)
                    this.body.drawCircle(0, 0, state.width)
                    
                    let color = PIXI.utils.string2hex("#b32186");
                    let lineColor = PIXI.utils.string2hex("#580a85");
                    this.body.lineStyle(3, lineColor, 0.8)
                    this.body.beginFill(color, 0.7, true)
                    this.body.drawCircle(0, 0, state.width/1.5)
                } else if (this.name == "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson") {

                    this.base = new PIXI.Sprite.from('images/large-smiley.svg');
                    this.base.width = state.width
                    this.base.height = state.height
                    this.base.x = -state.width/2
                    this.base.y = -state.height/2
                    this.addChild(this.base)

                } else {
                    this.body.beginFill(0xFFFFFF, 1, true)
                    this.body.drawCircle(0, 0, state.width)
                }

                
                
            } else if (this.type == "triangle") {
                this.body.beginFill(this.color, 1.0, true)
                this.body.lineStyle(0)
                this.body.moveTo(state.width, -state.width);
                this.body.lineTo(0, state.width); 
                this.body.lineTo(-state.width, -state.width);
                this.body.lineTo(0, -state.width);
            } else {
                this.body.beginFill(this.color, 1.0, true)
                this.body.lineStyle(0)
                this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
            }
            
            this.body.endFill()
            this.body.pivot.set(0.5,0.5)
            this.body.scale.set(0.5)
            this.addChild(this.body)

            /*this.text = new TaggedText(state.name, {
                "default": {
                    fontSize: "14px",
                    align: "left",
                    wordWrap: true,
                    wordWrapWidth: 180,
                    align: "center",
                    textDecoration: "underline"
                }, 
                "bold": {
                    fontWeight: 700
                }
            }, {drawWhitespace: true})
            this.text.x = -90
            this.text.y = -15
            if(this.type == "triangle") {
                this.text.y = -70
                let height = this.text.height
                this.text.height = height*1.25
            }
            this.text.anchor.set(0.5, 0.5)
            //this.addChild(this.text)*/


        }

        
       
        
    }

    addSticker(value, x, y){
        if(value > 1) {
            //console.log('checker')
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

        this.count++

    }
}

export default ArtGraphics