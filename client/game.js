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
import { ease } from 'pixi-ease'



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
        flowers: new Map(),
        infoPanels: new Map()
    }

    const renderer = new PIXIRenderer(client, state)
    window.renderer = renderer

    let input = new InputSystem(renderer, client)





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

        if(message.x > 2355 && message.y > 1760) {
            trail.lineStyle(1, color, 0.5)
            trail.drawCircle(0,0,5)
            trail.drawCircle(0,0,10)
            trail.drawCircle(0,0,20)
            trail.x = message.x
            trail.y = message.y
            trail.scale.set(0.2)
            ease.add(trail, {alpha: 0, scale: 4}, {duration: 2000})
            
        } else if(message.x < 2450 && message.y > 1760) {
            trail.beginFill(0x000000, 0.1)
            trail.drawCircle(message.x, message.y, 3)
            trail.endFill()
        } else if (message.y < 1700 && message.x > 1950) {
            
        } else {

        }
       

        trails.push(trail)
        stepCounter++
        renderer.background.addChild(trail)

        /*let angle
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

        //if(stepCounter % 5 == 0) {
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
            } */
           
        //}

        
        
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

        if(message.type == "showNotification") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.showNotification(message.text, message.type)
            }
        }
        
        if(message.type == "showQuote") {
            if(!renderer.UIBuilder.showingQuote) {
                renderer.UIBuilder.showQuote(message.text)
                
            }
        }

        if(message.type == "showQuoteButton") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.showQuoteButton(message.text, message.type, message.x, message.y)
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
            if(renderer.UIBuilder) {
                renderer.UIBuilder.updateTotalUsers(message.text)
            }
        }

        if(message.type == "worldInfoActiveUsers") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.updateActiveUsers(message.text)
            }
        }

        if(message.type == "personJoined") {
            if(renderer.UIBuilder) {
                renderer.UIBuilder.personJoined(message.text)
            }
        }

        if(message.type == "personLeft") {
            renderer.UIBuilder.personLeft(message.text)
        }

        if(message.type == "emojiBlast") {
            emojiBlast(renderer.foreforeground, message);
            
            
            const resources = PIXI.Loader.shared.resources

            let hb = resources.gruntBirthdayParty.sound
            hb.volume = 0.04
            console.log('checker')
            if(message.text == "🎉") {
                hb.play()
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
            addMessage(renderer.foreforeground, message);
            //console.log(message)
            /*if(!messageSound.isPlaying) {
                messageSound.play()
            }*/
        }

        if(message.type == "talk") {
            addMessage(renderer.foreforeground, message);
        }
        
        if(message.type == "sound") {

            renderer.UIBuilder.teleporting(message.text)
            //portalSound.play(); 
  
        }

        /*if(message.type == "portalVolume") {

            var volume = (100 - message.text) / 500
            volume = Math.max(0, volume);
            portalProximity.volume = volume

        } else {
            portalProximity.volume = 0
        }*/

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

    let connected = false

    client.on('connected', res => { 
        connected = true
        let placed = false
        let placeStick = setInterval(function(){
            let userInterface = renderer.UIBuilder
            if(userInterface) {
                if(placed == false) {
                    renderer.UIBuilder.updateConnection(state.name, true);
                    placed == true

                    if(handshake.quote1) {
                        renderer.UIBuilder.increaseScore("talking")
                        state.myRawEntity.quoteNumber++
                        renderer.floorQuote1.seen = true
                    } 
                    if(handshake.quote2) {
                        renderer.UIBuilder.increaseScore("talking")
                        state.myRawEntity.quoteNumber++
                        renderer.floorQuote2.seen = true
                    } 
                    if(handshake.quote3) {
                        renderer.UIBuilder.increaseScore("talking")
                        state.myRawEntity.quoteNumber++
                        renderer.floorQuote3.seen = true
                    } 
                    if(handshake.quote4) {
                        renderer.UIBuilder.increaseScore("talking")
                        state.myRawEntity.quoteNumber++
                        renderer.floorQuote4.seen = true
                    } 

                    if(handshake.art1) {
                        renderer.UIBuilder.increaseScore("robot")
                        state.myRawEntity.artNumber++
                    } 
                    if(handshake.art2) {
                        renderer.UIBuilder.increaseScore("robot")
                        state.myRawEntity.artNumber++
                    } 
                    if(handshake.art3) {
                        renderer.UIBuilder.increaseScore("robot")
                        state.myRawEntity.artNumber++
                    } 
                    if(handshake.art4) {
                        renderer.UIBuilder.increaseScore("robot")
                        state.myRawEntity.artNumber++
                    } 

                    clearInterval(placeStick)

                    
                }
            }
        }, 200 )
        
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
    var inviteFloor = invite.searchParams.get("floor")
    handshake.x = inviteX
    handshake.y = inviteY
    handshake.floor = inviteFloor
    

    if(!inviteFloor) {
        handshake.floor = 0;
    }

    //wss://bias.jamesdelaney.ie/test
    //client.connect('ws://localhost:8079', handshake)
    
    client.connect('wss://bias.jamesdelaney.ie/test', handshake)

    let connectionCounter = 0

    

    const update = (delta, tick, now) => {

        if(trails.length > 1000) {
            let trailToRemove = trails.shift()
            renderer.background.removeChild(trailToRemove)
        }

        if(connected == false) {
            connectionCounter++
        }

        if(connectionCounter > 200) {
            renderer.UIBuilder.updateConnection(null, false);
        }

        


        if(state.mySmoothEntity) {

            if(renderer.floorQuote1) {

                let textCenterX = renderer.floorQuote1.x + renderer.floorQuote1.children[0].width/2
                let textCenterY = renderer.floorQuote1.y + renderer.floorQuote1.children[0].height/2
    
                var a = textCenterX - state.mySmoothEntity.x;
                var b = textCenterY - state.mySmoothEntity.y
        
                var c = Math.sqrt( a*a + b*b )
                            
                if(!renderer.floorQuote1.seen) {
                    if(c < 500) {

                        let alpha = (600 - c) / 100

                        renderer.floorQuote1.alpha = alpha
                        let displacement = c - 150
                        if(displacement < 0) {
                            displacement = 0
                        }

                        renderer.displacementFilterText1.scale.set(displacement)

                    } else {
                        renderer.floorQuote1.alpha = 0
                    }
                } else {
                    renderer.floorQuote1.alpha = 1
                }

                if(c < 100 && !renderer.floorQuote1.seen) {
                    //console.log('checker')
                    state.myRawEntity.quoteNumber++
                    renderer.floorQuote1.seen = true
                    renderer.UIBuilder.showAchievement("5", "test")
                    renderer.UIBuilder.increaseScore("talking")
                    window.localStorage.setItem('quote1', true);
                    if(state.myRawEntity.quoteNumber == 4) {
                        //alert('all quotes')
                    }
                }
                
    
               
            }

            if(renderer.floorQuote2) {

                let textCenterX = renderer.floorQuote2.x + renderer.floorQuote2.children[0].width/2
                let textCenterY = renderer.floorQuote2.y + renderer.floorQuote2.children[0].height/2
            
                var a = textCenterX - state.mySmoothEntity.x;
                var b = textCenterY - state.mySmoothEntity.y
            
                var c = Math.sqrt( a*a + b*b )
             
                if(!renderer.floorQuote2.seen) {
                    if(c < 500) {
                
                        let alpha = ((500 - c) / 400) 
                
                        renderer.floorQuote2.alpha = alpha
                        let displacement = c - 150
                        if(displacement < 0) {
                            displacement = 0
                        }
                        renderer.displacementFilterText1.scale.set(displacement)
                
                    } else {
                        renderer.floorQuote2.alpha = 0
                    }
                } else {
                    renderer.floorQuote2.alpha = 1
                }

                if(c < 100 && !renderer.floorQuote2.seen) {
                    state.myRawEntity.quoteNumber++
                    renderer.floorQuote2.seen = true
                    renderer.UIBuilder.showAchievement("5", "test")
                    renderer.UIBuilder.increaseScore("talking")
                    window.localStorage.setItem('quote2', true);
                    if(state.myRawEntity.quoteNumber == 4) {
                        //alert('all quotes')
                    }
                }
                
            
               
            }

            if(renderer.floorQuote3) {

                let textCenterX = renderer.floorQuote3.x + renderer.floorQuote3.children[0].width/2
                let textCenterY = renderer.floorQuote3.y + renderer.floorQuote3.children[0].height/2
            
                var a = textCenterX - state.mySmoothEntity.x;
                var b = textCenterY - state.mySmoothEntity.y
            
                var c = Math.sqrt( a*a + b*b )
             
                if(!renderer.floorQuote3.seen) {
                    if(c < 500) {
                
                        let alpha = ((500 - c) / 400) 
                
                        renderer.floorQuote3.alpha = alpha
                        let displacement = c - 150
                        if(displacement < 0) {
                            displacement = 0
                        }
                        renderer.displacementFilterText1.scale.set(displacement)
                
                    } else {
                        renderer.floorQuote3.alpha = 0
                    }
                } else {
                    renderer.floorQuote3.alpha = 1
                }

                if(c < 100 && !renderer.floorQuote3.seen) {
                    state.myRawEntity.quoteNumber++
                    renderer.floorQuote3.seen = true
                    renderer.UIBuilder.showAchievement("5", "test")
                    renderer.UIBuilder.increaseScore("talking")
                    window.localStorage.setItem('quote3', true);
                    if(state.myRawEntity.quoteNumber == 4) {
                        //alert('all quotes')
                    }
                }
                
            
               
            }

            if(renderer.floorQuote4) {

                let textCenterX = renderer.floorQuote4.x + renderer.floorQuote4.children[0].width/2
                let textCenterY = renderer.floorQuote4.y + renderer.floorQuote4.children[0].height/2
            
                var a = textCenterX - state.mySmoothEntity.x;
                var b = textCenterY - state.mySmoothEntity.y
            
                var c = Math.sqrt( a*a + b*b )
             
                if(!renderer.floorQuote4.seen) {
                    if(c < 500) {
                
                        let alpha = ((500 - c) / 400) 
                
                        renderer.floorQuote4.alpha = alpha
                        let displacement = c - 150
                        if(displacement < 0) {
                            displacement = 0
                        }
                        renderer.displacementFilterText1.scale.set(displacement)
                
                    } else {
                        renderer.floorQuote4.alpha = 0
                    }
                } else {
                    renderer.floorQuote4.alpha = 1
                }

                if(c < 100 && !renderer.floorQuote4.seen) {
                    state.myRawEntity.quoteNumber++
                    renderer.floorQuote4.seen = true
                    renderer.UIBuilder.showAchievement("5", "test")
                    window.localStorage.setItem('quote4', true);
                    renderer.UIBuilder.increaseScore("talking")
                    //console.log('')
                    if(state.myRawEntity.quoteNumber == 4) {
                        //alert('all quotes')
                    }
                }
                
            
               
            }
            
           
            
        }

        client.readNetworkAndEmit()
        handleInput(input, state, client, renderer, delta)
        renderer.update(delta)
        client.update()
    }

    return update
}

export default create


