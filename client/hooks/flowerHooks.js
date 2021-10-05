import FlowerGraphics from '../graphics/FlowerGraphics.js'

export default ({ flowers }, renderer) => {
    return {
        create({ data }) {

            const graphics = new FlowerGraphics(data)
            renderer.entities.set(data.nid, graphics)

            if(data.y > 1300) {
                renderer.middleground.addChild(graphics)
            } else {
                renderer.backbackground.addChild(graphics)
            }

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.backbackground.removeChild(graphics)
        }
    }
}


