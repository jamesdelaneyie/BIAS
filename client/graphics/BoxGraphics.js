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
        this.radius = state.radius

        this.wrapper = new PIXI.Container()
        this.body = new PIXI.Graphics()

        this.color = PIXI.utils.string2hex(this.color);
        this.body.beginFill(this.color)

        this.body.drawRect(-state.width/2, -state.height/2, state.width, state.height)
        //this.body.pivot.set(0, 0)
        this.body.endFill()

        /*if(this.radius > 0) {
            const science = PIXI.Texture.from('images/science.png');
            const scienceBall = new PIXI.Sprite(science);
            scienceBall.anchor.set(0.5,0.5);
            this.wrapper.addChild(scienceBall);
        }

        if(state.width == 100) {
            const science = PIXI.Texture.from('images/gallery.png');
            const scienceBall = new PIXI.Sprite(science);
            scienceBall.anchor.set(0.5,0.5);
            this.wrapper.addChild(scienceBall);
        }*/

       
        
        /*
        if(state.width == 100) {
            this.body.drawRect(-50, -50, state.width, state.height)
            this.body.pivot.set(0, 0)
        } else if(state.width == 101){
            this.body.drawCircle(0, 0, this.radius)
            this.body.pivot.set(0, 0)
        }else if(state.width == 20) {
            this.body.drawRect(0, -500, state.width, state.height)
        } else {
            this.body.drawRect(-500, 0, state.width, state.height)
        }*/
        
        this.body.endFill()
        this.addChild(this.body)
        this.addChild(this.wrapper)
        
    }

    update(delta) {

    }
}

export default BoxGraphics