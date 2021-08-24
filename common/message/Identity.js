import nengi from 'nengi'

class Identity {
    constructor(rawId, smoothId, peerId) {
        this.rawId = rawId
        this.smoothId = smoothId
        this.peerId = peerId
    }
}

Identity.protocol = {
    rawId: nengi.UInt16,
    smoothId: nengi.UInt16,
    peerId: nengi.String
}

export default Identity
