import * as PIXI from 'pixi.js'
import {DropShadowFilter} from '@pixi/filter-drop-shadow';


class FloorGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.floorColor = state.floorColor        
        this.gridColor = state.gridColor
        this.gridGlow = state.wallColor
      

        let abyss = new PIXI.Graphics()
        let abyssColor = PIXI.utils.string2hex(this.floorColor);
        abyss.beginFill(abyssColor)
        abyss.drawRect(0, 0, state.width, state.height)
        abyss.endFill()
        this.addChild(abyss)

        const gridGap = 100
        
        let gridColor = PIXI.utils.string2hex(this.gridColor);
       
        const gridBackground = new PIXI.Container();
        const gridNumberOfLinesHorizontal = state.width / gridGap

        for (var i = 0; i < gridNumberOfLinesHorizontal; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(1, gridColor, 0.2)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, state.height)
            gridBackground.addChild(line)
        }

        const numberOfLinesVertical = state.height / gridGap
            
        for (var i = 0; i < numberOfLinesVertical; i++) { 
            let line = new PIXI.Graphics()
            line.lineStyle(1, gridColor, 0.2)
            line.moveTo(0, i * gridGap)
            line.lineTo(state.width, i * gridGap)
            gridBackground.addChild(line)
        }

    
        let dropShadowFilter = new DropShadowFilter()
        dropShadowFilter.color = 0x00FF00
        dropShadowFilter.alpha = 1
        dropShadowFilter.blur = 5
        dropShadowFilter.quality = 5
        dropShadowFilter.distance = 0
        gridBackground.filters = [dropShadowFilter]

        this.addChild(gridBackground)


    }
    update(delta) {

    }
}

export default FloorGraphics
