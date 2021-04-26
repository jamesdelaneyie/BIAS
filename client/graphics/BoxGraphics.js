import * as PIXI from 'pixi.js'

class BoxGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color

        this.body = new PIXI.Graphics()
        this.body.beginFill(0xffffff)
        this.body.drawRect(0, 0, state.width, state.height)
        this.body.endFill()
        this.pivot.set(state.width/2, state.height/2);
        //this.body.tint = state.color
        this.addChild(this.body)
        
    }

    update(delta) {

    }
}

export default BoxGraphics