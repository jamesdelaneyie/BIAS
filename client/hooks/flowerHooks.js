import FlowerGraphics from '../graphics/FlowerGraphics.js'

export default ({ flowers }, renderer) => {
    return {
        create({ data }) {

            const graphics = new FlowerGraphics(data)
            renderer.entities.set(data.nid, graphics)

            

            if(data.y > 1500 && data.x > 2560) {
                renderer.background.addChild(graphics)
            } else if (data.y < 1500 && data.x < 2560) {
                renderer.background.addChildAt(graphics, 0)
            } else {
                renderer.background.addChildAt(graphics, 0)
            }

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.backbackground.removeChild(graphics)
            renderer.middleground.removeChild(graphics)
        }
    }
}


