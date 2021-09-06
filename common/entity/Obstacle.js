import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'
import SAT from 'sat'

class Obstacle {
    constructor(state) {
        this.nid = state.nid
        this.name = state.name
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color
        this.angle = state.angle

        if(state.name == "circleBuilding") {

            this.collider = CollisionSystem.createCircleCollider(state.x, state.y, state.width/2)

        } else if (state.name == "crystal") {
           
            const vectors = []
            const points = [[0,0],[-100,-100],[-100,-400],[0,-500],[100,-400],[100,-100]]

            points.forEach(point => {
                vectors.push(new SAT.Vector( point[0], point[1] ))
            })
            
            this.collider = CollisionSystem.createPolygonCollider(state.x, state.y, vectors)
            
            const pi = Math.PI
            let degrees = this.angle * (pi/180)
            this.collider.polygon.rotate(degrees)

        } else {
            this.collider = CollisionSystem.createRectangleCollider(state.x + 25, state.y + 25, state.width, state.height)
            
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
    angle: nengi.UInt16
}

export default Obstacle
