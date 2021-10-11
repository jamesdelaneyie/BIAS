import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';


class ArtGraphics extends PIXI.Container {
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
       
        this.color = PIXI.utils.string2hex(state.color);

        this.body = new Graphics()
        this.body.beginFill(this.color, 1.0, true)
        this.body.lineStyle(0)
        if(this.type == "circle") {
            this.body.drawCircle(0, 0, state.width)
        } else if (this.type == "triangle") {

            this.body.moveTo(400 -state.width, -state.height);
            this.body.lineTo(200 -state.width, 400 - state.height); 
            this.body.lineTo(0 -state.width,  - state.height);
            this.body.lineTo(200 -state.width,  - state.height);
            
        } else {
            this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
        }
        
        this.body.endFill()
        this.body.pivot.set(0.5,0.5)
        this.body.scale.set(0.5)
        this.addChild(this.body)

        this.text = new PIXI.Text(state.name, {fontSize: 18})
        if(this.type == "triangle") {
            this.text.y = -30
            this.text.width = 100
        }
        this.text.anchor.set(0.5, 0.5)
        this.addChild(this.text)
       
        
    }

   


    update(delta) {

        this.count++

    }
}

export default ArtGraphics