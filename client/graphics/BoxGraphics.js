import * as PIXI from 'pixi.js'
import {AsciiFilter} from '@pixi/filter-ascii';


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
        this.body.drawRect(state.width/2, state.height/2, state.width, state.height)

        this.body.endFill()
        this.pivot.set(state.width/2, state.height/2);
        this.addChild(this.body)
        
    }

    update(delta) {

    }
}

export default BoxGraphics