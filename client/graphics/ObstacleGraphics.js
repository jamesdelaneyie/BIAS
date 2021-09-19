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
            this.body.lineStyle(1, 0x000000)
            this.body.beginFill(this.color)
            this.body.drawRect(0, 0, state.width, state.height)

            if(state.name == "easternEyeBuilding") {
                const texture = PIXI.Texture.from('images/clouds-pattern.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                this.body.addChild(tilingSprite)

            } else if (state.name == "northernFlowerBuildingTwo") {
                const texture = PIXI.Texture.from('images/memphis-2.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                //tilingSprite.tileScale = new PIXI.Point(0.5, 0.5)
                this.body.addChild(tilingSprite)

            } else if (state.name == "northernFlowerBuilding") {
                const texture = PIXI.Texture.from('images/flower-pattern.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                tilingSprite.tilePosition = new PIXI.Point(-50, -55)
                this.body.addChild(tilingSprite)

            } else if (state.name == "easternEyeBuildingTwo") {
                const texture = PIXI.Texture.from('images/pink-sprinkles.svg');
                const tilingSprite = new PIXI.TilingSprite(texture, state.width, state.height);
                tilingSprite.tilePosition = new PIXI.Point(-50, -55)
                this.body.addChild(tilingSprite)

            }
            

            
            //this.middleground.addChild(tilingSprite);

            this.body.endFill()
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