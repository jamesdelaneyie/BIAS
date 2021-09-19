import nengi from 'nengi'

class Identity {
    constructor(rawId, smoothId, peerId, avatar, name, color) {
        this.rawId = rawId
        this.smoothId = smoothId
        this.peerId = peerId
        this.avatar = avatar
        this.name = name
        this.color = color
    }
}

Identity.protocol = {
    rawId: nengi.UInt16,
    smoothId: nengi.UInt16,
    peerId: nengi.String,
    avatar: nengi.String,
    name: nengi.String,
    color: nengi.String
}

export default Identity
