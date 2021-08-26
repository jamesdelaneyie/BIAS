import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'

class Obstacle {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.border = state.border
        this.color = state.color
        this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, state.width, state.height)  
          
    }
}

Obstacle.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
    border: nengi.UInt16,
    color: nengi.String,
}

export default Obstacle
