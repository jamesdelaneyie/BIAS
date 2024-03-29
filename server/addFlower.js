import Flower from '../common/entity/Flower.js'

export default (instance, flowerCommand, flowers) => {

    let flower = new Flower({ 
        x: flowerCommand.x, 
        y: flowerCommand.y, 
        color: flowerCommand.color
    })
    instance.addEntity(flower)
    flowers.set(flower.nid, flower)

    return flowers

}