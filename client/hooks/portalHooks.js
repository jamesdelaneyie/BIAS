import PortalGraphics from '../graphics/PortalGraphics.js'

export default ({ portals }, renderer) => {
    return {
        create({ data, entity }) {

            //portals.set(data.nid, entity)

            const graphicsBottom = new PortalGraphics(data, "bottom")
            const graphicsTop = new PortalGraphics(data, "top")

            renderer.entities.set(data.nid, graphicsBottom)
            renderer.entities.set(data.nid, graphicsTop)

            renderer.middleground.addChild(graphicsBottom)
            renderer.foreground.addChild(graphicsTop)

            return graphicsBottom
        },
        delete({ nid, graphicsBottom, graphicsTop }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphicsBottom)
        }
    }
}
