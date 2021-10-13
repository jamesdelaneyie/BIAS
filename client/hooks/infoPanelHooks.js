import InfoPanelGraphics from '../graphics/InfoPanelGraphics.js'

export default ({ infoPanels }, renderer) => {
    return {
        create({ data, entity }) {

            infoPanels.set(data.nid, entity)

            console.log('chcker')

            const graphics = new InfoPanelGraphics(data)

            renderer.entities.set(data.nid, graphics)
            renderer.middleground.addChild(graphics)

            return graphics
        },
        delete({ nid, graphics, entity }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        }
    }
}


