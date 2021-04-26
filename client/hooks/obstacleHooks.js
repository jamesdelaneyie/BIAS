import ObstacleGraphics from '../graphics/ObstacleGraphics.js'

export default ({ obstacles }, renderer) => {
    return {
        create({ data, entity }) {

            obstacles.set(data.nid, entity)

            const graphics = new ObstacleGraphics(data)

            /*var wallMaterial = new p2.Material();
            const obsA = new Obstacle({ x: 150, y: 150, width: 250, height: 150 })

            var shape = new p2.Box({
                width: 250, 
                height: 150,
            });
            var body = new p2.Body({
                mass:0,
                position: [150, 150],
                angle: -rotation
            });
            body.addShape(shape);
            world.addBody(body);
            
            shape.material = wallMaterial;*/
          

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
