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
import { fire } from '../common/weapon.js'
import Notification from '../common/message/Notification'
import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'
import censoring from 'chat-censoring'
import fs from 'fs'




//import P2Pixi from 'p2Pixi'



class GameInstance {
    constructor() {
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)

        const boxes = new Map()

        this.world = new p2.World({gravity: [0, 9]});
        this.room = {
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            backgroundColor: "#ff0000",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: 'Box',
                x: 25,
                y: 25,
                width: 100,
                height: 100,
                mass: 0,
                color: '00ff00'
            }]
        }
        this.floors = setupFloors(this.instance, this.room)
        this.obstacles = setupObstacles(this.instance, this.room)
        this.boxes = setupBoxes(this.instance, this.world, this.room, boxes)
        
        /*
        this.room2 = {
            x: 900,
            y: 150,
            width: 600,
            height: 600,
            backgroundColor: "#00ff00",
            borderColor: "#FFFFFF",
            borderWidth: 40
        }
        this.floors = setupFloors(this.instance, this.room2)
        this.obstacles2 = setupObstacles(this.instance, this.room2)
        this.boxesTwo = setupBoxes(this.instance, this.world, this.room2, boxes)
        
        this.room3 = {
            x: 0,
            y: 900,
            width: 800,
            height: 800,
            backgroundColor: "#0000ff",
            borderColor: "#FFFFFF",
            borderWidth: 25,
        }
        this.floors = setupFloors(this.instance, this.room3)
        this.obstacles3 = setupObstacles(this.instance, this.room3)
        this.boxesThree = setupBoxes(this.instance, this.world, this.room3, boxes)

        this.room4 = {
            x: 850,
            y: 850,
            width: 600,
            height: 200,
            backgroundColor: "#ff00ff",
            borderColor: "#FFFFFF",
            borderWidth: 10
        }
        this.floors = setupFloors(this.instance, this.room4)
        this.obstacles4 = setupObstacles(this.instance, this.room4)
        this.boxesFour = setupBoxes(this.instance, this.world, this.room4, boxes)
        */


        this.boxes = boxes




        const express = require('express')
        const app = express()
        const httpPort = process.env.PORT || 9010
        const httpsPort = 9010
        const { ExpressPeerServer } = require('peer')
        const path = require('path')
        const http = require('http')
        const https = require('https')
        const fs = require('fs')
        const credentials = {
            key: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/fullchain.pem')
        }

        const mainServer = http.createServer(app).listen(httpPort, () => { console.log('Main Server listening to port ' + httpPort) })
        const httpsServer = https.createServer(credentials, app).listen(httpsPort, () => { console.log('Peer Server listening to port ' + httpsPort) })

        const peerServer = ExpressPeerServer(httpsServer, {
                debug: true,
                ssl: credentials,
        })
        
        app.use('/peerjs', peerServer)
        


        this.people = []

        mainServer.on('connection', peer => {
            this.people.push(peer.id);
            console.log('peer connected', peer.id);
            console.log(this.people)
        });
        
        mainServer.on('disconnect', peer => {
            console.log('peer disconnected', peer.id);
        });


        


    

        this.world.on('postStep', function(event){
            // Add horizontal spring force
            //circleBody.force[0] -= 100 * circleBody.position[0];
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

            //console.log('help')

            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity
            const peerID = client.peerID;

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

            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+""), client)
            this.instance.messageAll(new Notification('Welcome '+ command.name +'', 'notification', 20, 20))
            //getLocalStream();


        })

        this.instance.on('connect', ({ client, callback }) => {
            
            // make the raw entity only visible to this client
            const channel = this.instance.createChannel()
            channel.subscribe(client)
            client.channel = channel

            
            //this.room.playerColors[rndInt]
            const rawEntity = new PlayerCharacter({self: true })
            const smoothEntity = new PlayerCharacter({self: false })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity
            
            client.positions = []

            //this.instance.message(new Notification('yolo'), client)
            //channel.addMessage(new Notification('private channel created'))
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 2000,
                halfHeight: 2000
            }

            
            callback({ accepted: true, text: 'Welcome!!!!' })

        
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
