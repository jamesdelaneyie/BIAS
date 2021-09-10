import * as PIXI from 'pixi.js'
import {GlowFilter} from '@pixi/filter-glow';
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




        const fontStyle = {
            fontFamily: 'Trade Gothic Next',
            fill: 0x000000, 
            fontSize: 139,
            fontWeight: 900
        }

        if(state.floorColor  == '#FFE401') {

            const firstName = "NOAH"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 298
            firstNameText.y = 63
            this.addChild(firstNameText)

            const lastName = "LEVENSON"
            const lastNameText = new PIXI.Text(lastName, fontStyle);
            lastNameText.x = 125
            lastNameText.y = 763
            this.addChild(lastNameText)

        } else if (state.floorColor == "#471A8E") {

            const firstName = "JOHANN DIEDRICK"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 298
            firstNameText.y = 63
            this.addChild(firstNameText)

        } else if (state.floorColor == "#505050") {

            const firstName = "MUSHON"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 98
            firstNameText.y = 563
            this.addChild(firstNameText)

            const lastName = "ZER-AVIV"
            const lastNameText = new PIXI.Text(lastName, fontStyle);
            lastNameText.x = 95
            lastNameText.y = 763
            this.addChild(lastNameText)

        } else if (state.floorColor == "#80EDFF") {


            const firstName = "LIBBY HEANEY"
            const firstNameText = new PIXI.Text(firstName, fontStyle);
            firstNameText.x = 98
            firstNameText.y = 563
            this.addChild(firstNameText)


        }
        


    }
    update(delta) {

    }
}

export default FloorGraphics
