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
            text.y = message.y - (50 + text.height)
            

            text.alpha = 0;
            text.isMessage = true;


            textBox = new Graphics()
            textBox.beginFill(0xFFFFFF, 1.0, true)
            textBox.lineStyle(1,0x00000)
            textBox.drawRoundedRect(message.x - 70, message.y - (68 + text.height), (text.width)+40, (text.height)+25, 20)
            textBox.cacheAsBitmap = true;
            
            textBox.endFill()
            textBox.alpha = 0
            
            layer.addChild(textBox);
            layer.addChild(text)



        var id = setInterval(frame, 10);
        function frame() {
            if (text.alpha > 1) {
                clearInterval(id);
            } else {
                text.y = text.y - 0.5
                textBox.alpha = textBox.alpha + 0.1
                text.alpha = text.alpha + 0.1
            }
        }
    
    
        setTimeout(() => {
            var id = setInterval(frame, 10);
            function frame() {
                if (text.alpha < 0) {
                    clearInterval(id);
                } else {
                    text.alpha = text.alpha - 0.1;
                    textBox.alpha = textBox.alpha - 0.1
                }
                //console.log(text.alpha)
            }
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
                
            }, 600)
        }, 2500)


}

export default addMessage
