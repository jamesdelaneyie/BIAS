import nengi from 'nengi'

class Floor {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.wallColor = state.wallColor
        this.gridColor = state.gridColor
        this.floorColor = state.floorColor
    }
}

Floor.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
    floorColor: nengi.String,
    wallColor: nengi.String,
    gridColor: nengi.String
}

export default Floor
