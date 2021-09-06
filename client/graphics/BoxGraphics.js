import * as PIXI from 'pixi.js'

class BoxGraphics extends PIXI.Container {
    constructor(state) {
        super()
        this.nid = state.nid
        this.name = state.name
        this.type = state.type

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color    
        this.radius = state.radius
       
        this.color = PIXI.utils.string2hex(this.color);

        const type = this.type
        //console.log(type)
        if(this.name == "token") {
            this.body = new PIXI.Graphics()
            this.tokenImage = new PIXI.Sprite.from('images/'+type+'-icon.svg');
            this.tokenImage.width = 44
            this.tokenImage.height = 44
            this.tokenImage.anchor.set(0.5)
            this.body.addChild(this.tokenImage)
            this.addChild(this.body)
        } else {
            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.drawRect(-state.width/2, -state.height/2, state.width, state.height)
            this.body.endFill()
            this.addChild(this.body)
        }
       
        
    }

    updateColor(color) {
        if(this.name == "token") {
            /*let updateColor = PIXI.utils.string2hex(color);
            this.body.clear()
            this.body.beginFill(updateColor)
            this.body.drawRect(-this.width/2, -this.height/2, 25, 25)
            this.body.endFill()*/
        } else {
            let updateColor = PIXI.utils.string2hex(color);
            this.body.clear()
            this.body.beginFill(updateColor)
            this.body.drawRect(-this.width/2, -this.height/2, this.width, this.height)
            this.body.endFill()
        }
        
        
    }

    update(delta) {

    }
}

export default BoxGraphics