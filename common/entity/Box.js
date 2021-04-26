import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'
import p2 from 'p2'

class Box {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color

        this.boxShape = new p2.Box({
            width: state.width, 
            height: state.height
        });
        this.body = new p2.Body({
            mass: 5,
            position: [state.x, state.y]
        });
        this.body.addShape(this.boxShape)

        //this.collider = CollisionSystem.createRectangleCollider(state.x, state.y, state.width, state.height)    
    }
}

Box.protocol = {
    x: nengi.UInt16,
    y: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
}

export default Box
