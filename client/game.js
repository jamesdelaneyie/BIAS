
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



const create = () => {
    const client = new nengi.Client(nengiConfig, 100)
    const renderer = new PIXIRenderer()
    const input = new InputSystem(renderer, client)

    let peerID = '12'
   /* var chosenValue = Math.random() < 0.5 ? 'james' : 'rory';
   
    const myPeer = new Peer(chosenValue, {host:'/', secure:true, port:443, path: '/peerjs'})
    let peerID;

    myPeer.on('open', function(id) {
        peerID = id;
        window.caststatus.textContent = `Your device ID is: ${myPeer.id}`;
        
    });
    window.myPeer = myPeer

    const callBtn = document.querySelector('.call-btn');
    let code;

    function getStreamCode() {
        code = window.prompt('Please enter the sharing code');
    }

    const hangUpBtn = document.querySelector('.hangup-btn');
    hangUpBtn.addEventListener('click', function (){
        conn.close();
        showCallContent();
    })

    callBtn.addEventListener('click', function(){
        getStreamCode();
        connectPeers();
        const call = myPeer.call(code, window.localStream); // A
    
        call.on('stream', function(stream) { // B
            window.remoteAudio.srcObject = stream; // C
            window.remoteAudio.autoplay = true; // D
            window.peerStream = stream; //E
            showConnectedContent(); //F    });
        })
    })

    myPeer.on('call', function(call) {
        const answerCall = confirm("Do you want to answer?")
     
        if(answerCall){
           call.answer(window.localStream) // A
           showConnectedContent(); // B
           call.on('stream', function(stream) { // C
              window.remoteAudio.srcObject = stream;
              window.remoteAudio.autoplay = true;
              window.peerStream = stream;
           });
        } else {
           console.log("call denied"); // D
        }
     });
        

    let conn;
    myPeer.on('connection', function(conn){
        conn.on('data', (data) => {
            console.log(data);
        });
        //conn = connection;
        conn.on('open', () => {
            conn.send('hello!');
        });
    });

    function connectPeers() {
        conn = myPeer.connect(code)
    }?*/
        

    const state = {
        myRawId: null,
        mySmoothId: null,
        myPeerId: peerID,
        obstacles: new Map(),
        boxes: new Map(),
        floors: new Map()
    }

    clientHookAPI( // API EXTENSION
        client,
        createHooks(state, renderer)
    )

    client.entityUpdateFilter = (update) => {
        return shouldIgnore(state.myRawId, update)
    }



    const audioContainer = document.querySelector('.call-container');

    function showCallContent() {
        window.caststatus.textContent = `Your device ID is: ${myPeer.id}`;
        callBtn.hidden = false;
        audioContainer.hidden = true;
    }

    function showConnectedContent() {
        window.caststatus.textContent = `You're connected`;
        callBtn.hidden = true;
        audioContainer.hidden = false;
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

        
        getLocalStream();

        //getStreamCode();

        connectPeers();

       /* const call = myPeer.call(code, window.localStream); // A
        console.log(code, window.localStream)
        console.log(call)

        call.on('stream', function(stream) { // B
            window.remoteAudio.srcObject = stream; // C
            window.remoteAudio.autoplay = true; // D
            window.peerStream = stream; //E
            showCallContent()
            showConnectedContent(); //F]
            console.log('connected')
        });*/

       
    })


    client.on('message::WeaponFired', message => {
        if (message.sourceId === state.mySmoothEntity.nid) {
            return
        }
        const { x, y, tx, ty } = message
        drawHitscan(renderer.middleground, x, y, tx, ty, 0xff0000)
    })

    client.on('message::Notification', message => {
        //console.log('Notification', message)
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
        
    })
    
    

    //messages to clients / local for view // spacial structure
    //channel is list of entities / 

    client.on('predictionErrorFrame', predictionErrorFrame => {
        reconcilePlayer(predictionErrorFrame, client, state.myRawEntity, state.obstacles, state.boxes)
    })

    client.on('connected', res => { 
        console.log('connection?:', res) 
        //startCall(target);
    })

    client.on('disconnected', () => { 
        console.log('connection closed') 
    })

    //client.connect('ws://localhost:8079')
    client.connect('wss://bias.jamesdelaney.ie/test')


    const update = (delta, tick, now) => {
        client.readNetworkAndEmit()
        handleInput(input, state, client, renderer, delta)
        renderer.update(delta)
        client.update()
    }

    return update
}

export default create


