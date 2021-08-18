import * as PIXI from 'pixi.js'

const addMessage = (layer, message) => {

    //console.log(layer)
    var visible = false;
    layer.children.some(function(child) {
        if(child.isMessage == true) {
            visible = true;
            return
        }
    });

    if(!visible) {

       /* const textBox = new PIXI.Graphics();
        
        textBoxShape.beginFill("0XFFFFFF");
        */
        //const textBox = new PIXI.Graphics();
        //const textBoxShape = new PIXI.RoundedRectangle(message.x - 200, message.y - 200, 200, 800, 20)
        //textBox.addChild(textBoxShape);
        //layer.addChild(textBox)



        


        const style = new PIXI.TextStyle({
            fontFamily: 'Roboto Mono',
            fill: "black",
            fontSize: 18,
            fontWeight: 300,
            lineJoin: "round",
            whiteSpace: "normal",
            wordWrap: true,
            wordWrapWidth: 250,
            leading: 1
        });
        
        const text = new PIXI.Text(message.text, style);
        text.x = message.x - 50 //(Math.floor(Math.random() * 80) + 20))
        text.y = message.y - (50 + text.height)// (text.height)//(Math.floor(Math.random() * 80) + 20))
        text.alpha = 0;
        text.isMessage = true;


        const textBox = new PIXI.Graphics()
        textBox.beginFill(0xFFFFFF)
        textBox.drawRoundedRect(message.x - 70, message.y - (68 + text.height), text.width+45, text.height+25, 20)
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
                console.log(text.alpha)
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
