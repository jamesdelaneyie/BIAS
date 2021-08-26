import * as PIXI from 'pixi.js'

const addMessage = (layer, message) => {

    var visible = false;
    layer.children.some(function(child) {
        if(child.isMessage == true) {
            visible = true;
            return
        }
    });

    if(!visible) {

        const style = new PIXI.TextStyle({
            fontFamily: 'Trade Gothic',
            fill: "black",
            fontSize: 18,
            fontWeight: 300,
            lineJoin: "round",
            whiteSpace: "normal",
            wordWrap: true,
            wordWrapWidth: 250,
            leading: 1
        });

        let text = ""
        let textBox = ""

        message.text = message.text.toUpperCase()

        
        if(message.type == 'talk') {
            text = new PIXI.Text("❤️", style);
            text.x = message.x - Math.floor(Math.random() * 120) + 40
            text.y = message.y - Math.floor(Math.random() * 120) + 20
            text.alpha = 1;
            text.isMessage = false;
            layer.addChild(text)
        } else {

            text = new PIXI.Text(message.text, style);
            if(message.type == 'notification') {
                text.x = 30
                text.y = 28
            } else {
                text.x = message.x - 50 
                text.y = message.y - (50 + text.height)
            }
            

            text.alpha = 0;
            text.isMessage = true;


            textBox = new PIXI.Graphics()
            textBox.beginFill(0xFFFFFF)
            if(message.type == 'notification') {
                textBox.drawRoundedRect(10, 10, text.width+40, text.height+25, 20)
            } else {
                textBox.drawRoundedRect(message.x - 70, message.y - (68 + text.height), text.width+40, text.height+25, 20)

            }
            
            textBox.endFill()
            textBox.alpha = 0
            
            layer.addChild(textBox);
            layer.addChild(text)

        }


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


        //console.log(delta)
    
    
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
        }, 2000)

        

    }
}

export default addMessage
