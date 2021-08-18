import nengi from 'nengi'

class Notification {
    constructor(text, x, y) {
        this.text = text
        this.x = x
        this.y = y
    }
}

Notification.protocol = {
    text: nengi.String,
    x: nengi.Int32,
    y: nengi.Int32
}

export default Notification
