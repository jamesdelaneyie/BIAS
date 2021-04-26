import * as PIXI from 'pixi.js'

class Room extends PIXI.Container {
    constructor(roomName, width = 1000, height = 1000, gridSize, dotSize) {
        super()

        this.roomName = roomName
        this.width = width
        this.height = height

        let gridGap = 50
        let halfGrid = gridGap/2
        let gap = 1

        //Horizontal Lines
        for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x666666)
            line.moveTo(i * gridGap, 0)
            line.lineTo(i * gridGap, width)
            this.addChild(line)
        }

        //Vertical Lines
        for (var i = 0; i < 21; i++) {           
            let line = new PIXI.Graphics()
            line.lineStyle(gap, 0x666666)
            line.moveTo(0, i * gridGap)
            line.lineTo(height, i * gridGap)
            this.addChild(line)
        }

        //Grid Dots
        for (var i = 1; i < 21; i++) { 
            for (var j = 1; j < 21; j++) {                 
                let line = new PIXI.Graphics();
                line.lineStyle(gap, 0x666666)
                line.moveTo((i * gridGap) - halfGrid, (j * gridGap) - halfGrid)
                line.lineTo(((i * gridGap) + gap) - halfGrid, ((j * gridGap)) - halfGrid)
                this.addChild(line)
            }
        }

    }
}

export default BackgroundGrid
