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

           

            this.body.moveTo(state.width, -state.width);
            this.body.lineTo(0, state.width); 
            this.body.lineTo(-state.width, -state.width);
            this.body.lineTo(0, -state.width);

            
        } else {
            this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
        }
        
        this.body.endFill()
        this.body.pivot.set(0.5,0.5)
        this.body.scale.set(0.5)
        this.addChild(this.body)

        this.text = new PIXI.Text(state.name, {fontSize: 18})
        if(this.type == "triangle") {
            this.text.y = -60
            let height = this.text.height
            this.text.height = height*1.2
        }
        this.text.anchor.set(0.5, 0.5)
        this.addChild(this.text)
       
        
    }

   


    update(delta) {

        this.count++

    }
}

export default ArtGraphics