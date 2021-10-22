import ArtGraphics from '../graphics/ArtGraphics.js'

export default ({ artworks }, renderer) => {
    return {
        create({ data, entity }) {

            artworks.set(data.nid, entity)

            const graphics = new ArtGraphics(data)

            renderer.entities.set(data.nid, graphics)

            if(data.name == "<bold>DARK MATTERS</bold>\nJohann Diedrick") {
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
            sticker({ graphics, value }) {
                graphics.addSticker(value)
            }
        }
    }
}


