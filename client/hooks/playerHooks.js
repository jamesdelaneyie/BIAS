import PlayerGraphics from '../graphics/PlayerGraphics.js'

export default (state, renderer ) => {
    return {
        create({ data, entity }) {
            
            const graphics = new PlayerGraphics(data)
            
            renderer.middleground.addChild(graphics)
            renderer.entities.set(graphics.nid, graphics)

            /* self, raw */
            if (data.nid === state.myRawId) {
                state.myRawEntity = entity
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
            },
            name({ graphics, value }) {
                graphics.setName(value)
            },
            avatar({ graphics, value }) {
                graphics.setAvatar(value)
            },
            color({ graphics, value }) {
                graphics.setColor(value)
            },
            headphones({ graphics, value }) {
                graphics.putOnHeadphones(value)
            },
            typing({ graphics, value }) {
                graphics.isTyping(value)
            },
            bodyRotation({ graphics, value }) {
                graphics.setRotation(value)
            },
            sticker({ graphics, value }) {
                graphics.addSticker(value)
            }
        }
    }
}
