import * as PIXI from 'pixi.js'


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
        this.angle = state.angle
        

        
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

            this.body = new PIXI.Graphics()
            this.body.beginFill(PIXI.utils.string2hex(state.color))
            this.body.drawRect(0, 0, state.width, state.height)
            this.body.endFill()
            this.wrapper.addChild(this.body)
            
        }
        
        
        this.addChild(this.wrapper)

        this.count = 0.01
        
    }

   

    update(delta) {
        
        if(this.name == "libbyVideoPreview") {
            
            this.displacementFilter.scale.x = 20 * Math.sin(this.count)//1
            this.displacementFilter.scale.y = 20 * Math.sin(this.count*1.5)
            this.count = this.count + 0.01
            //this.wrapper.filters =  [this.displacementFilter]
        }
    }
}

export default ObstacleGraphics