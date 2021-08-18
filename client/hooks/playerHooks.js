import * as PIXI from 'pixi.js'
import PlayerGraphics from '../graphics/PlayerGraphics.js'
import PlayerInfoGraphics from '../graphics/PlayerInfoGraphics.js'

export default (state, renderer ) => {
    return {
        create({ data, entity }) {
            
            const graphics = new PlayerGraphics(data)
            //const info = new PlayerInfoGraphics(data)

            //const wrapper = new PIXI.Container()
            
            //wrapper.addChild(graphics);
            //wrapper.addChild(info);

            renderer.middleground.addChild(graphics)

            ///enderer.entities.set(info.nid, info)
            renderer.entities.set(graphics.nid, graphics)
            
            /* self, raw */
            if (data.nid === state.myRawId) {
                state.myRawEntity = entity
                //graphics.body.tint = 0xffffff // debug: turn self white
            }

            /* self, smooth */
            if (data.nid === state.mySmoothId) {
                state.mySmoothEntity = entity
                graphics.hide() // hide our second entity
            }

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        },
        watch: {
            hitpoints({ graphics, value }) {
                graphics.hitpointBar.setHitpointPercentage(value / 100)
            }
        }
    }
}
