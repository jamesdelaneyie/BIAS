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

        this.container.addChild(abyss)
        this.addChild(this.container)
/*
        let gridGap = 45
        let gap = 2

        const floorGrid = new PIXI.Container();

        
        for (var i = 0; i < 9; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0xFFFFFF)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, this.width)
            line.alpha = 1
            floorGrid.addChild(line)
        }

        //Vertical Lines
        for (var i = 0; i < 9; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0xFFFFFF)
            line.moveTo(0, i * gridGap)
            line.lineTo(this.height, i * gridGap)
            line.alpha = 1
            floorGrid.addChild(line)
        }

        this.addChild(floorGrid)

        //Grid Dots
        /*for (var i = 1; i < 21; i++) { 
            for (var j = 1; j < 21; j++) {                 
                //let line = new PIXI.Graphics();

                let tile = new PIXI.Graphics()
                tile.beginFill(0x000000)
                tile.drawRect(i * gridGap - 37, j * gridGap - 38, 25, 25)
                tile.alpha = 0.05
                tile.endFill()
                this.addChild(tile)

            }
        }*/

    }
    update(delta) {

    }
}

export default FloorGraphics
