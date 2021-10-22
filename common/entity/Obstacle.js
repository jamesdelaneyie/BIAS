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

        let angle = state.angle
        angle = angle * Math.PI / 180;

        if(this.name == "johannBlocker" ) {
            this.collider = CollisionSystem.createCircleCollider(state.x, state.y, state.width/2)
        } else if (this.name == "johannBlockerOuter" ) { 
            this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, 1, 1)
        } else {
            this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, state.width, state.height)

        }

        if(angle > 0) {
            this.collider.polygon.setAngle(angle)
        }
        
          
    }
}

Obstacle.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    name: nengi.String,
    width: nengi.UInt16,
    height: nengi.UInt16,
    color: nengi.String,
    angle: { type: nengi.RotationFloat32, interp: true },
    sticker: nengi.UInt16
    //rotate: { type: nengi.RotationFloat32, interp: true }
}

export default Obstacle
