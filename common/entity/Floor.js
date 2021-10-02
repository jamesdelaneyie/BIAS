import nengi from 'nengi'

class Floor {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.gridColor = state.gridColor
        this.floorColor = state.floorColor
        this.gridGap = state.gridGap
    }
}

Floor.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
    floorColor: nengi.String,
    gridColor: nengi.String,
    gridGap: nengi.UInt16
}

export default Floor
