import InfoPanelGraphics from '../graphics/InfoPanelGraphics.js'

export default ({ infoPanels }, renderer) => {
    return {
        create({ data, entity }) {

            infoPanels.set(data.nid, entity)

            const graphics = new InfoPanelGraphics(data)

            renderer.entities.set(data.nid, graphics)
            
            if(data.name == "12") {
                renderer.foreforeground.addChild(graphics)
            } else {
                renderer.middleground.addChild(graphics)
            }

            return graphics
        },
        delete({ nid, graphics, entity }) {
            renderer.entities.delete(nid)
            renderer.middleground.removeChild(graphics)
        },
        watch: {
            light({ graphics, value }) {
                graphics.setBrightness(value)
            }
        }
    }
}


