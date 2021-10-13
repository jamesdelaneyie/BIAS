import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';


import * as PUXI from '../../node_modules/puxi/lib/puxi.mjs'
import { ease } from 'pixi-ease'
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
        this.volume = 0
        this.wrapper = new PIXI.Container()
        this.playerBody = new PIXI.Graphics();
        const playerBody = this.playerBody
        playerBody.alpha = 0
        
        this.size = 25
        this.avatar = ''+state.avatar+''

        this.headphones = state.headphones
        this.typing = state.isTyping
        this.sleeping = state.sleeping
        //this.headphones = state.headphones
 
        this.auraContainer = new PIXI.Container();   


        let color = PIXI.utils.string2hex(this.color);
        
        const aura = new PIXI.Graphics();
        
        aura.beginFill(color);
        aura.drawCircle(0, 0, 60);
        aura.endFill();
        this.auraContainer.addChild(aura);
        this.playerBody.addChild(this.auraContainer)

        this.body = new Graphics()
        this.body.beginFill(color, 1.0, true)
        this.body.drawCircle(0, 0, (this.size*2) - 2)
        this.body.endFill()
        this.body.cacheAsBitmap = true;
        this.body.scale.set(0.5)
        this.playerBody.addChild(this.body)
        

        this.nose = new Graphics()
        this.nose.moveTo(0, -this.size*2)
        this.nose.beginFill(color, 1.0, true)
        this.nose.moveTo(0, -this.size*2)
        this.nose.lineTo(80, 0)
        this.nose.lineTo(0, this.size*2)
        this.nose.endFill()
        this.nose.cacheAsBitmap = true;
        this.nose.scale.set(0.5)
        this.playerBody.addChild(this.nose)

        this.avatarContainer = new PIXI.Container();   
        const avatarContainer = this.avatarContainer

        const avatar = (this.avatar).split(',')

        //console.log(avatar)

        let avatarBackground = avatar[1]
        let avatarMiddleground = avatar[4]
        let avatarMiddleground2 = avatar[7]
        let avatarForeground = avatar[10]

        let angle1 = avatar[2]
        let angle2 = avatar[5]
        let angle3 = avatar[8]
        let angle4 = avatar[11]

        const loader = new PIXI.Loader();

        this.headphoneGraphics = new PIXI.Container()
        const headphoneGraphics = this.headphoneGraphics
        let headphonesColor = PIXI.utils.string2hex("#1f1f1f");

        const headband = new PIXI.Graphics()
       
        headband.beginFill(headphonesColor)
        headband.drawRect(-5, -30, 10, 63)
        headband.endFill()
        headband.pivot.set(0.5)

        const leftPhone = new PIXI.Graphics()
        leftPhone.beginFill(headphonesColor)
        leftPhone.drawRoundedRect(-10, -32, 20, 10, 5)
        leftPhone.endFill()

        const rightPhone = new PIXI.Graphics()
        rightPhone.beginFill(headphonesColor)
        rightPhone.drawRoundedRect(-10, 23, 20, 10, 5)
        rightPhone.endFill()

        this.headphoneGraphics.addChild(headband)
        this.headphoneGraphics.addChild(leftPhone)
        this.headphoneGraphics.addChild(rightPhone)
        this.headphoneGraphics.visible = false
        avatarContainer.addChild(this.headphoneGraphics)
        
       

        this.typingIcon = new PIXI.Container()
        const typingIcon = this.typingIcon
        typingIcon.visible = false


       /* loader.add('avatarBackground', ''+avatarBackground+'');
        loader.add('avatarMiddleground', ''+avatarMiddleground+'');
        loader.add('avatarMiddleground2', ''+avatarMiddleground2+'');
        loader.add('avatarForeground', ''+avatarForeground+'');*/

        this.name = this.name.toUpperCase();
        
        this.info = new PUXI.Stage(20,100)
        const textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fill: "#FFFFFF", 
            fontWeight: 900,
            fontSize: "16px"
        });
        
        
        const nameText = new PUXI.TextWidget('', textStyle)
        nameText.tint = 0xffffff
        
        this.info.addChild(nameText)


        this.sleepingGraphic = new PIXI.Container()
        let firstZ = new PIXI.Text("Z", {fontSize: "10px", fill: 0xFFFFFF, fontWeight: 700})
        let secondZ = new PIXI.Text("Z", {fontSize: "14px", fill: 0xFFFFFF, fontWeight: 400})
        let thirdZ = new PIXI.Text("Z", {fontSize: "18px", fill: 0xFFFFFF, fontWeight: 300})
        
        firstZ.x = 5
        firstZ.y = -20

        secondZ.x = 12
        secondZ.y = -26

        thirdZ.x = 22
        thirdZ.y = -34

        this.sleepingGraphic.addChild(firstZ)
        this.sleepingGraphic.addChild(secondZ)
        this.sleepingGraphic.addChild(thirdZ)
        //this.sleepingGraphic.visible = false
        


        const typingGraphic = new Graphics()
        typingGraphic.lineStyle(0)
        typingGraphic.beginFill(0xFFFFFF, 1.0, true)
        typingGraphic.drawRoundedRect(0, 0, 28, 16, 3)
        typingGraphic.endFill()
        typingGraphic.x = -50
        typingGraphic.y = -50

        const typingGraphicTwo = new Graphics()
        typingGraphicTwo.beginFill(0xFFFFFF, 1.0, true)
        typingGraphicTwo.drawCircle(0, 0, 3)
        typingGraphicTwo.x = -24
        typingGraphicTwo.y = -35

        const typingGraphicThree = new Graphics()
        typingGraphicThree.beginFill(0xFFFFFF, 1.0, true)
        typingGraphicThree.drawCircle(0, 0, 1.5)
        typingGraphicThree.x = -20
        typingGraphicThree.y = -30

        this.typingDot1 = new Graphics()
        this.typingDot1.lineStyle(0)
        this.typingDot1.beginFill(0x000000, 1.0, true)
        this.typingDot1.drawCircle(0, 0, 2)
        this.typingDot1.endFill()


        this.typingDot2 = new Graphics()
        this.typingDot2.lineStyle(0)
        this.typingDot2.beginFill(0x000000, 1.0, true)
        this.typingDot2.drawCircle(0, 0, 2)
        this.typingDot2.endFill()

        this.typingDot3 = new Graphics()
        this.typingDot3.lineStyle(0)
        this.typingDot3.beginFill(0x000000, 1.0, true)
        this.typingDot3.drawCircle(0, 0, 2)
        this.typingDot3.endFill()

        typingIcon.addChild(typingGraphicThree)
        typingIcon.addChild(typingGraphicTwo)
        typingIcon.addChild(typingGraphic)
        typingIcon.addChild(this.typingDot1)
        typingIcon.addChild(this.typingDot2)
        typingIcon.addChild(this.typingDot3)

        this.typingDot1.x = -43
        this.typingDot1.y = -42

        this.typingDot2.x = -36
        this.typingDot2.y = -42

        this.typingDot3.x = -29
        this.typingDot3.y = -42

        nameText.contentContainer.addChild(typingIcon)
        
        


        loader.load(function(loader, resources) {

            /*avatarBackground = new PIXI.Sprite.from(''+avatarBackground+'');
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

            avatarForeground.width = 52
            avatarForeground.height = 52
            avatarForeground.anchor.set(0.5, 0.5)
            avatarForeground.angle = angle4        

            avatarContainer.addChild(avatarBackground)
            avatarContainer.addChild(avatarMiddleground)
            avatarContainer.addChild(avatarMiddleground2)
            avatarContainer.addChild(avatarForeground)*/

            avatarContainer.addChild(headphoneGraphics)

            playerBody.addChild(avatarContainer)

            
            ease.add(playerBody, {alpha: 1}, { duration: 250, ease: 'easeOutExpo'})


        })

        






        this.wrapper.interactive = true;
        this.wrapper.buttonMode = true;

        this.interactive = true;
        this.buttonMode = true;



        



        
        const nameTextCurved = new PIXI.Text(""+this.name+"", textStyle);
        nameTextCurved.updateText();

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

        this.nameHolder = new PIXI.Container();
        this.nameHolder.height = 30
        this.nameHolder.width = 50
        
        const rope = new PIXI.SimpleRope( nameTextCurved.texture, points );
        this.nameHolder.addChild( rope );
        this.playerBody.addChild(this.nameHolder)
        this.nameHolder.visible = false


        
        this.wrapper.addChild(this.info)
        this.wrapper.addChild(this.playerBody)
        this.wrapper.addChild(this.sleepingGraphic)

        this.addChild(this.wrapper)

       

        if(this.self == false) {
            this.body.visible = 0
            this.info.visible = 0
            this.nose.visible = 0
            this.avatarContainer.visible = 0
            this.auraContainer.visible = 0
            this.nameHolder.visible = 0
            this.sleepingGraphic.visible = 0
        }


        // Pointers normalize touch and mouse
        this.on('pointerdown', this.onPointerDown);
        this.on('pointerover', this.onPointerOver);
        this.on('pointerout', this.onPointerOut);
    

        
    }

    addSticker(value){
        
        if(value > 1) {
            if(this.self == false) {
                
            } else {
                let choice = Math.floor(Math.random() * (4 - 1) + 1)
                if(choice == 1) {
                    this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-calm.svg');
                } else if (choice == 2) {
                    this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-sad.svg');
                } else if (choice == 3) {
                    this.smileyStamp = new PIXI.Sprite.from('images/face-sticker.svg');
                }

                let size = Math.floor(Math.random() * (6 - 2) + 1)
                this.smileyStamp.width = size*10;
                this.smileyStamp.height = size*10;

                var ranNum = Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
                this.smileyStamp.x = ranNum

                var ranNum = Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
                this.smileyStamp.y = ranNum

                let angle = Math.floor(Math.random() * (360 - 1) + 1)
                this.smileyStamp.scale.set(3)
                this.smileyStamp.angle = angle 
                this.smileyStamp.anchor.set(0.5, 0.5)
                this.smileyStamp.alpha = 0
                this.playerBody.addChild(this.smileyStamp)
                ease.add(this.smileyStamp, {alpha: 1, scale: 0.5}, { duration: 150, ease: 'easeOutExpo' })
            }
        }
    }

    putOnHeadphones(boolean) {
        if(boolean) {
            this.headphones = true
        } else {
            this.headphones = false
        }
    }

    toggleSleeping(boolean) {
        //console.log(boolean)
        if(boolean) {
            this.sleeping = true
        } else {
            this.sleeping = false
        }
    }

    isTyping(boolean) {
        if(boolean) {
            this.typing = true
        } else {
            this.typing = false
        }
    }


    onPointerOver(){
        if(this.self != false) {
            this.nameHolder.visible = true
        }
    }

    onPointerOut(){
        this.nameHolder.visible = false
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

        /*var personToCall = this.name;
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
    
                    /*const text = new MultiStyleText("<dot>●</dot> Connected With: "+ personToCall +" (ID:"+stream.id+")", {
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
        */
    }

    updateCircleSize(size){
        var size = Number(size*500).toFixed(0)
        this.auraContainer.scale.set(size)
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

    setRotation(rotation){
        this.playerBody.rotation = rotation
    }



    update(delta) {

        if(this.headphones == false) {
           this.headphoneGraphics.visible = false
        } else {
            this.headphoneGraphics.visible = true
        }

        if(this.sleeping == false) {
            this.sleepingGraphic.visible = false
         } else {
            //console.log('show')
            this.sleepingGraphic.visible = true 
         }

        if(this.typing == false) {
            this.typingIcon.visible = false
         } else {
            this.typingIcon.visible = true
         }
    

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
        this.auraContainer.scale.set(0.2 + Math.sin((this.count/10)) * 0.1, 0.2 + Math.sin((this.count/10)) * 0.1);
        this.auraContainer.alpha = 0.1 + Math.sin((this.count/10)) * 0.1;

        this.typingDot1.alpha = 0.2 + Math.sin((this.count/10)) * 0.1;
        this.typingDot2.alpha = 0.4 + Math.sin((this.count/10) + 10) * 0.1;
        this.typingDot3.alpha = 0.6 + Math.sin((this.count/10) + 20) * 0.1;

    }
}

export default PlayerGraphics
