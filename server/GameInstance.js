import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'
import PlayerCharacter from '../common/entity/PlayerCharacter.js'
import Identity from '../common/message/Identity.js'
import WeaponFired from '../common/message/WeaponFired.js'
import CollisionSystem from '../common/CollisionSystem.js'
import followPath from './followPath.js'
import damagePlayer from './damagePlayer.js'
import respawnPlayer from './respawnPlayer.js'
import instanceHookAPI from './instanceHookAPI.js'
import applyCommand from '../common/applyCommand.js'
import setupFloors from './setupFloors.js'
import setupObstacles from './setupObstacles.js'
import setupBoxes from './setupBoxes.js'
import setupPortals from './setupPortals.js'
import { fire } from '../common/weapon.js'
import Notification from '../common/message/Notification'
import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'
import censoring from 'chat-censoring'
import fs from 'fs'
import SAT from 'sat'


import cryptoRandomString from 'crypto-random-string'



class GameInstance {
    constructor() {
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)


       
        this.world = new p2.World({gravity: [0, 0]});
        this.room = {
            x: 0,
            y: 0,
            width: 400,
            height: 400,
            backgroundColor: "#00ff00",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "item",
                x: 100,
                y: 100,
                width: 25, 
                height: 25, 
                color: "#0000ff",
                mass: 0.1
            }],
            portals: [{
                x: 380,
                y: 175,
                width: 20,
                height: 100,
                exit: [2210, 50]
            }]
        }
        this.floors = setupFloors(this.instance, this.room)
        

        this.room2 = {
            x: 2000,
            y: 0,
            width: 400,
            height: 400,
            backgroundColor: "#0000ff",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [],
            portals: [{
                x: 150,
                y: 20,
                width: 100,
                height: 20, 
                exit: [320, 200]
            }, {
                x: 150,
                y: 410,
                width: 100,
                height: 20, 
                exit: [210, 1050]
            }]
        }
        this.floors2 = setupFloors(this.instance, this.room2)

        this.room3 = {
            x: 0,
            y: 1000,
            width: 400,
            height: 400,
            backgroundColor: "#FF0000",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "item",
                x: 200,
                y: 200,
                width: 25, 
                height: 25, 
                color: "#0000ff",
                mass: 0.1
            }],
            portals: [{
                x: 150,
                y: 20,
                width: 100,
                height: 20, 
                exit: [2210, 350],
            }]
        }
        this.floors3 = setupFloors(this.instance, this.room3)
        
        
        
        
        const boxes = new Map()
        this.boxes = setupBoxes(this.instance, this.world, this.room, boxes)
        this.boxesTwo = setupBoxes(this.instance, this.world, this.room2, boxes)
        this.boxesThree = setupBoxes(this.instance, this.world, this.room3, boxes)
        this.boxes = boxes

        const obstacles = new Map()
        this.obstacles = setupObstacles(this.instance, this.room, obstacles)
        this.obstacles2 = setupObstacles(this.instance, this.room2, obstacles)
        this.obstacles = obstacles

        const portals = new Map()
        this.portals = setupPortals(this.instance, this.room, portals)
        this.portalsTwo= setupPortals(this.instance, this.room2, portals)
        this.portalsThree= setupPortals(this.instance, this.room3, portals)
        this.portals = portals




        const { PeerServer } = require('peer');
        const peerServer = PeerServer({
            port: 9000,
            ssl: {
               //key: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/privkey.pem'),
               // cert: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/cert.pem')
            }
        });
        // PAUL GAALXY S8 NO KEYS


        


        this.people = []

        peerServer.on('connection', peer => {
            console.log('peer connected', peer.id);
        });
        
        peerServer.on('disconnect', peer => {
            console.log('peer disconnected', peer.id);
        });



        // (the rest is just attached to client objects when they connect)
        this.instance.on('command::LeaveCommand', ({ command, client }) => {

           /* console.log('help')

            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity

            rawEntity.x = this.room.width/2
            rawEntity.y = this.room.height/2
            this.world.addBody(rawEntity.body);
            this.instance.addEntity(rawEntity)
            client.channel.addEntity(rawEntity)

            smoothEntity.x = this.room.width/2
            smoothEntity.y = this.room.height/2
            smoothEntity.collidable = true
            this.instance.addEntity(smoothEntity)

            smoothEntity.name = command.name
            rawEntity.name = command.name

            smoothEntity.color = command.color
            rawEntity.color = command.color

            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid), client)*/


        })
        


        // (the rest is just attached to client objects when they connect)
        this.instance.on('command::JoinCommand', ({ command, client }) => {

            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity
            const peerID = client.peerID;


            let room2SpawnX = this.room2.x + (this.room2.width/2)
            let room2SpawnY = this.room2.y + (this.room2.height/2)

            rawEntity.x = room2SpawnX
            rawEntity.y = room2SpawnY


            this.world.addBody(rawEntity.body);
            this.instance.addEntity(rawEntity)
            client.channel.addEntity(rawEntity)

            smoothEntity.x = this.room2.width/2
            smoothEntity.y = this.room2.height/2
            smoothEntity.collidable = true
            this.instance.addEntity(smoothEntity)

            smoothEntity.name = command.name
            rawEntity.name = command.name

            smoothEntity.color = command.color
            rawEntity.color = command.color

            smoothEntity.isAlive = true;
            rawEntity.isAlive = true;
            
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+"", ""+ command.name +""), client)
            this.instance.messageAll(new Notification('Welcome '+ command.name +'', 'notification', 20, 20))
            

        })

        this.instance.on('connect', ({ client, callback }) => {
            
            const channel = this.instance.createChannel()
            channel.subscribe(client)
            client.channel = channel

            const rawEntity = new PlayerCharacter({ self: true })
            const smoothEntity = new PlayerCharacter({ self: false })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity
            
            client.positions = []
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 99999,
                halfHeight: 99999
            }

            //const instance = this.instance
            //console.log(this.instance)
            let server = this.instance.wsServer.httpServer._connectionKey;

            callback({ accepted: true, text: server})

        })




        this.instance.on('disconnect', client => {
            // clean up per client state
            if(client.rawEntity.nid) {
                client.channel.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
            }
            client.channel.destroy()
        })

        this.instance.on('command::SpeakCommand', ({ command, client, tick }) => {
            
            if(command.text == "<3") {
                this.instance.messageAll(new Notification('❤️', 'talk', command.x, command.y))
            } else {

                let polite = censoring.checkMessage(command.text, '*');
                let friendlyMessage = censoring.censorMessage(command.text, '*');

                this.instance.messageAll(new Notification(friendlyMessage, 'text', command.x, command.y))
                console.log(polite);

            }
        })

        this.instance.on('command::RespawnCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity
            respawnPlayer(rawEntity, smoothEntity);
        })

        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity
            applyCommand(rawEntity, command, this.obstacles, this.boxes)
            //console.log(rawEntity);
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

            if(client.rawEntity) {
                client.view.x = client.rawEntity.x
                client.view.y = client.rawEntity.y
                
                //console.log(client.rawEntity.body.position)
                client.rawEntity.body.position[0] = client.rawEntity.x
                client.rawEntity.body.position[1] = client.rawEntity.y
            }
            
            //console.log(client);
            // have the smooth entity follow the raw entity
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }

        })

        this.world.step(1/5);

        //update touching
        for (let obstacle of this.obstacles.values()) {
            for (const [key, value] of Object.entries(this.instance.clients.array)) {

                if(typeof value.smoothEntity != "undefined") {

                    let collided = SAT.testCirclePolygon(value.rawEntity.collider.circle, obstacle.collider.polygon) 
                    
                    if(this.instance.clients.array.length > 1) {
                        if(collided == true) {
                            obstacle.color = "#ffff00"
                            break
                        } else {
                            obstacle.color = "#FFffFF"
                        }
                    } else {
                        if(collided == true) {
                            obstacle.color = "#ffff00"
                        } else {
                            obstacle.color = "#FFffFF"
                        }
                    }
                    
                }
                
            }
        }

        
            //Portals
            this.instance.clients.forEach(client => {

                for (let portal of this.portals.values()) {

                    if(client.smoothEntity.isAlive) {

                        let collided = false

                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, portal.collider.polygon) 
                        
                        if(collided) {


                            let thisInstance = this.instance;
                            let thisClient = client.rawEntity
                            thisClient.isAlive = false;
                            
                            setTimeout(function(){
                                thisClient.x = portal.exit[0]
                                thisClient.y = portal.exit[1]
                                client.view.x = thisClient.x
                                client.view.y = thisClient.y
                                client.positions = []
                            }, 50)
                            

                            setTimeout(function(){
                                thisClient.isAlive = true
                                thisInstance.messageAll(new Notification('portal-noise', 'sound', 0, 0), client)
                            }, 100)

                            break
                        }
                        
                    }


                }


            })

            //Play Boxes
            for (let box of this.boxes.values()) {

                for (const [key, value] of Object.entries(this.instance.clients.array)) {

                    
                    //console.log(value)

                    if(value.rawEntity.isAlive && box.name == "item") {

                        let collided = false

                        collided = SAT.testCirclePolygon(value.rawEntity.collider.circle, box.collider.polygon) 
                        //console.log(collided)

                        if(this.instance.clients.array.length > 1) {
                            if(collided == true) {
                                this.instance.messageAll(new Notification(''+ value.rawEntity.name +' is touching " '+ box.name +' "', 'notification', 20, 20))
                                box.color = "#0000ff"
                                break
                            } else {
                                box.color = "#FFFFFF"
                            }
                        } else {
                            if(collided == true) {
                                this.instance.messageAll(new Notification(''+ value.rawEntity.name +' is touching " '+ box.name +' "', 'notification', 20, 20))
                                box.color = "#0000ff"
                                break
                            } else {
                                box.color = "#FFFFFF"
                            }
                        }

                    }


                }


            }




            //Play Boxes
            for (let box of this.boxes.values()) {

                for (let portal of this.portals.values()) {

                    let collided = false

                    collided = SAT.testPolygonPolygon(box.collider.polygon, portal.collider.polygon) 
                    
                    //console.log(collided)

                    if(collided) {
                        
                        box.body.position[0] = portal.exit[0]
                        box.body.position[1] = portal.exit[1]
                        
                        break
                    }


                }


            }
            
       
        

        this.boxes.forEach(box => {
            
            box.x = box.body.position[0]
            box.y = box.body.position[1]
            box.rotation = box.body.angle 
            
        })




        // when instance.updates, nengi sends out snapshots to every client
        this.instance.update()
    }
}

export default GameInstance
