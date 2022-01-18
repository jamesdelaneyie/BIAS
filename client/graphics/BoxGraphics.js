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
       
        let originalColor = this.color
        this.color = PIXI.utils.string2hex(this.color);

        const type = this.type

        if(this.name == "blackbox") {
            this.videoTexture = PIXI.Texture.from('/video/box.mp4');
            this.videoTexture.baseTexture.resource.source.muted = true
            this.videoTexture.baseTexture.resource.source.loop = true
            this.videoTexture.baseTexture.resource.source.playsinline = true
            this.videoTexture.baseTexture.resource.autoPlay = true
            this.videoTexture.baseTexture.resource.volume = 0

            const video = this.videoTexture.baseTexture.resource.source
            video.muted = true
            video.playbackRate = 2;

            const filter = new PIXI.filters.ColorMatrixFilter();
            filter.sepia();

            

            const videoSprite = new PIXI.Sprite(this.videoTexture);
            videoSprite.x = (-state.width/2)*2
            videoSprite.y = (-state.height/2)*2
            videoSprite.width = state.width*2 //.width;
            videoSprite.height = state.height*2//state.height;
            videoSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
            videoSprite.filter = [filter]
            

            let cubeSprite = [];

            const resources = PIXI.Loader.shared.resources

            for(var x=1; x < 150; x++){
                cubeSprite.push(resources['images/white-cube/layer_'+x+'.png'].url)
            }
            
            let whiteCube = PIXI.AnimatedSprite.fromFrames(cubeSprite, true);

            whiteCube.width = state.width*2.5
            whiteCube.height = state.height*2.5
            whiteCube.x = -state.width*1.5
            whiteCube.y = -state.height*1.5
            
            whiteCube.play()
            this.addChild(whiteCube)


            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.lineStyle(0, 0xffffff)
            this.body.drawRoundedRect(-state.width, -state.height, state.width*2, state.height*2, 1)
            this.body.endFill()

            //this.addChild(this.body)

        } else {

            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.lineStyle(0, 0xffffff)
            this.body.drawRoundedRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2, 1)
            this.body.endFill()
            this.body.pivot.set(0.5,0.5)
            this.body.scale.set(0.5)
            this.addChild(this.body)

        }

        if(this.type == "soccer-ball") {
            this.body.clear()
            this.tokenImage = new PIXI.Sprite.from('images/soccer-ball-icon.svg');
            this.tokenImage.width = state.width;
            this.tokenImage.height = state.height;
            this.tokenImage.x = -state.width/2
            this.tokenImage.y = -state.height/2
            
            this.body.addChild(this.tokenImage)
            this.addChild(this.body)

        }

        if(state.type == "security-cam") {
            this.tokenImage.x = 0
            this.tokenImage.y = 0
            this.tokenImage.angle = -90
            this.tokenImage.anchor.set(0.5, 0.8)
        }

        if(this.name == "token") {
            this.body.clear()
            this.body = new PIXI.Graphics()
            this.tokenImage = new PIXI.Sprite.from('images/'+type+'-icon.svg');
            this.tokenImage.width = state.width;
            this.tokenImage.height = state.height;
            this.tokenImage.x = -state.width/2
            this.tokenImage.y = -state.height/2
            this.body.addChild(this.tokenImage)
            this.addChild(this.body)

        }

        if(this.name == "noahWall") {
            this.body.clear()
        }


        
        if(this.type == "realFace") {
            this.body.clear()
            this.body = new PIXI.Graphics()
            this.body.beginFill(0xFFFFFF)
            this.body.drawRoundedRect(-state.width, -state.height, state.width*2, state.height*2, 1)

            this.tokenImage = new PIXI.Sprite.from(originalColor);
            this.tokenImage.width = state.width*2;
            this.tokenImage.height = state.height*2;
            this.tokenImage.x = 0
            this.tokenImage.y = 0
            this.tokenImage.anchor.set(0.5, 0.5)
            this.addChild(this.body)
            this.addChild(this.tokenImage)
        }
        



        //blackbox

        /*if (state.color == "quote0") {
            state.width = 120
            state.height = 120
            this.auraContainer = new PIXI.Container();   
            var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
            var auraTexture = new PIXI.RenderTexture.create(120, 120);
            var auraSprite = new PIXI.Sprite(auraTexture);
            this.auraContainer.addChild(auraSprite)
            
            const aura = new PIXI.Graphics();
            const auraColor = PIXI.utils.string2hex("#1DCFFF");
            aura.beginFill(auraColor);
            aura.drawCircle(0, 0, 60);
            aura.endFill();
            this.auraContainer.addChild(aura);
            canvasRenderer.render(this.auraContainer, auraTexture)
            this.addChild(this.auraContainer)
        }*/
        //console.log(type)

        /*if(this.name == "token") {
            this.body = new PIXI.Graphics()
            this.tokenImage = new PIXI.Sprite.from('images/'+type+'-icon.svg');
            this.tokenImage.width = state.width;
            this.tokenImage.height = state.height;
            this.tokenImage.x = -state.width/2
            this.tokenImage.y = -state.height/2
            if(state.type == "security-cam") {
                this.tokenImage.x = 0
                this.tokenImage.y = 0
                this.tokenImage.angle = -90
                this.tokenImage.anchor.set(0.5, 0.8)
            }
            this.body.addChild(this.tokenImage)
            this.addChild(this.body)

        } else {
            

        }*/


        this.count = 0
       
        
    }

   

    updateColor(color) {
       
    }

    


    update(delta) {

        this.count++

        if(this.color == "quote0") {
            this.auraContainer.scale.set(1 + Math.sin((this.count/10)) * 0.1, 1 + Math.sin((this.count/10)) * 0.1);
            this.auraContainer.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;
        }

    }
}

export default BoxGraphics