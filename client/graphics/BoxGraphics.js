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

        const type = this.type

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

        if(this.name == "token") {
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
            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            //this.body.lineStyle(2, 0x000000)
            this.body.drawRoundedRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2, 10)
            this.body.endFill()
            this.body.pivot.set(0.5,0.5)
            this.body.scale.set(0.5)
            this.addChild(this.body)

        }


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