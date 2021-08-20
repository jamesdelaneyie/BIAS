import * as PIXI from 'pixi.js'

class FloorGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color

        // /console.log(this.x)
        //this.x = this.x/2
        //this.y = this.y/2

        let abyss = new PIXI.Graphics()
        let abyssColor = PIXI.utils.string2hex(this.color);
        abyss.beginFill(abyssColor)
        abyss.drawRect(state.x, state.y, state.width, state.height)
        abyss.endFill()
        this.addChild(abyss)


        //let floorColor = PIXI.utils.string2hex('#4DFA66')
        //let gridColor = PIXI.utils.string2hex('#000000')
        //console.log(height)
        //let gridGap = 50
        //let halfGrid = gridGap/2
        //let gap = 1

        /*let floor = new PIXI.Graphics()
        floor.beginFill(floorColor)
        floor.drawRect(0, 0, 1000, 1000)
        floor.endFill()
        this.addChild(floor)*/


        //Horizontal Lines
        /*for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x222222)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, this.width)
            line.alpha = 0.1
            this.addChild(line)
        }

        //Vertical Lines
        for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x222222)
            line.moveTo(0, i * gridGap)
            line.lineTo(this.height, i * gridGap)
            line.alpha = 0.1
            this.addChild(line)
        }*/

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
