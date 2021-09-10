import Portal from '../common/entity/Portal.js'

// setup a few obstacles
export default (instance, room, portals) => {

    const roomX = room.x
    const roomY = room.y
    const roomBorder = room.borderWidth

    const portalList = room.portals
    if(portals) {
        portalList.forEach(portal => {
            let portalProps = new Portal({
                name: portal.name,
                x: portal.x + roomX + roomBorder,
                y: portal.y + roomY,
                width: portal.width,
                height: portal.height,
                exit: [portal.exit[0], portal.exit[1]],
                isActive: true
            })
            instance.addEntity(portalProps)
            portals.set(portalProps.nid, portalProps)
        });
    }

    return portals
}