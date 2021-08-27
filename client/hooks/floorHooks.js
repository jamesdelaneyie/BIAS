import FloorGraphics from '../graphics/FloorGraphics.js'

export default ({ floors }, renderer) => {
    return {
        create({ data }) {

            const graphics = new FloorGraphics(data)
            renderer.entities.set(data.nid, graphics)
            graphics.alpha = 0.5
            renderer.background.addChild(graphics)

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.background.removeChild(graphics)
        }
    }
}


