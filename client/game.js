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
import * as PIXI from 'pixi.js'
import { Sound, filters } from '@pixi/sound';
import MultiStyleText from 'pixi-multistyle-text'


const create = () => {
    const client = new nengi.Client(nengiConfig, 100)
    const renderer = new PIXIRenderer()
    const input = new InputSystem(renderer, client)

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

        const text = new MultiStyleText("<dot>●</dot> Connected to Nengi Instance as <hi>"+ state.name +"</hi>", {
            "default": {
                fontFamily: "Monaco",
                fontSize: "10px",
                fill: "#ececec",
                align: "left"
            },
            "dot": {
                fontSize: "15px",
                fill: "#00ff00"
            },
            "hi": {
                fontSize: "10px",
                fill: "#ffffff"
            }
        });
        renderer.stage.addChild(text);
        text.x = 10;
        text.y = window.innerHeight - 40;

        window.myName = state.name

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

        console.log(call);

        const connectionId = call.connectionId
        const callerID = call.peer

    
        call.answer(window.localStream) 
        const text = new MultiStyleText("<dot>●</dot> Connected With: "+callerID +" (ID:"+connectionId+")", {
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
        text.y = 30;// A
        
        call.on('stream', function(stream) { // C
           window.remoteAudio.srcObject = stream;
           window.remoteAudio.autoplay = true;
           window.peerStream = stream;
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

        console.log('Notification', message)

        if(message.type == "notification") {
            message.x = 0
            message.y = 0
            addMessage(renderer.stage, message);
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

        }
        
    })
    
    


    client.on('predictionErrorFrame', predictionErrorFrame => {
        reconcilePlayer(predictionErrorFrame, client, state.myRawEntity, state.obstacles, state.boxes)
    })

    client.on('connected', res => { 

        console.log('connection?:', res)
        const connectedText = new MultiStyleText("<dot>●</dot> Connected to Server ["+res.text+"]", {
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
        renderer.stage.addChild(connectedText);
        connectedText.x = 10;
        connectedText.y = window.innerHeight - 25;



        const backgroundMusic = Sound.from('audio/background.mp3');
        backgroundMusic.speed = 0.9
        backgroundMusic.volume = 0.05
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
        console.log('connection closed') 

        const disconnectedText = new MultiStyleText("<dot>●</dot> Connected to Server", {
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
        renderer.stage.addChild(disconnectedText);
        disconnectedText.x = 10;
        disconnectedText.y = window.innerHeight - 25;
    })



    //client.connect('ws://localhost:8079')
    client.connect('wss://bias.jamesdelaney.ie/test')


    const update = (delta, tick, now) => {
        client.readNetworkAndEmit()
        handleInput(input, state, client, renderer, delta)
        renderer.update(delta)
        client.update()

        //console.log(window.peerStream)
    }

    return update
}

export default create


