import BoxGraphics from '../graphics/BoxGraphics.js'

export default ({ boxes }, renderer) => {
    return {
        create({ data, entity }) {

            boxes.set(data.nid, entity)

            const graphics = new BoxGraphics(data)

            renderer.entities.set(data.nid, graphics)
            renderer.middleground.addChild(graphics)

            return graphics
        },
        delete({ nid, graphics, entity }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        },
        watch: {
            color({ graphics, value }) {
                graphics.updateColor(value)
            }
        }
    }
}


