async function startCall(target) {
    if (!peer) return;
    const call = peer.call(target, await getAudioStream());
    receiveCall(call);
}

// play the stream from the call in a video element
function receiveCall(call) {
    call.on('stream', stream => {
    // stream.noiseSuppression = true;
    const player = players.find(p => p.id === call.peer);
    if (!player) {
        console.log('couldn\'t find player for stream', call.peer);
    } else {
        player.stream = new StreamSplit(stream, {left: 1, right: 1});
        playAudioStream(stream, call.peer);
        log('created stream for', call.peer);
    }
     playAudioStream(stream, call.peer);
    });
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}