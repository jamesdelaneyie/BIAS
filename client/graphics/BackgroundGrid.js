import * as PIXI from 'pixi.js'

class BackgroundGrid extends PIXI.Container {
    constructor() {
        super()

        let height = 1000;
        let width = 1000;
        let floorColor = PIXI.utils.string2hex('#4DFA66')
        let gridColor = PIXI.utils.string2hex('#000000')
        
        let gridGap = 50
        //let halfGrid = gridGap/2
        let gap = 1

        let abyss = new PIXI.Graphics()
        let abyssColor = PIXI.utils.string2hex('#414141');
        abyss.beginFill(abyssColor)
        abyss.drawRect(-1000, -1000, 3000, 3000)
        abyss.endFill()
        this.addChild(abyss)

        let floor = new PIXI.Graphics()
        floor.beginFill(floorColor)
        floor.drawRect(0, 0, 1000, 1000)
        floor.endFill()
        this.addChild(floor)


        //Horizontal Lines
        for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x222222)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, width)
            line.alpha = 0.1
            this.addChild(line)
        }

        //Vertical Lines
        for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x222222)
            line.moveTo(0, i * gridGap)
            line.lineTo(height, i * gridGap)
            line.alpha = 0.1
            this.addChild(line)
        }

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
}

export default BackgroundGrid
