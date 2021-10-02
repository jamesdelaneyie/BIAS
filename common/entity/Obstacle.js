import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'

class Obstacle {
    constructor(state) {
        this.nid = state.nid

        this.x = state.x
        this.y = state.y
        this.name = state.name
        this.width = state.width
        this.height = state.height
        this.color = state.color
        this.angle = state.angle

        this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, state.width, state.height)
          
    }
}

Obstacle.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    name: nengi.String,
    width: nengi.UInt16,
    height: nengi.UInt16,
    color: nengi.String,
    angle: nengi.UInt16
}

export default Obstacle
