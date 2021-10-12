import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import InputSystem from './InputSystem.js'
import PIXIRenderer from './graphics/PIXIRenderer.js'
import clientHookAPI from './clientHookAPI.js'
import createHooks from './hooks/createHooks.js'
import handleInput from './handleInput.js'
import drawHitscan from './graphics/drawHitscan.js'
import reconcilePlayer from './reconcilePlayer.js'
import shouldIgnore from './shouldIgnore.js'
import addMessage from './graphics/addMessage.js'
import emojiBlast from './graphics/emojiBlast.js'

//Creating an Object — Memory Leak // Destruction
//

import * as PIXI from 'pixi.js'
import { Sound, filters } from '@pixi/sound'



const create = () => {
    
    const client = new nengi.Client(nengiConfig, 100)

    const state = {
        myRawId: null,
        mySmoothId: null,
        myPeerId: null,
        obstacles: new Map(),
        boxes: new Map(),
        artworks: new Map(),
        floors: new Map(),
        flowers: new Map()
    }

    const renderer = new PIXIRenderer(state)
    window.renderer = renderer

    let input = new InputSystem(renderer, client)

    const loader = new PIXI.Loader();
    loader.add('boop', 'audio/boop.mp3');
    loader.add('footstep', 'audio/footstep.mp3');

    let boop = ""
    let footstep = ""
    loader.load(function(loader, resources) {
        boop = resources.boop.sound

        footstep = resources.footstep.sound
        footstep.speed = 2
        footstep.volume = 0.005
    });

    const portalSound = Sound.from('audio/car.mp3');
    const partySound = Sound.from('audio/grunt-birthday-party.mp3');
    const messageSound = Sound.from('audio/message.mp3');
    const leftSound = Sound.from('audio/left.mp3');
    partySound.volume = 0.008
    let lastMessage


    const portalProximity = Sound.from('audio/portal-proximity.mp3');
    portalProximity.volume = 0
    portalProximity.loop = true
    portalProximity.play()


    clientHookAPI(
        client,
        createHooks(state, renderer)
    )

    client.entityUpdateFilter = (update) => {
        return shouldIgnore(state.myRawId, update)
    }




    client.on('message::Identity', message => {

        state.myRawId = message.rawId
        state.mySmoothId = message.smoothId
        state.myPeerId = message.peerId
        state.myAvatar = message.avatar
        state.name = message.name;
        state.color = message.color;

        window.localStorage.setItem('name', state.name);
        window.localStorage.setItem('avatar', state.myAvatar);
        window.localStorage.setItem('color', state.color);


            
        input.leftController.alpha = 1

       
    })



    client.on('message::WeaponFired', message => {
        if(state.mySmoothEntity) {
            if (message.sourceId === state.mySmoothEntity.nid) {
                return
            }
        }
        const { x, y, tx, ty } = message
        drawHitscan(renderer.background, x, y, tx, ty, 0x000000)



        

    })
    

    const trails = []
    let stepCounter = 0
    

    client.on('message::Walking', message => {

        let trail = new PIXI.Graphics()
        let color = PIXI.utils.string2hex(message.color)

        trail.beginFill(color, 0.3)
        trail.drawCircle(message.x, message.y, 3)
        trail.endFill()

        trails.push(trail)
        stepCounter++

        let angle
        if(message.angle > -1.5708 && message.angle < -0.7853) {
            angle = 'top'
        } else if (message.angle > -0.7853 && message.angle < 0) {
            angle = 'right'
        } else if (message.angle > 0 && message.angle < 0.7853) {
            angle = 'right'
        } else if (message.angle > 0.7853 && message.angle < 1.5708) {
            angle = 'bottom'
        } else if (message.angle > 1.5708 && message.angle < 2.3561) {
            angle = 'bottom'
        } else if (message.angle > 2.3561 && message.angle < 3.1415) {
            angle = 'left'
        } else if (message.angle > 3.1415 && message.angle < 3.92699) {
            angle = 'left'
        } else {
            angle = 'top'
        }

        if(stepCounter % 5 == 0) {
            if(stepCounter % 10 == 0) {
                if(angle == "top" || angle == "bottom") {
                    trail.x = -10
                } else {
                    trail.x = 10
                }
                if(angle == "right" || angle == "left") {
                    trail.y = -10
                } else {
                    trail.y = 10
                }
            } 
            renderer.background.addChild(trail)
        }
        
        if(state.mySmoothEntity) {
            if (message.id === state.mySmoothEntity.nid) {
                if(renderer.UIBuilder) {
                    renderer.UIBuilder.setOwnPlayerPositionMiniMap(state.myRawEntity.x, state.myRawEntity.y)
                    return
                }
            }
        }

        if(renderer.UIBuilder) {
            renderer.UIBuilder.setPlayerPositionMiniMap(message.id, message.x, message.y)
        }

        

    })




    client.on('message::Hitting', message => {
        if(message.id == 0) {

            if(state.mySmoothEntity) {

                var a = message.x - state.mySmoothEntity.x;
                var b = message.y - state.mySmoothEntity.y

                if(!boop.isPlaying) {

                    var force = message.force;

                    var forceSound = Math.min(Math.max(parseInt(force), 1), 10);
                    
                    var c = Math.sqrt( a*a + b*b );
                    if(c < 400) {
                        var volume = 400 - c
                        boop.volume = volume/6000
                        boop.volume = boop.volume * (forceSound/3)
                        
                            boop.play();

                        }
                        
                    }
                
                    
                } else {
                    if(!boop.isPlaying) {
                        //boop.play();
                    }
                }
        }
    })



    client.on('message::Notification', message => {

        //console.log(message)

        if(message.type == "floorTrigger") {
            //console.log(message.text)
            //renderer.UIBuilder.buildMiniMap(message.text)
        }


        if(message.type == "mapInfo") {

            let placed = false
            let map = message.text;
            let placeStick = setInterval(function(){
                let userInterface = renderer.UIBuilder
                if(userInterface) {
                    if(placed == false) {
                        userInterface.buildMiniMap(map)
                        placed == true
                        clearInterval(placeStick)
                    }
                }
            }, 200 )

        }

        if(message.type == "login") {

            setInterval(function(){
                if(renderer.UIBuilder) {
                    renderer.UIBuilder.joinSession();
                }
            }, 500)
            
        }
        
        if(message.type == "showQuote") {
            if(!renderer.UIBuilder.showingQuote) {
                renderer.UIBuilder.showQuote(message.text)
            }
        }
        
        if(message.type == "showStartArtButton") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.showStartArtButton(message.text, message.type, message.x, message.y)
            }
        }

        if(message.type == "hideStartArtButton") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.hideStartArtButton()
            }
        }

    
        if(message.type == "showArt") {
            renderer.UIBuilder.showArt(message.text)
        }

        if(message.type == "scoreIncrease") {
            renderer.UIBuilder.increaseScore(message.text)
        }

        if(message.type == "hideArt") {
            if((lastMessage != null) && (lastMessage != ""+message.text+"")) {
                renderer.UIBuilder.hideArt(message.text)
            }
            lastMessage = ""+lastMessage+"";
        }

        if(message.type == "worldInfoTime") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.updateWorldTime(message.text)
            }
        }

        if(message.type == "worldInfoTotalUsers") {
            renderer.UIBuilder.updateTotalUsers(message.text)
        }

        if(message.type == "worldInfoActiveUsers") {
            renderer.UIBuilder.updateActiveUsers(message.text)
        }

        if(message.type == "personJoined") {
            //renderer.UIBuilder.personJoined(message.text)
        }

        if(message.type == "personLeft") {
            //renderer.UIBuilder.personLeft(message.text)
        }

        if(message.type == "emojiBlast") {
            emojiBlast(renderer.middleground, message);
            
            if(!partySound.isPlaying && message.text == "🎉") {
                partySound.play()
            }

            /*if(message.text == "⚡") {
               const fuckMeUp = new GlitchFilter({animating: true})
               renderer.camera.filters = [fuckMeUp]
               renderer.UIBuilder.filters = [fuckMeUp]
            }

            if(message.text == "❤️") {
                const fuckMeUp = new GlitchFilter({animating: true})
                renderer.camera.filters = []
                renderer.UIBuilder.filters = []
             }*/

            
        }

        if(message.type == "text") {
            addMessage(renderer.middleground, message);
            console.log(message)
            /*if(!messageSound.isPlaying) {
                messageSound.play()
            }*/
        }

        if(message.type == "talk") {
            addMessage(renderer.middleground, message);
        }
        
        if(message.type == "sound") {

            renderer.UIBuilder.teleporting(message.text)
            portalSound.play(); 
  
        }

        if(message.type == "portalVolume") {

            var volume = (100 - message.text) / 500
            volume = Math.max(0, volume);
            portalProximity.volume = volume

        } else {
            portalProximity.volume = 0
        }

        //Group Effect
        if(message.type == "command") {


            /*if(renderer.videoTexture.baseTexture.resource.source.paused) {
                renderer.videoTexture.baseTexture.resource.source.play()
                console.log('playing');
            } else {
                //renderer.videoTexture.baseTexture.resource.source.pause()
                //console.log('paused');
            }*/

            
        }
        
    })
    
    


    client.on('predictionErrorFrame', predictionErrorFrame => {
        reconcilePlayer(predictionErrorFrame, client, state.myRawEntity, state.obstacles, state.boxes, state.artworks)
    })

    client.on('connected', res => { 
        //renderer.UIBuilder.updateConnection(res, true);
    })

    client.on('error', res => { 

        console.log('Problem')
               
        
    })

    client.on('disconnected', () => { 
        if(renderer.UIBuilder) {
            renderer.UIBuilder.updateConnection(null, false);
        }
    })


    const handshake = window.localStorage;

    let invite = window.location.href
    invite = new URL(invite);
    var inviteX = invite.searchParams.get("x");
    var inviteY = invite.searchParams.get("y")
    handshake.x = inviteX
    handshake.y = inviteY
    
    client.connect('ws://localhost:8079', handshake)
    //client.connect('ws://192.248.155.99:8079', handshake)


    const update = (delta, tick, now) => {

        if(trails.length > 1000) {
            let trailToRemove = trails.shift()
            renderer.background.removeChild(trailToRemove)
            
        }

        client.readNetworkAndEmit()
        handleInput(input, state, client, renderer, delta)
        renderer.update(delta)
        client.update()
    }

    return update
}

export default create


