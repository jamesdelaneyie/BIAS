import nengi from 'nengi'

class Walking {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
    }
}

Walking.protocol = {
    id: nengi.Int32,
    x: nengi.Int32,
    y: nengi.Int32
}

export default Walking
