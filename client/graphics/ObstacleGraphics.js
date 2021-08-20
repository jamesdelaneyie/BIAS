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

        //this.wrapper = new PIXI.Container()
        
        this.body = new PIXI.Graphics()
        const color = PIXI.utils.string2hex("#343434");
        this.body.beginFill(color)
        this.body.drawRect(-this.border, -this.border, state.width, state.height)
        this.body.endFill()
        this.addChild(this.body)
        
        //this.addChild(this.wrapper)

        /*let texture = PIXI.Texture.from('images/pattern-1.png');
        if(state.width == 60) {
            texture = PIXI.Texture.from('images/pattern-2.png');
        } 
        //const texture = PIXI.Texture.from('images/pattern-1.png');
        //console.log(state.width);
        const bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0,0);
        bunny.x = 0
        bunny.y = 0
        bunny.height = state.height
        bunny.width = state.width
        this.wrapper.addChild(bunny);*/


        
    }

    update(delta) {

    }
}

export default ObstacleGraphics