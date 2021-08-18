import * as PIXI from 'pixi.js'
import * as PUXI from 'puxi.js'

class PlayerInfoGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        
        this.info = new PUXI.Stage(100,100)
        const textStyle = new PIXI.TextStyle({fill: 0xffffff, fontSize: '8px', fontWeight: 100});
        const name = new PUXI.TextWidget('ID: '+this.nid+'', textStyle).setBackground(0xffffff).setBackgroundAlpha(0.2).setPadding(3);
        name.tint = 0x00ff00
        this.info.addChild(name)

        //this.addChild(this.info)
    }

    hide() {
        this.body.name = false
    }

    update(delta) {
        //this.x = state.x
    }
}

export default PlayerInfoGraphics
