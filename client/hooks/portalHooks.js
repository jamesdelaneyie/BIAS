import PortalGraphics from '../graphics/PortalGraphics.js'

export default ({ portals }, renderer) => {
    return {
        create({ data, entity }) {

            //portals.set(data.nid, entity)

            const graphics = new PortalGraphics(data)

            renderer.entities.set(data.nid, graphics)
            renderer.middleground.addChild(graphics)

            return graphics
        },
        delete({ nid, graphics }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        }
    }
}
