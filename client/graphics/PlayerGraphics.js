import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import HitpointBar from './HitpointBar.js'
import { sound } from '@pixi/sound';

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

        this.wrapper = new PIXI.Container()

        
        //Give me a new space to draw something
        this.auraContainer = new PIXI.Container();   
        var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
        var auraTexture = new PIXI.RenderTexture.create(120, 120);
        var auraSprite = new PIXI.Sprite(auraTexture);
        this.auraContainer.addChild(auraSprite)
        
        const aura = new PIXI.Graphics();
        const auraColor = PIXI.utils.string2hex(""+this.color+"");
        aura.beginFill(auraColor);
        aura.drawCircle(0, 0, 60);
        aura.endFill();
        aura.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        this.auraContainer.addChild(aura);
        canvasRenderer.render(this.auraContainer, auraTexture)
        this.wrapper.addChild(this.auraContainer)

        this.body = new PIXI.Graphics()
        this.body.beginFill(auraColor)
        this.body.drawCircle(0, 0, 25)
        this.body.endFill()
        this.wrapper.addChild(this.body)

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -25)
        this.nose.beginFill(auraColor)
        this.nose.moveTo(0, -25)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, 25)
        this.nose.endFill()
        this.wrapper.addChild(this.nose)

        this.wrapper.interactive = true;
        this.wrapper.buttonMode = true;

        

        // Pointers normalize touch and mouse
        this.wrapper.on('pointerdown', this.onPointerOver);
        this.wrapper.on('pointerover', this.onPointerOver);
        this.wrapper.on('pointerout', this.onPointerOut);
        

        this.info = new PUXI.Stage(20,100)
        const textStyle = new PIXI.TextStyle({fill: 0xffffff, fontSize: '12px', fontWeight: 400});
        const nameText = new PUXI.TextWidget(''+this.name+'', textStyle)
        nameText.tint = 0xffffff
        this.info.x = -20
        this.info.y = -50
        this.info.alpha = 0
        this.info.addChild(nameText)
        this.wrapper.addChild(this.info)

        this.addChild(this.wrapper)




        if(this.self == false) {
            this.body.visible = 0
            this.info.visible = 0
            this.nose.visible = 0
            this.auraContainer.visible = 0
        }
        
    }


    onPointerOver (){
        this.children[3].alpha = 1
    }

    onPointerOut(){
        this.children[3].alpha = 0
    }

    hide() {
        this.body.visible = 0
        this.nose.visible = 0
        this.auraContainer.visible  = 0
        this.info.visible = 0
    }

    update(delta) {
        
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
