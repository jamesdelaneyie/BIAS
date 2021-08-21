import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import HitpointBar from './HitpointBar.js'

class PlayerGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.isAlive = state.isAlive
        this.hitpoints = state.hitpoints
        this.rotation = state.rotation
        this.count = 0
        this.hitpointBar = new HitpointBar()
        this.hitpointBar.x = -6
        this.hitpointBar.y = -20
        this.hitpointBar.setHitpointPercentage(state.hitpoints/100)
        this.color = state.color;
        this.name = state.name;
        this.self = state.self;

        
        
        this.auraContainer = new PIXI.Container();   
        //let canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
        //let auraTexture = new PIXI.RenderTexture.create(120, 120);
        //let auraSprite = new PIXI.Sprite(auraTexture);
        //this.auraContainer.addChild(auraSprite)
        
        this.aura = new PIXI.Graphics();
        let auraColor = PIXI.utils.string2hex(""+this.color+"");
        this.aura.beginFill(auraColor);
        this.aura.drawCircle(0, 0, 10);
        this.aura.endFill();
        this.auraContainer.addChild(aura);


        //render the container
        canvasRenderer.render(this.auraContainer, auraTexture)

        //add the rendered container's output onto the orignal player character
        this.addChild(this.auraContainer)



        this.body = new PIXI.Graphics()
        this.body.beginFill(auraColor)
        this.body.drawCircle(0, 0, 25)
        this.body.endFill()
        //this.body.tint = auraColor

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -25)
        this.nose.beginFill(auraColor)
        this.nose.moveTo(0, -25)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, 25)
        this.nose.endFill()

        

        this.info = new PUXI.Stage(20,100)
        const textStyle = new PIXI.TextStyle({fill: 0xffffff, fontSize: '12px', fontWeight: 400});
        const nameText = new PUXI.TextWidget(''+this.nid+'', textStyle)
        nameText.tint = 0xffffff
        this.info.x = -20
        this.info.y = -40
        this.info.alpha = 1
        this.info.addChild(nameText)
        this.addChild(this.info)
        
        this.addChild(this.nose)
        this.addChild(this.body)

        console.log(this.self)

        if(this.self == false) {
            this.body.visible = 0;
            this.info.visible = 0;
            this.auraContainer.visible = 0
        }
        //this.addChild(this.hitpointBar)
    }

    hide() {
        this.body.visible = false
        this.hitpointBar.visible = false
        this.nose.visible = false
        this.auraContainer.visible = false
        this.info.visible = false
    }

    update(delta) {
        //console.log(this.isAlive)
        this.count++
        if (!this.isAlive) {
            this.nose.alpha = 0
            this.body.visible = 0;
            this.auraContainer.visible = 0
            this.info.visible = 0
        } else {
            if(!this.self == false) {
                this.nose.alpha = 1
                this.body.visible = 1;
                this.auraContainer.visible = 1
                this.info.visible = 1
            }
        }
        this.auraContainer.scale.set(0.6 + Math.sin((this.count/10)) * 0.1, 0.6 + Math.sin((this.count/10)) * 0.1);
        this.auraContainer.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;
    }
}

export default PlayerGraphics
