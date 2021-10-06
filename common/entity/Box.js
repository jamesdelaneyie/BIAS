import p2 from 'p2'
import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'


class Box {
    constructor(state) {
        this.nid = state.nid
        
        this.name = state.name
        this.type = state.type

        this.width = state.width
        this.height = state.height
        
        this.color = state.color
        this.mass = state.mass
        this.radius = state.radius
        this.spin = state.spin
        this.material = state.material
       
        
        if(state.name == "token") {


            this.boxShape = new p2.Box({
                width: state.height, 
                height: state.width
            });

            //var vertices = [[-1,-1], [1,-1], [1,1], [-1,1]];
            //var convexShape = new Convex({ vertices: vertices });
            //body.addShape(convexShape);

            this.boxShape.material = state.material;
            if(this.type == "video") {
                this.body = new p2.Body({
                    mass: state.mass,
                    angle: 1.5708,
                    position: [state.x, state.y],
                });
            } else if(this.type == "like") {
                this.body = new p2.Body({
                    mass: state.mass,
                    angle: 1.5708,
                    angularForce: 1,
                    angularVelocity: [1,1],
                    position: [state.x, state.y],
                });
            } else {
                this.body = new p2.Body({
                    mass: state.mass,
                    position: [state.x, state.y],
                });
            }

          

           
            this.body.addShape(this.boxShape)
            if(this.type == "security-cam") {
                this.collider = CollisionSystem.createRectangleColliderBox(0, 0, 1, 1)
            } else {
                this.collider = CollisionSystem.createRectangleColliderBox(0, 0, state.width, state.height)
            }
            

            

        } else {

            this.boxShape = new p2.Box({
                width: state.width, 
                height: state.height
            });
            this.boxShape.material = state.material;
            
           

            if(this.name == "merryGoRound") {
                this.body = new p2.Body({
                    mass: state.mass,
                    position: [state.x + state.width/2, state.y + state.height/2],
                    angle: 0.785398
                });
            } else {
                this.body = new p2.Body({
                    mass: state.mass,
                    position: [state.x + state.width/2, state.y + state.height/2],
                });
            }
    
            
            this.body.addShape(this.boxShape)
            if(this.name == "merryGoRound") {
                this.collider = CollisionSystem.createRectangleColliderBox(0, 0, 1, 1)
            } else {
                this.collider = CollisionSystem.createRectangleColliderBox(0, 0, state.width, state.height)
            }
            
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
