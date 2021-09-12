import * as PIXI from 'pixi.js'
import * as PUXI from '../../node_modules/puxi/lib/puxi.mjs'

import HitpointBar from './HitpointBar.js'
import { Sound } from '@pixi/sound';
import MultiStyleText from 'pixi-multistyle-text'
import AudioStreamMeter from 'audio-stream-meter'

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
        this.volume = 0
        this.wrapper = new PIXI.Container()
        this.playerBody = new PIXI.Graphics();
        this.size = 25
        this.avatar = state.avatar

        console.log(state.avatar)

        let randColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        const auraColor = PIXI.utils.string2hex(randColor);
 
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x7647a2);
        graphics.lineStyle(1, 0x7647a2, 1);
        graphics.drawRect(0,0,20,20);

        var filter = new PIXI.filters.BlurFilter();
        filter.blur = 2;
        graphics.filters=[filter];
        var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
        var rt = PIXI.RenderTexture.create(120, 120);
        canvasRenderer.render(graphics, rt);
        var sprite = new PIXI.Sprite(rt);
        this.addChild(sprite);

        
        //Give me a new space to draw something
        this.auraContainer = new PIXI.Container();   
        var canvasRenderer = PIXI.autoDetectRenderer(120, 120); 
        var auraTexture = new PIXI.RenderTexture.create(120, 120);
        var auraSprite = new PIXI.Sprite(auraTexture);
        this.auraContainer.addChild(auraSprite)
        
        const aura = new PIXI.Graphics();
        
        aura.beginFill(auraColor);
        aura.drawCircle(0, 0, 60);
        aura.endFill();
        this.auraContainer.addChild(aura);
        canvasRenderer.render(this.auraContainer, auraTexture)
        this.playerBody.addChild(this.auraContainer)

        this.body = new PIXI.Graphics()
        this.body.beginFill(auraColor)
        this.body.drawCircle(0, 0, this.size)
        this.body.endFill()
        //this.playerBody.addChild(this.body)
        

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -this.size)
        this.nose.beginFill(auraColor)
        this.nose.moveTo(0, -this.size)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, this.size)
        this.nose.endFill()
        this.playerBody.addChild(this.nose)

        this.avatarContainer = new PIXI.Container();   
        this.avatar = new PIXI.Sprite.from(''+this.avatar+'');
        this.avatar.width = 50
        this.avatar.height = 50
        this.avatar.x = -25
        this.avatar.y = -25
        this.avatarContainer.addChild(this.avatar)
        this.playerBody.addChild(this.avatarContainer)

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
            this.avatar.visible = 0
            this.auraContainer.visible = 0
        }
        
    }


    onPointerOver(){
        this.children[0].alpha = 1
    }

    setName(name){
        this.name = name
    }

    setAvatar(avatar){
        this.avatar = avatar
    }

    onPointerDown(){

        console.log(this.name)

        var personToCall = this.name;
        var yourself = this
        if(this.name != window.myName) {
            myPeer.connect(this.name)
        
            const call = window.myPeer.call(this.name, window.localStream)
            const dialingSound = Sound.from('audio/dialing.mp3');

            if(!dialingSound.isPlaying) {
                dialingSound.loop = true
                dialingSound.play()
            }

            setTimeout(function(){
                dialingSound.stop()
            }, 5000)
        
            call.on('stream', function(stream) { 
                window.remoteAudio.srcObject = stream; 
                window.remoteAudio.autoplay = true;
                window.remoteAudio.muted = false; 
                window.peerStream = stream; 
                dialingSound.stop();
                console.log(stream);

                var audioContext = new AudioContext();
                var mediaStream = audioContext.createMediaStreamSource(stream);
                var meter = AudioStreamMeter.audioStreamProcessor(audioContext, function() {
                    yourself.updateCircleSize(meter.volume);
                    console.log(meter.volume)
                });

                this.volume = meter.volume
                
                mediaStream.connect(meter);

                const text = new MultiStyleText("<dot>●</dot> Connected With: "+ personToCall +" (ID:"+stream.id+")", {
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

    updateCircleSize(size){
        var size = Number(size*500).toFixed(0)
        this.auraContainer.scale.set(size)
    }

    onPointerOut(){
        this.children[0].alpha = 0
    }

    hide() {
        this.body.visible = 0
        this.nose.visible = 0
        this.auraContainer.visible  = 0
        this.info.visible = 0
        this.avatarContainer.visible = 0
    }

    show() {
        this.body.visible = 1
        this.nose.visible = 1
        this.auraContainer.visible  = 1
        this.info.visible = 1
        this.avatarContainer.visible = 1
    }



    update(delta) {
        
        //console.log(this.size)

        this.count++
        if (!this.isAlive) {
            this.nose.alpha = 0
            this.body.visible = 0;
            this.auraContainer.visible = 0
            this.info.visible = 0
            this.avatarContainer.visible = 0
        } else {
            if(!this.self == false) {
                this.nose.alpha = 1
                this.body.visible = 1;
                this.auraContainer.visible = 1
                this.info.visible = 1
                this.avatarContainer.visible = 1
            }
        }
        this.auraContainer.scale.set(0.6 + Math.sin((this.count/10)) * 0.1, 0.6 + Math.sin((this.count/10)) * 0.1);
        this.auraContainer.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;


    }
}

export default PlayerGraphics
