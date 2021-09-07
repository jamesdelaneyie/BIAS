import * as PIXI from 'pixi.js'

class BoxGraphics extends PIXI.Container {
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
       
        this.color = PIXI.utils.string2hex(this.color);

        //this.rotation = 1.57

        const type = this.type
        //console.log(type)
        if(this.name == "token") {
            if(this.type == "video") {

                this.body = new PIXI.Graphics()
                this.body.beginFill(this.color)
                this.body.drawRect(state.width/2, state.height/2, state.width, state.height)
                this.body.endFill()

                //this.body.rotation = 1.5708
                this.body.pivot.x = state.width
                this.body.pivot.y = state.height
                this.addChild(this.body)

                //console.log(state.color)


                //this.videoTexture = PIXI.Texture.from('/video/normalising_artist.mp4');


                if(state.color == "#00ffff") {
                    this.videoTexture = PIXI.Texture.from('/video/matters_artist.mp4');
                }
                if (state.color == "#0000ff") {
                    this.videoTexture = PIXI.Texture.from('/video/stealing_artist.mp4');
                }
                if (state.color == "#505050") {
                    this.videoTexture = PIXI.Texture.from('/video/normalising_artist.mp4');
                }
                
                if(this.videoTexture) {
                    this.videoTexture.baseTexture.resource.source.muted = true
                    this.videoTexture.baseTexture.resource.source.loop = true
                    this.videoTexture.baseTexture.resource.source.playsinline = true
                    this.videoTexture.baseTexture.resource.autoPlay = true
                    this.videoTexture.baseTexture.resource.volume = 0
                    this.videoTexture.baseTexture.resource.updateFPS = 10

                    const video = this.videoTexture.baseTexture.resource.source
                    setTimeout(function() {
                        video.muted = true
                    }, 1000)

                    const videoSprite = new PIXI.Sprite(this.videoTexture);

                    videoSprite.scale.y = -1
                    videoSprite.anchor.set(0.5)
                    videoSprite.width = state.width;
                    videoSprite.height = state.height;
                    this.addChild(videoSprite);

                }
                

            } else {
                this.body = new PIXI.Graphics()
                if(state.color == "art1") {
                    this.tokenImage = new PIXI.Sprite.from('images/art1-icon.svg');
                } else if (state.color == "art2") {
                    this.tokenImage = new PIXI.Sprite.from('images/art2-icon.svg');
                } else if (state.color == "art3") {
                    this.tokenImage = new PIXI.Sprite.from('images/art3-icon.svg');
                } else if (state.color == "art4") {
                    this.tokenImage = new PIXI.Sprite.from('images/art4-icon.svg');
                } else {
                    this.tokenImage = new PIXI.Sprite.from('images/'+type+'-icon.svg');
                }
                this.tokenImage.width = state.width;
                this.tokenImage.height = state.height;
                this.tokenImage.pivot.x = 0
                this.tokenImage.pivot.y = 0
                this.tokenImage.anchor.set(0.5)
                this.body.addChild(this.tokenImage)
                this.addChild(this.body)
            }
            
        } else {
            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.drawRect(-state.width/2, -state.height/2, state.width, state.height)
            this.body.endFill()
            this.addChild(this.body)
        }

        this.on('pointerdown', this.onPointerDown);
        this.interactive = true
        this.buttonMode = true

        this.sprite_animation = false
       
        
    }

    onPointerDown(){
        if(this.videoTexture.baseTexture.resource.source.muted) {
            this.videoTexture.baseTexture.resource.source.muted = false
        } else if (this.videoTexture.baseTexture.resource.source.paused && !this.videoTexture.baseTexture.resource.source.muted) {
            this.videoTexture.baseTexture.resource.source.play()
        } else {
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.pause()
        }
    }

    updateColor(color) {
        if(this.name == "token") {
            /*let updateColor = PIXI.utils.string2hex(color);
            this.body.clear()
            this.body.beginFill(updateColor)
            this.body.drawRect(-this.width/2, -this.height/2, 25, 25)
            this.body.endFill()*/
        } else {
            let updateColor = PIXI.utils.string2hex(color);
            this.body.clear()
            this.body.beginFill(updateColor)
            this.body.drawRect(-this.width/2, -this.height/2, this.width, this.height)
            this.body.endFill()
        }
        
        
    }

    


    update(delta) {
        //this.rotation = this.rotation + 0.001
        if(this.color == "art2") {
            if(this.sprite_animation){
                this.body.scale.x -= 0.01;
                if(this.body.scale.x < 0 ){
                    this.sprite_animation = false; 
                }
            }else{
                this.body.scale.x += 0.01;
                if(this.body.scale.x > 1 ){
                    this.sprite_animation = true;
                }
    
            }
    
        }
    }
}

export default BoxGraphics