import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'
import HitpointBar from './HitpointBar.js'
import { Sound } from '@pixi/sound';
import MultiStyleText from 'pixi-multistyle-text'

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
        this.playerBody = new PIXI.Graphics();
        
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
        this.playerBody.addChild(this.auraContainer)

        this.body = new PIXI.Graphics()
        this.body.beginFill(auraColor)
        this.body.drawCircle(0, 0, 25)
        this.body.endFill()
        this.playerBody.addChild(this.body)

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -25)
        this.nose.beginFill(auraColor)
        this.nose.moveTo(0, -25)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, 25)
        this.nose.endFill()
        this.playerBody.addChild(this.nose)

        this.wrapper.interactive = true;
        this.wrapper.buttonMode = true;

        this.interactive = true;
        this.buttonMode = true;



        


        
        this.name = this.name.toUpperCase();
        
        this.info = new PUXI.Stage(20,100)
        const textStyle = new PIXI.TextStyle({fill: 0xffffff, fontSize: '12px', fontWeight: 400});
        const nameText = new PUXI.TextWidget(''+this.name+'', textStyle)
        nameText.tint = 0xffffff
        this.info.x = -20
        this.info.y = -50
        this.info.alpha = 0 
        this.info.addChild(nameText)

        // Pointers normalize touch and mouse
        this.on('pointerdown', this.onPointerDown);
        this.wrapper.on('pointerover', this.onPointerOver);
        this.wrapper.on('pointerout', this.onPointerOut);



        this.wrapper.addChild(this.info)
        this.wrapper.addChild(this.playerBody)
        this.addChild(this.wrapper)



        if(this.self == false) {
            this.body.visible = 0
            this.info.visible = 0
            this.nose.visible = 0
            this.auraContainer.visible = 0
        }
        
    }


    onPointerOver(){
        this.children[0].alpha = 1
    }

    setName(name){
        this.name = name
    }

    onPointerDown(){

        console.log(this.name)
        if(this.name != window.myName) {
            myPeer.connect(this.name)
        
            const call = window.myPeer.call(this.name, window.localStream)
            const dialingSound = Sound.from('audio/dialing.mp3');

            if(!dialingSound.isPlaying) {
                dialingSound.loop = true
                dialingSound.play()
            }
        
            call.on('stream', function(stream) { 
                window.remoteAudio.srcObject = stream; 
                window.remoteAudio.autoplay = true;
                window.remoteAudio.muted = false; 
                window.peerStream = stream; 
                dialingSound.stop();
                console.log(stream);
                const text = new MultiStyleText("<dot>●</dot> Connected With: "+this.name +" (ID:"+stream.id+")", {
                    "default": {
                        fontFamily: "Monaco",
                        fontSize: "10px",
                        fill: "#ececec",
                        align: "left"
                    },
                    "dot": {
                        fontSize: "15px",
                        fill: "#00ff00"
                    }
                });
                window.renderer.stage.addChild(text);
                text.x = 10;
                text.y = 30;// A
            })

        }
        
    }

    onPointerOut(){
        this.children[0].alpha = 0
    }

    hide() {
        this.body.visible = 0
        this.nose.visible = 0
        this.auraContainer.visible  = 0
        this.info.visible = 0
    }

    show() {
        this.body.visible = 1
        this.nose.visible = 1
        this.auraContainer.visible  = 1
        this.info.visible = 1
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
