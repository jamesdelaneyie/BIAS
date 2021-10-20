import ObstacleGraphics from '../graphics/ObstacleGraphics.js'

export default ({ obstacles }, renderer) => {
    return {
        create({ data, entity }) {

            obstacles.set(data.nid, entity)

            const graphics = new ObstacleGraphics(data)

            renderer.entities.set(data.nid, graphics)

            if(data.name == "stairsUp") {
                renderer.foreforeground.addChild(graphics)
            } else {
                renderer.middleground.addChild(graphics)
            }
            

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        },
        watch: {
            sticker({ graphics, value }) {
                graphics.addSticker(value)
            }
        }
    }
}
