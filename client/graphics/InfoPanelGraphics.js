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
        this.isActive = false
       
        let auraColor =  PIXI.utils.string2hex(this.color);

        this.auraContainer = new PIXI.Container()
        this.aura = new Graphics();
        this.aura.beginFill(auraColor, 0.6, true);
        this.aura.lineStyle(1, auraColor, 1)
        this.aura.drawCircle(0, 0, 25);
        this.aura.endFill();
        this.auraContainer.addChild(this.aura)

        this.addChild(this.auraContainer)

        this.body = new Graphics()
        let backgroundColor = PIXI.utils.string2hex("#202020");
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
        this.body.alpha = 1
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


        this.clickNudge = new TaggedText("Inspect", {
            "default": {
                fontFamily: 'Trade Gothic Next',
                fontSize: "16px",
                fontWeight: 400,
                fill: 0xFFFFFF,
                letterSpacing: 0.3
            }
        })
        this.clickNudge.pivot.set(0.5,0.5)
        this.clickNudge.scale.set(0.5)
        this.clickNudge.alpha = 0
        this.clickNudge.x = -13
        this.clickNudge.y = 0
        this.addChild(this.clickNudge)
       
        
    }

    setBrightness(value){

        //console.log(value)
        if(value < 100) {
            this.isActive = true

            this.auraContainer.scale.set(0.6, 0.6);
            this.aura.alpha = 0.8


            let max = 100
            let mapped = value - 20
            let brightness = (max - mapped) / 100
            //this.body.alpha = brightness

            mapped = value
            brightness = (max - mapped) / 100
           // console.log(brightness)
            
            if(brightness < 0.15) {
                this.clickNudge.alpha = 0
            } else {
                this.clickNudge.alpha = brightness + 0.2
            }
            let yOffset = (value / 4) - 40
            //console.log(yOffset)
            this.clickNudge.y = yOffset
            this.clickNudge.update();
        } else {
            this.isActive = false
        }
        /*let max = 100
        let mapped = value - 20
        let brightness = (max - mapped) / 100
        this.body.alpha = brightness
        brightness = brightness - 0.25
        this.clickNudge.alpha = brightness
        console.log(brightness)*/
    }


    update(delta) {

        this.count++
        if(!this.isActive) {
            this.auraContainer.scale.set(0.4 + Math.sin((this.count/10)) * 0.15, 0.4 + Math.sin((this.count/10)) * 0.15);
            this.aura.alpha = 0.7 + Math.sin((this.count/10)) * 0.1;
        } else {

        }
        

    }
}

export default InfoPanelGraphics