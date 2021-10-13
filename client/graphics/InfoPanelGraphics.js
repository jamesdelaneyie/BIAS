import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import TaggedText from 'pixi-tagged-text';


class InfoPanelGraphics extends PIXI.Container {
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
        this.body.beginFill(this.color, 1, true)
        this.body.lineStyle(2, 0xFFFFFF, 0.5)

        console.log('now')
        
        if(this.type == "circle") {
            this.body.drawCircle(0, 0, state.width)
            
        } else {
            this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
            console.log('now')
        }
        
        this.body.endFill()
        this.body.pivot.set(0.5,0.5)
        this.body.scale.set(0.5)
        this.addChild(this.body)

        this.text = new TaggedText("i", {
            "default": {
                fontFamily: "Monaco",
                fontSize: "18px",
                align: "left",
                fontWeight: 700,
                wordWrap: true,
                fill: 0x848484,
                wordWrapWidth: 30,
                align: "center",
                textDecoration: "underline"
            }, 
            "bold": {
                fontWeight: 700
            }
        }, {drawWhitespace: true})
        this.text.x = -14
        this.text.y = -8
        this.text.anchor.set(0.5, 0.5)
        this.addChild(this.text)
       
        
    }

   


    update(delta) {

        this.count++

    }
}

export default InfoPanelGraphics