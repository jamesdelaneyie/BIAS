import * as PIXI from 'pixi.js'
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { ease } from 'pixi-ease'

const addMessage = (layer, message) => {

            const style = new PIXI.TextStyle({
                fontFamily: 'Trade Gothic Next',
                fill: "black",
                fontSize: 18,
                fontWeight: 400,
                lineJoin: "round",
                whiteSpace: "normal",
                wordWrap: true,
                wordWrapWidth: 250,
                leading: 1
            });

            let text = ""
            let textBox = ""

            text = new PIXI.Text(message.text, style);
            text.x = message.x - 50 
            text.y = message.y - (50 + text.height) + 25
            let starterY = text.y + 20

            text.alpha = 0;
            text.isMessage = true;


            textBox = new Graphics()
            textBox.beginFill(0xFFFFFF, 1.0, true)
            textBox.lineStyle(1,0x00000)
            textBox.drawRoundedRect(message.x - 70, message.y - (68 + text.height), (text.width)+40, (text.height)+25, 20)
            textBox.cacheAsBitmap = true;
            textBox.y = 10
            
            textBox.endFill()
            textBox.alpha = 0
            
            layer.addChild(textBox);
            layer.addChild(text)


            ease.add(text, {alpha: 1, y: text.y - 30}, { duration: 250, ease: 'easeOutExpo'})
            ease.add(textBox, {alpha: 1, y: 0}, { duration: 250, ease: 'easeOutExpo'})

            setTimeout(() => {
                ease.add(text, {alpha: 0, y: text.y + 10}, { duration: 250, ease: 'easeOutExpo'})
                ease.add(textBox, {alpha: 0, y: 10}, { duration: 250, ease: 'easeOutExpo'})
            }, 2000)
            setTimeout(() => {
                layer.removeChild(text)
                layer.removeChild(textBox)
                text.destroy({
                    children: true,
                    texture: true,
                    baseTexture: true
                })
                textBox.destroy({
                    children: true,
                    texture: true,
                    baseTexture: true
                })
            }, 2250)


}

export default addMessage
