import nengi from 'nengi'

class Flower {
    constructor(state) {
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.color = state.color
    }
}

Flower.protocol = {
    x: nengi.Int32,
    y: nengi.Int32,
    color: nengi.String
}

export default Flower
