import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'
import axios from 'axios';
import PlayerCharacter from '../common/entity/PlayerCharacter.js'
import Identity from '../common/message/Identity.js'
import WeaponFired from '../common/message/WeaponFired.js'
import CollisionSystem from '../common/CollisionSystem.js'
import followPath from './followPath.js'
import damagePlayer from './damagePlayer.js'
import instanceHookAPI from './instanceHookAPI.js'
import applyCommand from '../common/applyCommand.js'
import setupObstacles from './setupObstacles.js'
import setupBoxes from './setupBoxes.js'
import { fire } from '../common/weapon.js'
import Notification from '../common/message/Notification'
import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'
import censoring from 'chat-censoring'
//import P2Pixi from 'p2Pixi'



class GameInstance {
    constructor() {
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)

    
        this.world = new p2.World({gravity: [0, 9]});
        
        this.room = {
            width: 800,
            height: 500,
            backgroundColor: "#00ff00",
            borderColor: "#FFFFFF",
            borderWidth: 20,
            objects: [
                {
                    name: "Box 1",
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100,
                    mass: 1,
                    color: "#0000FF"
                }
            ]
        }
        
        this.boxes = setupBoxes(this.instance, this.world, this.room)

        this.obstacles = setupObstacles(this.instance, this.room)

        this.world.on('postStep', function(event){
            // Add horizontal spring force
            //circleBody.force[0] -= 100 * circleBody.position[0];
        });


        // (the rest is just attached to client objects when they connect)
        this.instance.on('command::createCommand', ({ command, client, tick }) => {
            
            // create a entity for this client
            /*const playerColor = Math.floor(Math.random()*16777215).toString(16);
            //const playerName = "NEW BOY";
            const rawEntity = new PlayerCharacter({color: playerColor, self: true })
            rawEntity.x = 500
            rawEntity.y = 500
            this.world.addBody(rawEntity.body);*/

        })

        this.instance.on('connect', ({ client, callback }) => {
            //console.log(client);
            // create a entity for this client
            const playerColor = Math.floor(Math.random()*16777215).toString(16);

            /*axios({
                method: 'get',
                url: 'https://randomuser.me/api/'
            })
            .then(function (response) {
                  console.log(response.data.results[0]['name']['first']);
            });*/

            const playerName = "NEW BOY";
            const rawEntity = new PlayerCharacter({color: playerColor, name: playerName, self: true })
            rawEntity.x = 500
            rawEntity.y = 500
            this.world.addBody(rawEntity.body);

            

            // make the raw entity only visible to this client
            const channel = this.instance.createChannel()
            channel.subscribe(client)



            //this.instance.message(new Notification('yolo'), client)
            //channel.addMessage(new Notification('private channel created'))

            channel.addEntity(rawEntity)
            this.instance.addEntity(rawEntity)
            client.channel = channel

            // smooth entity is visible to everyone
            const smoothEntity = new PlayerCharacter({color: playerColor, name: playerName, self: false })
            smoothEntity.x = 500
            smoothEntity.y = 500
            smoothEntity.collidable = true
            this.instance.addEntity(smoothEntity)

            // tell the client which entities it controls
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid), client)
            

            // establish a relation between this entity and the client
            rawEntity.client = client
            client.rawEntity = rawEntity
            smoothEntity.client = client
            client.smoothEntity = smoothEntity
            client.positions = []

            // define the view (the area of the game visible to this client, all else is culled)
            client.view = {
                x: rawEntity.x,
                y: rawEntity.y,
                halfWidth: 1000,
                halfHeight: 1000
            }

            this.instance.messageAll(new Notification('welcome to:', 200, 200))

            // accept the connection
            callback({ accepted: true, text: 'Welcome!' })
        })

        this.instance.on('disconnect', client => {
            // clean up per client state
            client.channel.removeEntity(client.rawEntity)
            this.instance.removeEntity(client.rawEntity)
            this.instance.removeEntity(client.smoothEntity)
            client.channel.destroy()
        })

        this.instance.on('command::SpeakCommand', ({ command, client, tick }) => {
            
            if(command.text != "") {
                //console.log(command);
                //console.log(command)
                let polite = censoring.checkMessage(command.text, '*');
                let friendlyMessage = censoring.censorMessage(command.text, '*');
                this.instance.messageAll(new Notification(friendlyMessage, command.x, command.y))
                console.log(polite);

               /* this.instance.clients.forEach(client => {

                    
                    console.log(client);
                    //client.addMessage(new Notification(command.text))

                })*/
                //this.instance.message(new Notification(command.text), client)

                //channel.addMessage(new Notification(command.text))
                //client.channel.message(new Notification(command.text), client)
            }
        })

        

        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            // move this client's entity
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity
            applyCommand(rawEntity, command, this.obstacles, this.boxes)
            client.positions.push({
                x: rawEntity.x,
                y: rawEntity.y,
                delta: rawEntity.delta,
                rotation: rawEntity.rotation
            })
        })

        this.instance.on('command::FireCommand', ({ command, client, tick }) => {
            // shoot from the perspective of this client's entity
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity

            

            if (fire(rawEntity)) {
                let endX = command.x
                let endY = command.y

                this.obstacles.forEach(obstacle => {
                    const hitObstacle = CollisionSystem.checkLinePolygon(rawEntity.x, rawEntity.y, command.x, command.y, obstacle.collider.polygon)
                    if (hitObstacle) {
                        endX = hitObstacle.x
                        endY = hitObstacle.y
                    }
                })

                const timeAgo = client.latency + 100
                const hits = lagCompensatedHitscanCheck(this.instance, rawEntity.x, rawEntity.y, endX, endY, timeAgo)

                hits.forEach(victim => {
                    if (victim.nid !== rawEntity.nid && victim.nid !== smoothEntity.nid) {
                        damagePlayer(victim, 25)
                    }
                })

                this.instance.addLocalMessage(new WeaponFired(smoothEntity.nid, smoothEntity.x, smoothEntity.y, command.x, command.y))
            }
        })
    }

    update(delta, tick, now) {
        this.instance.emitCommands()

        this.instance.clients.forEach(client => {

            client.view.x = client.rawEntity.x
            client.view.y = client.rawEntity.y
            
            //console.log(client.rawEntity.body.position)
            client.rawEntity.body.position[0] = client.rawEntity.x
            client.rawEntity.body.position[1] = client.rawEntity.y


            //console.log(client);
            // have the smooth entity follow the raw entity
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }
        })

        this.world.step(1/5);

        this.boxes.forEach(box => {
            
            box.x = box.body.position[0]
            box.y = box.body.position[1]
            box.rotation = box.body.angle 

            //console.log(box.body.position[0], box.body.position[1]);
            //console.log(box.collider.polygon)
            //box.rotation = box.body.angle
            //box.collider.polygon.pos.x = box.body.position[0] - box.width/2
            //box.collider.polygon.pos.y = box.body.position[1] - box.height/2
            //box.collider.polygon.angle = box.body.angle
            //console.log(box.collider.polygon)
            //box.collider.polygon.
        })

        // when instance.updates, nengi sends out snapshots to every client
        this.instance.update()
    }
}

export default GameInstance
