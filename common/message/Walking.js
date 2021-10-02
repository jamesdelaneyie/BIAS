import nengi from 'nengi'

class Walking {
    constructor(id, color, angle, x, y) {
        this.id = id
        this.color = color
        this.angle = angle
        this.x = x
        this.y = y
    }
}

Walking.protocol = {
    id: nengi.Int32,
    color: nengi.String, 
    angle: nengi.RotationFloat32,
    x: nengi.Int32,
    y: nengi.Int32
}

export default Walking
