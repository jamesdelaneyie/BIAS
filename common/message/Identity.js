import nengi from 'nengi'

class Identity {
    constructor(rawId, smoothId, peerId, name) {
        this.rawId = rawId
        this.smoothId = smoothId
        this.peerId = peerId
        this.name = name
    }
}

Identity.protocol = {
    rawId: nengi.UInt16,
    smoothId: nengi.UInt16,
    peerId: nengi.String,
    name: nengi.String,
}

export default Identity
