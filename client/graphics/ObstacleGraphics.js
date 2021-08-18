import * as PIXI from 'pixi.js'


class ObstacleGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height

        this.wrapper = new PIXI.Container()
        
        this.body = new PIXI.Graphics()
        this.body.beginFill(0xffffff)
        this.body.drawRect(0, 0, state.width, state.height)

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


        this.body.endFill()
        this.body.tint = 0xff0000
        this.addChild(this.body)
        this.addChild(this.wrapper)
    }

    update(delta) {

    }
}

export default ObstacleGraphics