import nengi from 'nengi'

class Notification {
    constructor(text, type, x, y) {
        this.text = text
        this.type = type
        this.x = x
        this.y = y
    }
}

Notification.protocol = {
    text: nengi.String,
    type: nengi.String,
    x: nengi.Int32,
    y: nengi.Int32
}

export default Notification
