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
        
        this.count = 0
        this.color = state.color    
        this.radius = state.radius
       
       
        let auraColor =  PIXI.utils.string2hex(this.color);

        this.auraContainer = new PIXI.Container()
        this.aura = new Graphics();
        this.aura.beginFill(auraColor, 0.6, true);
        this.aura.lineStyle(1, auraColor, 1)
        this.aura.drawCircle(0, 0, 25);
        this.aura.endFill();
        this.auraContainer.addChild(this.aura)
        //this.aura.blendMode = PIXI.BLEND_MODES.SCREEN;

        this.addChild(this.auraContainer)

        this.body = new Graphics()
        let backgroundColor =  PIXI.utils.string2hex("#202020");
        this.body.beginFill(backgroundColor, 1, true)
        this.body.lineStyle(2, 0xFFFFFF, 1)

       

        
        
        if(this.type == "circle") {
            this.body.drawCircle(0, 0, state.width/6)
        } else {
            this.body.drawRect((-state.width/2)*2, (-state.height/2)*2, state.width*2, state.height*2)
        }
        
        this.body.endFill()
        this.body.pivot.set(0.5,0.5)
        this.body.scale.set(0.5)
        this.body.alpha = 0.2
        this.addChild(this.body)

        this.text = new TaggedText("i", {
            "default": {
                fontFamily: "Monaco",
                fontSize: "16px",
                fontWeight: 700,
                wordWrap: true,
                fill: 0xFFFFFF,
                wordWrapWidth: 25,
            }
        })
        this.text.x = -4
        this.text.y = -6

        this.body.addChild(this.text)
       
        
    }

    setBrightness(value){
        
        let max = 100
        let mapped = value - 20
        let brightness = (max - mapped) / 100
        //console.log(brightness)
        this.body.alpha = brightness
        
    }


    update(delta) {

        this.count++

        this.auraContainer.scale.set(0.4 + Math.sin((this.count/10)) * 0.15, 0.4 + Math.sin((this.count/10)) * 0.15);
        this.aura.alpha = 0.7 + Math.sin((this.count/10)) * 0.1;

    }
}

export default InfoPanelGraphics