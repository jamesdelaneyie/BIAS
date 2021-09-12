import nengi from 'nengi'

class Hitting {
    constructor(id, force, x, y) {
        this.id = id
        this.force = force
        this.x = x
        this.y = y
    }
}

Hitting.protocol = {
    id: nengi.Int32,
    force: nengi.Int32,
    x: nengi.Int32,
    y: nengi.Int32
}

export default Hitting