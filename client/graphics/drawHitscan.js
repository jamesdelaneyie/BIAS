import { Graphics } from 'pixi.js'

const drawHitscan = (layer, x, y, targetX, targetY, color) => {
    const graphics = new Graphics()
    graphics.lineStyle(1, color)
    graphics.moveTo(x, y)
    graphics.lineTo(targetX, targetY)
    graphics.lineStyle(2, color)
    graphics.drawCircle(targetX,targetY,25);
    graphics.endFill()
    graphics.alpha = 0.2
    layer.addChild(graphics)

    setTimeout(() => {
        layer.removeChild(graphics)
        graphics.destroy({
            children: true,
            texture: true,
            baseTexture: true
        })
    }, 120)
}

export default drawHitscan
