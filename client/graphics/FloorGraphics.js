import * as PIXI from 'pixi.js'
import {GlowFilter} from '@pixi/filter-glow';


class FloorGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color

        this.container = new PIXI.Container();

        let abyss = new PIXI.Graphics()
        let abyssColor = PIXI.utils.string2hex(this.color);
        abyss.beginFill(abyssColor)
        abyss.drawRect(state.x, state.y, state.width, state.height)
        abyss.endFill()

        const gridGap = 100
        
        
        const gridBackground = new PIXI.Container();
        const gridNumberOfLinesHorizontal = state.width / gridGap

        for (var i = 0; i < gridNumberOfLinesHorizontal; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(1, 0x000000, 0.5)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, state.height)
            gridBackground.addChild(line)
        }

        const numberOfLinesVertical = state.height / gridGap
            
        for (var i = 0; i < numberOfLinesVertical; i++) { 
            let line = new PIXI.Graphics()
            line.lineStyle(1, 0x000000, 0.5)
            line.moveTo(0, i * gridGap)
            line.lineTo(state.width, i * gridGap)
            gridBackground.addChild(line)
        }
        


        
        this.container.addChild(abyss)
        this.container.addChild(gridBackground)
        
        this.addChild(this.container)


    }
    update(delta) {

    }
}

export default FloorGraphics
