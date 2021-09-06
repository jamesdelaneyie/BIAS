import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'
import p2 from 'p2'

class Box {
    constructor(state) {
        this.nid = state.nid
        //this.x = state.x
        //this.y = state.y
        this.name = state.name
        this.type = state.type

        this.width = state.width
        this.height = state.height
        this.rotation = state.rotation
        this.color = state.color
        this.mass = state.mass
        this.radius = state.radius
        this.spin = state.spin
        this.material = state.material
       
        
        if(state.name == "token") {


            this.boxShape = new p2.Box({
                width: state.width, 
                height: state.height
            });

            //var vertices = [[-1,-1], [1,-1], [1,1], [-1,1]];
            //var convexShape = new Convex({ vertices: vertices });
            //body.addShape(convexShape);

            this.boxShape.material = state.material;
            this.body = new p2.Body({
                mass: state.mass,
                position: [state.x, state.y],
            });
    
            
            this.body.addShape(this.boxShape)

            this.collider = CollisionSystem.createRectangleColliderBox(0, 0, 35, 35)   

        } else {

            this.boxShape = new p2.Box({
                width: state.width, 
                height: state.height
            });
            this.boxShape.material = state.material;
            this.body = new p2.Body({
                mass: state.mass,
                position: [state.x, state.y],
            });
    
            
            this.body.addShape(this.boxShape)
            this.collider = CollisionSystem.createRectangleCollider(0,0,0,0)    
        }

        
    }

    get x() {
        return this.collider.x
    }
    set x(value) {
        this.collider.x = value
    }

    get y() {
        return this.collider.y
    }
    set y(value) {
        this.collider.y = value
    }
}

Box.protocol = {
    name: nengi.String,
    type: nengi.String,
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    mass: { type: nengi.Number, interp: true },
    color: nengi.String,
    radius: nengi.UInt16,
    width: nengi.UInt16,
    height: nengi.UInt16,
}

export default Box
