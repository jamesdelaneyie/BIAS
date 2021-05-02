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




        
        //Give me a new space to draw something
        this.auraContainer = new PIXI.Container();   
        //select my rendering engine for this, i'll use whats already there
        var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
        //create a texture object
        var auraTexture = new PIXI.RenderTexture.create(120, 120);
        //create a sprite object
        var auraSprite = new PIXI.Sprite(auraTexture);
        //add the sprite to the new space
        this.auraContainer.addChild(auraSprite)
        
        //draw graphics   
        const aura = new PIXI.Graphics();
        aura.beginFill(0x00FF00);
        aura.drawCircle(0, 0, 60);
        aura.endFill();
        //add the frame to the container
        this.auraContainer.addChild(aura);
        //render the container
        canvasRenderer.render(this.auraContainer, auraTexture)
        //add the rendered container's output onto the orignal player character
        this.addChild(this.auraContainer)

        this.body = new PIXI.Graphics()
        this.body.beginFill(0xffffff)
        this.body.drawCircle(0, 0, 25)
        this.body.endFill()
        this.body.tint = 0x00ff00

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -25)
        this.nose.beginFill(0xffffff)
        this.nose.moveTo(0, -25)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, 25)
        this.nose.endFill()
        
        this.addChild(this.nose)
        this.addChild(this.body)
        this.addChild(this.hitpointBar)
    }

    hide() {
        this.body.visible = false
        this.hitpointBar.visible = false
        this.nose.visible = false
        this.auraContainer.visible = false
    }

    update(delta) {
        this.count++
        if (!this.isAlive) {
            this.nose.alpha = 0
        } else {
            this.nose.alpha = 1
        }
        this.auraContainer.scale.set(0.6 + Math.sin((this.count/10)) * 0.1, 0.6 + Math.sin((this.count/10)) * 0.1);
        this.auraContainer.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;
    }
}

export default PlayerGraphics
