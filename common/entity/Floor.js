import nengi from 'nengi'

class Floor {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color
    }
}

Floor.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
    color: nengi.String,
}

export default Floor
