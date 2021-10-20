import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import TaggedText from 'pixi-tagged-text';


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
            this.body.beginFill(this.color, 1.0, true)
            this.body.lineStyle(0)
            
            if(this.type == "circle") {
                this.body.drawCircle(0, 0, state.width)
                
            } else if (this.type == "triangle") {
                this.body.moveTo(state.width, -state.width);
                this.body.lineTo(0, state.width); 
                this.body.lineTo(-state.width, -state.width);
                this.body.lineTo(0, -state.width);
            } else {
                this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
            }
            
            this.body.endFill()
            this.body.pivot.set(0.5,0.5)
            this.body.scale.set(0.5)
            this.addChild(this.body)

            this.text = new TaggedText(state.name, {
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
            //this.addChild(this.text)


        }

        
       
        
    }

   


    update(delta) {

        this.count++

    }
}

export default ArtGraphics