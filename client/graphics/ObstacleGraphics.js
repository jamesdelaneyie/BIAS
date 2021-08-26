import * as PIXI from 'pixi.js'


class ObstacleGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.border = state.border
        this.color = state.color

        this.color = PIXI.utils.string2hex(this.color);
        this.wrapper = new PIXI.Container()

        this.body = new PIXI.Graphics()
        this.body.beginFill(this.color)
        this.body.drawRect(-this.border, -this.border, state.width, state.height)
        this.body.endFill()
        
        this.wrapper.addChild(this.body)
        this.addChild(this.wrapper)
    
        
    }

    updateColor(color) {
        let updateColor = PIXI.utils.string2hex(color);
        this.body.beginFill(updateColor)
        this.body.drawRect(-this.border, -this.border, this.width, this.height)
        this.body.endFill()
    }

    update(delta) {
        //console.log(this.color)
    }
}

export default ObstacleGraphics