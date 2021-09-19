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
        this.avatar = ''+state.avatar+''

 
        this.auraContainer = new PIXI.Container();   
        

        let color = PIXI.utils.string2hex(this.color);
        //console.log(state.color)
        //console.log(this.color)

        
        const aura = new PIXI.Graphics();
        
        aura.beginFill(color);
        aura.drawCircle(0, 0, 60);
        aura.endFill();
        this.auraContainer.addChild(aura);
        this.playerBody.addChild(this.auraContainer)

        this.body = new PIXI.Graphics()
        this.body.beginFill(color)
        this.body.drawCircle(0, 0, this.size)
        this.body.endFill()
        this.playerBody.addChild(this.body)
        

        this.nose = new PIXI.Graphics()
        this.nose.moveTo(0, -this.size)
        this.nose.beginFill(color)
        this.nose.moveTo(0, -this.size)
        this.nose.lineTo(40, 0)
        this.nose.lineTo(0, this.size)
        this.nose.endFill()
        this.playerBody.addChild(this.nose)

        this.avatarContainer = new PIXI.Container();   

        const avatar = (this.avatar).split(',')

        let avatarBackground = avatar[1]
        let avatarMiddleground = avatar[4]
        let avatarMiddleground2 = avatar[7]
        let avatarForeground = avatar[10]

        let angle1 = avatar[2]
        let angle2 = avatar[5]
        let angle3 = avatar[8]
        let angle4 = avatar[11]

        //console.log(avatar)

        avatarBackground = new PIXI.Sprite.from(''+avatarBackground+'');
        avatarMiddleground = new PIXI.Sprite.from(''+avatarMiddleground+'');
        avatarMiddleground2 = new PIXI.Sprite.from(''+avatarMiddleground2+'');
        avatarForeground = new PIXI.Sprite.from(''+avatarForeground+'');

        avatarBackground.roundPixels = true
        avatarMiddleground.roundPixels = true
        avatarMiddleground2.roundPixels = true
        avatarForeground.roundPixels = true

        
        avatarBackground.width = 50
        avatarBackground.height = 50
        avatarBackground.anchor.set(0.5,0.5)
        avatarBackground.angle = angle1

        avatarMiddleground.width = 50
        avatarMiddleground.height = 50
        avatarMiddleground.anchor.set(0.5, 0.5)
        avatarMiddleground.angle = angle2 

        avatarMiddleground2.width = 50
        avatarMiddleground2.height = 50
        avatarMiddleground2.anchor.set(0.5, 0.5)
        avatarMiddleground2.angle = angle3    

        avatarForeground.width = 51
        avatarForeground.height = 51
        avatarForeground.anchor.set(0.5, 0.5)
        avatarForeground.angle = angle4        

        avatarBackground.x = 0
        avatarBackground.y = 0

        avatarMiddleground.x = 0
        avatarMiddleground.y = 0

        avatarMiddleground2.x = 0
        avatarMiddleground2.y = 0

        avatarForeground.x = 0
        avatarForeground.y = 0


        this.avatarContainer.addChild(avatarBackground)
        this.avatarContainer.addChild(avatarMiddleground)
        this.avatarContainer.addChild(avatarMiddleground2)
        this.avatarContainer.addChild(avatarForeground)

        this.playerBody.addChild(this.avatarContainer)






        this.wrapper.interactive = true;
        this.wrapper.buttonMode = true;

        this.interactive = true;
        this.buttonMode = true;



        


        
        this.name = this.name.toUpperCase();
        
        this.info = new PUXI.Stage(20,100)
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Trade Gothic Next',
            fill: "#000000", 
            fontWeight: 900,
            fontSize: "16px"
        });
        
        const nameText = new PUXI.TextWidget('', textStyle)
        nameText.tint = 0xffffff
        this.info.alpha = 0 
        this.info.addChild(nameText)

        
        const nameTextCurved = new PIXI.Text(""+this.name+"", textStyle);
        nameTextCurved.updateText();
        //nameText.contentContainer.addChild(nameTextCurved)

        const radius = 40;
        const maxRopePoints = 100;
        const step = Math.PI / maxRopePoints;
        
        let ropePoints = maxRopePoints - Math.round( (nameTextCurved.texture.width / (radius * Math.PI)) * maxRopePoints );
        ropePoints /= 2;

        const points = [];
        for ( let i = maxRopePoints - ropePoints; i > ropePoints; i-- ) {
        const x = radius * Math.cos( step * i );
        const y = radius * Math.sin( step * i );
        points.push( new PIXI.Point( x, -y ) );
        }

        const container = new PIXI.Container();
        container.height = 50
        container.width = 50

        const rope = new PIXI.SimpleRope( nameTextCurved.texture, points );
        container.addChild( rope );
        nameText.contentContainer.addChild(container)

      
                

        

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
            this.avatarContainer.visible = 0
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

    setColor(color){
        this.color = color
    }

    onPointerDown(){

        var personToCall = this.name;
        var yourself = this
        if(this.name != window.myName) {
            myPeer.connect(this.name)
        
            const call = window.myPeer.call(this.name, window.localStream)
            const dialingSound = Sound.from('audio/dialing.mp3');

            if(!dialingSound.isPlaying) {
                dialingSound.loop = true
                //dialingSound.play()
            }

            setTimeout(function(){
                dialingSound.stop()
            }, 5000)
        
            if(call) {
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
                        //console.log(meter.volume)
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
