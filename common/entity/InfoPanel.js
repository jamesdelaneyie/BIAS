import p2 from 'p2'
import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'
import SAT from 'sat'


class InfoPanel {
    constructor(state) {
        this.nid = state.nid
        
        this.name = state.name
        this.type = state.type

        this.width = state.width
        this.height = state.height
        
        this.color = state.color
        this.rotation = state.rotation
        this.material = state.material

        const vectors = []

        if(this.type == "circle") {
            this.boxShape = new p2.Circle({
                radius: state.width/2
            });
        } else {
            this.boxShape = new p2.Box({
                width: state.width, 
                height: state.height
            });
        }
       
        
        this.boxShape.material = state.material;
        
        this.body = new p2.Body({
            mass: state.mass,
            position: [state.x + state.width/2, state.y + state.height/2],
        });

        
        this.body.addShape(this.boxShape)
        if(this.type == "circle") {
            this.collider = CollisionSystem.createCircleCollider(0, 0, state.width/2)
        } else {
            this.collider = CollisionSystem.createRectangleColliderBox(0, 0, state.width, state.height)
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

InfoPanel.protocol = {
    name: nengi.String,
    type: nengi.String,
    x: { type: nengi.Number, interp: true },
    y: { type: nengi.Number, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    color: nengi.String,
    width: nengi.UInt16,
    height: nengi.UInt16,
}

export default InfoPanel
