import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { ease } from 'pixi-ease'
import {GlowFilter} from '@pixi/filter-glow'

class ObstacleGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.name = state.name
        this.width = state.width
        this.height = state.height
        this.color = state.color
        this.rotation = state.angle

        //console.log(this.rotation)
        this.wrapper = new PIXI.Container()

        if(this.name == "johannBlocker" || this.name == "johannBlockerOuter") {
            this.body = new Graphics()
            this.body.lineStyle(5, PIXI.utils.string2hex(state.color))
            this.body.drawCircle(0, 0, state.width*2)
            this.wrapper.addChild(this.body)
            let glow = new GlowFilter({distance: 40, outerStrength: 10, color: PIXI.utils.string2hex(state.color)})
            this.body.filters = [glow]
            this.addChild(this.wrapper)

        } else if(this.name == "stairsUp" || this.name == "stairsDown") { 

            this.body = new PIXI.Sprite.from('images/stairs.svg');
            this.body.width = state.width
            this.body.height = state.height
            //this.body.width = 
            //this.smileyStamp.height = size*10;
            this.addChild(this.body)
        }else {
            this.body = new Graphics()
            this.body.lineStyle(0)
            this.body.beginFill(PIXI.utils.string2hex(state.color), 1.0, true)
            this.body.drawRect(0, 0, state.width, state.height)
            this.body.endFill()
            this.wrapper.addChild(this.body)
            this.addChild(this.wrapper)
        }
        

        this.count = 0.01
        
    }

    addSticker(value){
        if(value > 1) {
            let choice = Math.floor(Math.random() * (4 - 1) + 1)
            if(choice == 1) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-calm.svg');
            } else if (choice == 2) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker-sad.svg');
            } else if (choice == 3) {
                this.smileyStamp = new PIXI.Sprite.from('images/face-sticker.svg');
            }
            let size = Math.floor(Math.random() * (6 - 2) + 1)
            this.smileyStamp.width = size*10;
            this.smileyStamp.height = size*10;
            this.smileyStamp.x = Math.floor(Math.random() * (300) - 150)
            this.smileyStamp.y = Math.floor(Math.random() * (300)  - 150)
            let angle = Math.floor(Math.random() * (360 - 1) + 1)
            this.smileyStamp.scale.set(3)
            this.smileyStamp.angle = angle 
            this.smileyStamp.anchor.set(0.5, 0.5)
            this.smileyStamp.alpha = 0
            this.addChild(this.smileyStamp)
            ease.add(this.smileyStamp, {alpha: 1, scale: 0.5}, { duration: 150, ease: 'easeOutExpo' })

        }
    }

   

    update(delta) {

        
       
    }
}

export default ObstacleGraphics