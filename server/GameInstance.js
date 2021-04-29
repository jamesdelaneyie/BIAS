import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'
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

class GameInstance {
    constructor() {
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)

        // game-related state

        this.world = new p2.World({gravity: [0, 0]});
        this.obstacles = setupObstacles(this.instance)
        this.boxes = setupBoxes(this.instance, this.world)


        // (the rest is just attached to client objects when they connect)

        this.instance.on('connect', ({ client, callback }) => {
            // create a entity for this client
            const rawEntity = new PlayerCharacter()
            rawEntity.x = 500
            rawEntity.y = 500
            this.world.addBody(rawEntity.body);

            // make the raw entity only visible to this client
            const channel = this.instance.createChannel()
            channel.subscribe(client)

            this.instance.message(new Notification('yolo'), client)
            channel.addMessage(new Notification('private channel created'))

            channel.addEntity(rawEntity)
            this.instance.addEntity(rawEntity)
            client.channel = channel

            // smooth entity is visible to everyone
            const smoothEntity = new PlayerCharacter()
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
            
            console.log(client.rawEntity.body.position)
            client.rawEntity.body.position[0] = client.rawEntity.x
            client.rawEntity.body.position[1] = client.rawEntity.y


            // have the smooth entity follow the raw entity
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }
        })

        this.world.step(1/4);

        this.boxes.forEach(box => {
            
            box.x = box.body.position[0]
            box.y = box.body.position[1]
            
            box.rotation= box.body.angle

            box.collider.polygon.pos.x = box.body.position[0] - box.width/2
            box.collider.polygon.pos.y = box.body.position[1] - box.height/2
            //box.collider.polygon.
        })

        // when instance.updates, nengi sends out snapshots to every client
        this.instance.update()
    }
}

export default GameInstance
