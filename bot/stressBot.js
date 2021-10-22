import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import MoveCommand from '../common/command/MoveCommand.js'
import applyCommand from '../common/applyCommand.js'
import FireCommand from '../common/command/FireCommand.js'
import ToggleCommand from '../common/command/ToggleCommand.js'

const protocolMap = new nengi.ProtocolMap(nengiConfig, nengi.metaConfig)

const address = 'ws://localhost:8079'
const numberOfBots = 20//Math.floor(Math.random() * 40)
const bots = new Map()

function connectNewBot(id) {
    let bot = new nengi.Bot(nengiConfig, protocolMap)
    bot.id = id
    

    bot.controls = {
        w: false,
        a: false,
        s: false,
        d: false,
        rotation: 0,
        delta: 1/20
    }

    bot.smoothEntity = {}
    bot.smoothEntity.headphones = false
    bot.notMoving = false

   

    bot.onConnect(response => {
        console.log('Bot attempted connection, response:', response)
        bot.tick = 0
    })

   

    bot.onClose(() => {
        bots.delete(bot.id)
    })

    bots.set(bot.id, bot)
    bot.connect(address, {bot:true})
}

for (let i = 0; i < numberOfBots; i++) {
    connectNewBot(i)
}

function randomBool() {
    return Math.random() > 0.5
}

const loop = function() {
    bots.forEach(bot => {
        if (bot.websocket) {
            bot.readNetwork()
            
            //console.log(bot)
            // small percent chance of changing which keys are being held down
            // this causes the bots to travel in straight lines, for the most part
            
                if (Math.random() > 0.95) {
                    bot.controls = {
                        w: randomBool(),
                        a: randomBool(),
                        s: randomBool(),
                        d: randomBool(),
                        rotation: Math.random() * Math.PI * 2,
                        delta: 1 / 60
                    }
                }
            
            
            
                var input = new MoveCommand(
                    bot.controls.w,
                    bot.controls.a,
                    bot.controls.s,
                    bot.controls.d,
                    bot.controls.rotation,
                    bot.controls.delta
                )
            

            if (Math.random() > 0.9995) {
                
                 bot.addCommand(new ToggleCommand(true, 'headphones'))
                 bot.notMoving = true
            } 
            if (Math.random() > 0.999) {
                
                bot.addCommand(new ToggleCommand(false, 'headphones'))
                bot.notMoving = false
            } 

            if (Math.random() > 0.99) {
                if(bot.headphones == false) {
                    bot.addCommand(new FireCommand(0, 0, "#00ff00"))
                }
                 
            }
            
    
            if(bot.notMoving == false) {
                bot.addCommand(input)
                applyCommand(bot, input, null, null, null)
            }
            

            bot.update()
            bot.tick++
        }
    })
}

setInterval(loop, 16)
