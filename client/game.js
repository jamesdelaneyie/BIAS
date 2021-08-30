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
import { Sound, filters } from '@pixi/sound';
import MultiStyleText from 'pixi-multistyle-text'
import AudioStreamMeter from 'audio-stream-meter'


const create = () => {
    
    const client = new nengi.Client(nengiConfig, 100)
    const renderer = new PIXIRenderer()
    let input = new InputSystem(renderer, client)

    window.renderer = renderer

    const state = {
        myRawId: null,
        mySmoothId: null,
        myPeerId: null,
        obstacles: new Map(),
        boxes: new Map(),
        floors: new Map()
    }

    

    clientHookAPI(
        client,
        createHooks(state, renderer)
    )

    client.entityUpdateFilter = (update) => {
        return shouldIgnore(state.myRawId, update)
    }



    function getLocalStream() {
        navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
            window.localStream = stream;
            window.localAudio.srcObject = stream;
            window.localAudio.autoplay = true;
        }).catch( err => {
            console.log("u got an error:" + err)
        });
    }






    client.on('message::Identity', message => {
        state.myRawId = message.rawId
        state.mySmoothId = message.smoothId
        state.myPeerId = message.peerId
        state.name = message.name;

        const userSettings = window.localStorage;
        userSettings.setItem('name', state.name);
        window.myName = state.name

        renderer.UIBuilder.joinInstance(state.name, state.myRawId)
        

        const myPeer = new Peer(""+state.name+"",{
            host:'/', 
            path: '/',
            port: 9000
        })
        
        let peerID;
    
        myPeer.on('open', function(id) {
            peerID = id;
    
            const text = new MultiStyleText("<dot>●</dot> Device ID: "+peerID+"", {
                "default": {
                    fontFamily: "Monaco",
                    fontSize: "10px",
                    fill: "#ececec",
                    align: "left"
                },
                "dot": {
                    fontSize: "15px",
                    fill: "#0000ff"
                }
            });
            renderer.stage.addChild(text);
            text.x = 10;
            text.y = 10;
    
        });
        myPeer.on('error', function (err) {
            console.log(err.type)
            if(err.type == 'server-error') {
                const text = new MultiStyleText("<dot>●</dot> Unable to connect to peer server. Please reload page.", {
                    "default": {
                        fontFamily: "Monaco",
                        fontSize: "10px",
                        fill: "#ececec",
                        align: "left"
                    },
                    "dot": {
                        fontSize: "15px",
                        fill: "#ff0000"
                    }
                });
                renderer.stage.addChild(text);
                text.x = 10;
                text.y = 5;
    
            }
        });
        window.myPeer = myPeer

   
    const hangUpBtn = document.querySelector('.hangup-btn');
    hangUpBtn.addEventListener('click', function (){
        conn.close();
        showCallContent();
    })

    const callSound = Sound.from('audio/calling.mp3');
    callSound.volume = 0.05
    callSound.loop = true

    myPeer.on('call', function(call) {

        call.answer(window.localStream) 
        const connectionId = call.connectionId

        const text = new MultiStyleText("<dot>●</dot> Connected With: "+call.peer +" (ID:"+connectionId+")", {
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
        renderer.stage.addChild(text);
        text.x = 10;
        text.y = 30;
        
        call.on('stream', function(stream) { // C
           window.remoteAudio.srcObject = stream;
           window.remoteAudio.autoplay = true;
           window.peerStream = stream;

           var audioContext = new AudioContext();
				
            var mediaStream = audioContext.createMediaStreamSource(stream);

            var meter = AudioStreamMeter.audioStreamProcessor(audioContext, function() {
                //console.log("Their Volume:" + meter.volume * 100 + '%');
            });
            
            mediaStream.connect(meter);
        });
     
        
     });
        

    
    myPeer.on('connection', function(conn){
        conn.on('data', (data) => {
            console.log(data);
        });
        conn.on('open', () => {
            conn.send('hello!');
        });
    });

    
    

        getLocalStream();
       
    })


    client.on('message::WeaponFired', message => {
        if (message.sourceId === state.mySmoothEntity.nid) {
            return
        }
        const { x, y, tx, ty } = message
        drawHitscan(renderer.background, x, y, tx, ty, 0x000000)
    })





    const portalSound = Sound.from('audio/car.mp3');

    client.on('message::Notification', message => {

        if(message.type == "scoreIncrease") {
            renderer.UIBuilder.increaseScore()
        }

        if(message.type == "worldInfoTime") {
            renderer.UIBuilder.updateWorldTime(message.text)
        }

        if(message.type == "worldInfoTotalUsers") {
            renderer.UIBuilder.updateTotalUsers(message.text)
        }

        if(message.type == "worldInfoActiveUsers") {
            renderer.UIBuilder.updateActiveUsers(message.text)
        }

        if(message.type == "personJoined") {
            renderer.UIBuilder.personJoined(message.text)
        }
        if(message.type == "personLeft") {
            renderer.UIBuilder.personLeft(message.text)
        }

        if(message.type == "emojiBlast") {
            emojiBlast(renderer.middleground, message);
        }

        if(message.type == "text") {
            addMessage(renderer.middleground, message);
        }
        if(message.type == "talk") {
            addMessage(renderer.middleground, message);
        }
        if(message.type == "sound") {
            
            if(portalSound.isPlaying == false) {
                portalSound.play(); 
            }
            renderer.videoTexture.baseTexture.resource.source.pause()

        }

        if(message.type == "command") {


            if(renderer.videoTexture.baseTexture.resource.source.paused) {
                renderer.videoTexture.baseTexture.resource.source.play()
                console.log('playing');
            } else {
                //renderer.videoTexture.baseTexture.resource.source.pause()
                //console.log('paused');
            }

            
        }
        
    })
    
    


    client.on('predictionErrorFrame', predictionErrorFrame => {
        reconcilePlayer(predictionErrorFrame, client, state.myRawEntity, state.obstacles, state.boxes)
    })

    client.on('connected', res => { 

        console.log('connection?:', res)
        
        renderer.UIBuilder.updateConnection(res, true);
        

        const backgroundMusic = Sound.from('audio/background.mp3');
        backgroundMusic.speed = 0.9
        backgroundMusic.volume = 0.02
        backgroundMusic.loop = true;

        const telephone = new filters.TelephoneFilter(1)
        const distorsion = new filters.DistortionFilter(0.1)
        backgroundMusic.filters = [telephone, distorsion]
        //backgroundMusic.play()

        const name = localStorage.getItem('name');
        if(name) {
            console.log('lemme join!')
        }
        
    })

    client.on('disconnected', () => { 
        //console.log('connection closed') 

        renderer.UIBuilder.updateConnection(null, false);

    })



    client.connect('ws://localhost:8079')
    //client.connect('wss://bias.jamesdelaney.ie/test')


    const update = (delta, tick, now) => {
        client.readNetworkAndEmit()
        handleInput(input, state, client, renderer, delta)
        renderer.update(delta)
        client.update()
    }

    return update
}

export default create


