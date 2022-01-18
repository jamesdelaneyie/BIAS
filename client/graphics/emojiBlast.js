import * as PIXI from 'pixi.js'
import { Ease, ease } from 'pixi-ease'
import { Sound } from '@pixi/sound';

const emojiBlast = (layer, message) => {

    const numberOfEmojis = 20
    var counter = 0;
    layer.children.some(function(child) {
        if(child.isEmoji == true) {
            counter++;
        }
    });

    if(counter < numberOfEmojis) {
    
        function getRand(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        const emoji = new PIXI.Text(message.text);

        emoji.x = message.x - 15
        emoji.y = message.y - 40
        emoji.style.fontSize = getRand(15, 40)
        emoji.alpha = 0
        emoji.isEmoji = true
        emoji.scale.y = 2

        layer.addChild(emoji)

        var endingPositionY = emoji.y - Math.floor(Math.random() * 150)
        var endingPositionX = emoji.x - Math.floor(Math.random() * 200) + 100

        const fadeInStyles = { y: endingPositionY, x: endingPositionX, alpha: 1, scale: 1}
        const fadeOutStyles = { y: endingPositionY - 5, x: endingPositionX, alpha: 0, scale: 0}
        const fadeInSettings = { duration: 1000, ease: 'easeOutExpo', wait: 0 }
        const fadeOutSettings = { duration: 500, ease: 'easeOutExpo', wait: 3000 }

        ease.add(emoji, fadeInStyles, fadeInSettings)
        ease.add(emoji, fadeOutStyles, fadeOutSettings)

        setTimeout(() => {
            emoji.destroy({
                children: true,
                texture: true,
                baseTexture: true
            })
            layer.removeChild(emoji)
        }, 3000)

    }


}

export default emojiBlast
