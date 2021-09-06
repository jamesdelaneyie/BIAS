import * as PIXI from 'pixi.js'


class ObstacleGraphics extends PIXI.Container {
    constructor(state) {
        super()

        this.nid = state.nid
        this.x = state.x
        this.y = state.y
        this.width = state.width
        this.height = state.height
        this.color = state.color
        this.angle = state.angle

        

        this.color = PIXI.utils.string2hex(this.color);
        this.wrapper = new PIXI.Container()
        
        if(state.name == "circleBuilding") {
            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.drawCircle(0, 0, state.width)
            this.body.endFill()


        } else if (state.name == "crystal") {
            
            this.body = new PIXI.Graphics()

            this.body.beginFill(0xf1c40f); 
            this.body.lineStyle(1, 0x000000)
            this.body.drawPolygon([ 0, 0, 
                                    -100, -100, 
                                    -100, -400,
                                    0, -500,
                                    100, -400,
                                    100, -100,
                                    ]);

            this.body.endFill();

            this.body.pivot.x = 0;
            this.body.pivot.y = 0;  

          


        } else {
            this.body = new PIXI.Graphics()
            this.body.beginFill(this.color)
            this.body.drawRect(0, 0, state.width, state.height)
            this.body.endFill()
        }


        if(state.name == "reception") {

            const logo = new PIXI.Sprite.from('images/sg-white.svg');
            logo.width = 231
            logo.height = 117
            logo.x = 200
            logo.y = 100
            logo.anchor.set(0.5)
            this.body.addChild(logo)
        }

        this.wrapper.addChild(this.body)

        //this.body.pivot.x = 0;
        //this.body.pivot.y = 0;       
        //this.wrapper.rotation = 1.57


        this.addChild(this.wrapper)
    
        
    }

    updateColor(color) {
        //let updateColor = PIXI.utils.string2hex(color);
        //this.body.beginFill(updateColor)
        //this.body.drawRect(-this.border, -this.border, this.width, this.height)
        //this.body.endFill()
    }

    update(delta) {
        //console.log(this.color)
    }
}

export default ObstacleGraphics