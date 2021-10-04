import FlowerGraphics from '../graphics/FlowerGraphics.js'

export default ({ flowers }, renderer) => {
    return {
        create({ data }) {

            const graphics = new FlowerGraphics(data)
            renderer.entities.set(data.nid, graphics)
            renderer.backbackground.addChild(graphics)

            return graphics
        }
    }
}


