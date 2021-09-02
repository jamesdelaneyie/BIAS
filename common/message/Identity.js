import nengi from 'nengi'

class Identity {
    constructor(rawId, smoothId, peerId, avatar, name) {
        this.rawId = rawId
        this.smoothId = smoothId
        this.peerId = peerId
        this.avatar = avatar
        this.name = name
    }
}

Identity.protocol = {
    rawId: nengi.UInt16,
    smoothId: nengi.UInt16,
    peerId: nengi.String,
    avatar: nengi.String,
    name: nengi.String,
}

export default Identity
