import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'

class Portal {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.rotation = state.rotation
        this.color = state.color
        this.collider = CollisionSystem.createRectangleCollider(this.x, this.y, state.width, state.height) 
        this.exit = state.exit
        this.extra = state.extra
    }
}

Portal.protocol = {
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    width: nengi.UInt16,
    height: nengi.UInt16,
}

export default Portal
