import nengi from 'nengi'
import CollisionSystem from '../CollisionSystem.js'
import p2 from 'p2'

class PlayerCharacter {
    constructor(state) {
        // x & y are getters
        this.xV = 0
        this.yV = 0
        this.power = 0
        this.rotation = 0
        this.hitpoints = 100
        this.isAlive = false
        this.speed = 935
        this.size = 30
        this.mass = 1
        this.material = new p2.Material();
        this.footDown = false
        this.color = state.color
        this.name = state.name
        this.self = state.self;
        this.avatar = state.avatar
        this.headphones = false
        this.sleeping = false
        this.typing = false
        this.bodyRotation = 0
        this.floor = state.floor
        this.seat = Math.floor(100 + Math.random()*(150-100));

        this.circleShape = new p2.Circle({
            radius: this.size
        });

        this.circleShape.material = this.material;

        var vertices = [[0,-25], [55, 0], [0, 25]];
        var convexShape = new p2.Convex({ vertices: vertices });


        this.body = new p2.Body({
            mass: 10,
            position: [0, 0]
        });
        this.body.name = "player"
        this.body.addShape(this.circleShape)
        this.body.addShape(convexShape)
        
        this.weapon = {
            onCooldown: false,
            cooldown: 0.5,
            acc: 0
        }

        this.collider = CollisionSystem.createCircleCollider(25, 25, 25)
        
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

PlayerCharacter.protocol = {
    x: { type: nengi.Float32, interp: true },
    y: { type: nengi.Float32, interp: true },
    xV: { type: nengi.Float32, interp: true },
    yV: { type: nengi.Float32, interp: true },
    footDown: nengi.Boolean,
    power: { type: nengi.Float32, interp: true },
    rotation: { type: nengi.RotationFloat32, interp: true },
    bodyRotation: { type: nengi.RotationFloat32, interp: true },
    delta: nengi.Number,
    isAlive: nengi.Boolean,
    color: nengi.String,
    avatar: nengi.String,
    name: nengi.String,
    self: nengi.Boolean,
    hitpoints: nengi.UInt8,
    floor: nengi.UInt8,
    headphones: nengi.Boolean,
    sleeping: nengi.Boolean,
    typing: nengi.Boolean,
    sticker: nengi.UInt16,
    seat: nengi.UInt16,
    artNumber: nengi.UInt16,
    quoteNumber: nengi.UInt16,
    interactionNumber: nengi.UInt16,
}

export default PlayerCharacter
