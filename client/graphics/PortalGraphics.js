import * as PIXI from 'pixi.js'

class PortalGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color    
        this.radius = state.radius
        this.extra = state.extra

        this.color = PIXI.utils.string2hex("#FFFFFF");
        
        this.body = new PIXI.Graphics()
        this.body.beginFill(0xFFFFFF)
        this.body.drawRect(-25, -25, state.width, state.height)
        this.body.endFill()
        
        this.addChild(this.body)
        
    }

    update(delta) {

    }
}

export default PortalGraphics