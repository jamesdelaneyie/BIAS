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
        this.gridGap = state.gridGap

        let abyss = new PIXI.Graphics()
        let abyssColor = PIXI.utils.string2hex(this.floorColor);
        abyss.beginFill(abyssColor, 0.9)
        abyss.drawRect(0, 0, state.width, state.height)
        abyss.endFill()
        this.addChild(abyss)
        
        let gridColor = PIXI.utils.string2hex(this.gridColor);
       
        const gridBackground = new PIXI.Container();
        const gridNumberOfLinesHorizontal = state.width / this.gridGap

        for (var i = 0; i < gridNumberOfLinesHorizontal; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(1, gridColor, 0.2)
            line.moveTo(i * this.gridGap, 0)
            line.lineTo(i * this.gridGap, state.height)
            gridBackground.addChild(line)
        }

        const numberOfLinesVertical = state.height / this.gridGap
            
        for (var i = 0; i < numberOfLinesVertical; i++) { 
            let line = new PIXI.Graphics()
            line.lineStyle(1, gridColor, 0.2)
            line.moveTo(0, i * this.gridGap)
            line.lineTo(state.width, i * this.gridGap)
            gridBackground.addChild(line)
        }

    
        let dropShadowFilter = new DropShadowFilter()
        dropShadowFilter.color = 0xFFFFFF
        dropShadowFilter.alpha = 1
        dropShadowFilter.blur = 3
        dropShadowFilter.quality = 10
        dropShadowFilter.distance = 0
        //gridBackground.filters = [dropShadowFilter]

        this.addChild(gridBackground)


    }
    update(delta) {

    }
}

export default FloorGraphics
