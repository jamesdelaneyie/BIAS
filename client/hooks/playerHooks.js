import PlayerGraphics from '../graphics/PlayerGraphics.js'
import { sound } from '@pixi/sound';

export default (state, renderer ) => {
    return {
        create({ data, entity }) {
            
            const graphics = new PlayerGraphics(data)
            
            renderer.middleground.addChild(graphics)
            renderer.entities.set(graphics.nid, graphics)

            
            
            /* self, raw */
            if (data.nid === state.myRawId) {
                state.myRawEntity = entity
                if(data.self == false) {
                    sound.add('login', 'audio/car.mp3');
                    sound.play('login') 
                }
            }

            /* self, smooth */
            if (data.nid === state.mySmoothId) {
                state.mySmoothEntity = entity
                graphics.hide()
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
