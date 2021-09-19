import * as PIXI from 'pixi.js'

class PortalGraphics extends PIXI.Container {
    constructor(state, style) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
       //this.width = state.width
        //this.height = state.height
        this.color = state.color    
        this.color = PIXI.utils.string2hex("#800080");

        if(style == "top") {
            const portalTop = new PIXI.Sprite.from('images/portal-top.svg');
            portalTop.width = 100;
            portalTop.height = 17;
            portalTop.x = -25
            portalTop.y = -15
            this.addChild(portalTop)

        } else {

            let base = new PIXI.Graphics()
            base.beginFill(0x000000)
            base.drawRect(-25, -50, state.width, 100)
            base.endFill()
            this.addChild(base)
            
            let walls = new PIXI.Graphics()
            walls = new PIXI.Graphics()
            walls.beginFill(this.color)
            walls.drawRect(-25, -25, state.width, 10)
            walls.endFill()
            this.addChild(walls)

        }
        //console.log(style)

      
        
    }

    update(delta) {

    }
}

export default PortalGraphics