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
import Box from '../common/entity/Box.js'
import setupObstacles from './setupObstacles.js'
import Obstacle from '../common/entity/Obstacle.js'
import setupBoxes from './setupBoxes.js'
import setupPortals from './setupPortals.js'

import { fire } from '../common/weapon.js'
import Notification from '../common/message/Notification'
import Walking from '../common/message/Walking'
import Hitting from '../common/message/Hitting'

import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'
import censoring from 'chat-censoring'
import fs from 'fs'
import SAT from 'sat'

var SpellChecker = require('spellchecker')

import { profanity } from '@2toad/profanity'

var Filter = require('./cleanHacked');
var filter = new Filter();

var swearjar = require('swearjar');


function uniqueInOrder(x) {
    const result = [];
    const input = Array.isArray(x) ? x : x.split('');
  
    for (let i = 0; i < input.length; ++i) {
      if (input[i] == input[i + 1]) continue
      result.push(input[i])
    }
    
    return result
  }

class GameInstance {
    constructor() {
        this.instance = new nengi.Instance(nengiConfig, { port: 8079 })
        instanceHookAPI(this.instance)

        this.totalUsers = 0
        this.activeUsers = []


        const { PeerServer } = require('peer');
        const peerServer = PeerServer({
            port: 9000,
            ssl: {
               //key: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/privkey.pem'),
               //cert: fs.readFileSync('/etc/letsencrypt/live/bias.jamesdelaney.ie/cert.pem')
            }
        });

        peerServer.on('connection', peer => {
            console.log('peer connected', peer.id);
        });
        
        peerServer.on('disconnect', peer => {
            console.log('peer disconnected', peer.id);
        });

        const portals = new Map()
        const obstacles = new Map()
        const boxes = new Map()

        this.world = new p2.World({gravity: [0, 0]});
        this.room = {
            x: 0,
            y: 0,
            width: 2000,
            height: 2000,
            backgroundColor: "#00ff00",
            floorColor: "#4DFA66",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "",
                type: "",
                x: 775,
                y: 655,
                width: 450, 
                height: 20, 
                color: "#0000ff",
                mass: 0
            },/*,{
                name: "",
                type: "",
                x: 0,
                y: 1330,
                width: 3000, 
                height: 20, 
                color: "#0000ff",
                mass: 0
            },{
                name: "",
                type: "",
                x: 560,
                y: 0,
                width: 20, 
                height: 3000, 
                color: "#0000ff",
                mass: 0
            },{
                name: "",
                type: "",
                x: 1440,
                y: 0,
                width: 20, 
                height: 3000, 
                color: "#0000ff",
                mass: 0
            },*/{
                name: "token",
                type: "robot",
                x: 950,
                y: 950,
                width: 35, 
                height: 35, 
                color: "#0000ff",
                mass: 1
            },
            {
                name: "token",
                type: "face",
                x: 1050,
                y: 1050,
                width: 35, 
                height: 35, 
                color: "#0000ff",
                mass: 1
            },{
                name: "token",
                type: "soccer-ball",
                x: 500,
                y: 500,
                width: 25, 
                height: 25, 
                color: "#0000ff",
                mass: 0.001
            },{
                name: "token",
                type: "talking",
                x: 950,
                y: 1050,
                width: 35, 
                height: 35, 
                color: "#0000ff",
                mass: 1
            },{
                name: "token",
                type: "dial",
                x: 1050,
                y: 950,
                width: 35, 
                height: 35, 
                color: "#0000ff",
                mass: 1
            }],
            portals: [{
                name: "Noah Levenson\n<bold>STEALING UR FEELINGS</bold>",
                x: 950,
                y: 1345,
                width: 100,
                height: 50,
                exit: [2500, 100]
            },{
                name: "Johann Dedrick\nDARK MATTERS",
                x: 570,
                y: 975,
                width: 10,
                height: 100,
                exit: [50, 2550]
            },{
                name: "Mushon Zer-Aviv\nNORMALISI.NG",
                x: 1420,
                y: 975,
                width: 10,
                height: 100,
                exit: [2500, 1500]
            },{
                name: "Libby Heaney\nCLASSES",
                x: 950,
                y: 700,
                width: 100,
                height: 10,
                exit: [3500, 100]
            }]
        }
        this.floors = setupFloors(this.instance, this.room)
        
        
        this.room2 = {
            x: 2100,
            y: 0,
            name: "Noah",
            width: 1000,
            height: 1000,
            backgroundColor: "#ffff00",
            color: "#FFE401",
            borderColor: "#FFFFFF",
            floorColor: "#FFE401",
            wallColor: "#ffff00",
            gridColor: "#454545",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 200,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 800,
                y: 500,
                width: 100, 
                height: 100, 
                color: "art1",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 500,
                y: 500,
                width: 177, 
                height: 315, 
                color: "#0000ff",
                mass: 2
            }],
            portals: [{
                name: "Main Lobby",
                x: 475,
                y: 50,
                width: 100,
                height: 10,
                exit: [1000, 1000]
            }]
        }
        this.floors2 = setupFloors(this.instance, this.room2)


        this.room3 = {
            x: 0,
            y: 2100,
            name: "Johann",
            width: 2000,
            height: 800,
            floorColor: "#471A8E",
            wallColor: "#9C52FF",
            gridColor: "#454545",
            backgroundColor: "#9C52FF",
            color: "#471A8E",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote6",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 1650,
                y: 500,
                width: 150, 
                height: 150, 
                color: "art2",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 1100,
                y: 600,
                width: 354, 
                height: 630, 
                color: "#00ffff",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors3 = setupFloors(this.instance, this.room3)



        this.room4 = {
            x: 2100,
            y: 1100,
            name: "Mushon",
            width: 800,
            height: 1500,
            floorColor: "#505050",
            wallColor: "#292929",
            gridColor: "#454545",
            backgroundColor: "#292929",
            color: "#505050",
            borderColor: "#FFFFFF",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "quote",
                x: 650,
                y: 1300,
                width: 40, 
                height: 40, 
                color: "quote6",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 400,
                y: 300,
                width: 200, 
                height: 200, 
                color: "art3",
                mass: 0
            },{
                name: "token",
                type: "video",
                x: 250,
                y: 1350,
                width: 354, 
                height: 630, 
                color: "#505050",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors4 = setupFloors(this.instance, this.room4)



        this.room5 = {
            x: 3200,
            y: 0,
            name: "Libby",
            width: 1500,
            height: 1500,
            floorColor: "#80EDFF",
            wallColor: "#1DCFFF",
            gridColor: "#000000",
            borderWidth: 25,
            objects: [{
                name: "token",
                type: "quote",
                x: 700,
                y: 500,
                width: 40, 
                height: 40, 
                color: "quote5",
                mass: 0
            },{
                name: "token",
                type: "quote",
                x: 650,
                y: 1300,
                width: 40, 
                height: 40, 
                color: "quote4",
                mass: 0
            },{
                name: "token",
                type: "art",
                x: 400,
                y: 300,
                width: 200, 
                height: 200, 
                color: "art4",
                mass: 0
            }],
            portals: [{
                name: "Main Lobby",
                x: 0,
                y: 600,
                width: 10,
                height: 100,
                exit: [1000, 1000]
            }]
        }
        this.floors5 = setupFloors(this.instance, this.room5)


        this.room6 = {
            x: 3100,
            y: 1600,
            name: "reception",
            width: 700,
            height: 700,
            floorColor: "#131313",
            wallColor: "#4DFA66",
            gridColor: "#454545",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: "#4dfa66",
            borderWidth: 5,
            objects: [/*{
                name: "token",
                type: "quote",
                x: 100,
                y: 600,
                width: 35, 
                height: 35, 
                color: "quote0",
                mass: 0
            }*/],
            portals: [],
            door: "bottom"
        }
        this.floors6 = setupFloors(this.instance, this.room6)
        this.obstacles6 = setupObstacles(this.instance, this.room6, obstacles)
        this.boxes6 = setupBoxes(this.instance, this.world, this.room6, boxes)
        /*

        function findContacts(){
    for(let i = 0; i < world.narrowphase.contactEquations.length; i++){
        let eq = world.narrowphase.contactEquations[i]
        let bodyAPosition = eq.bodyA.position
        let contactPointA = eq.contactPointA
    
        let contactX = bodyAPosition[0] + contactPointA[0]
        let contactY = bodyAPosition[1] + contactPointA[1]

        spawnParticle(contactX, contactY)
    }
}&*/

        this.room7 = {
            x: 3350,
            y: 2300,
            name: "reception",
            width: 200,
            height: 700,
            floorColor: "#131313",
            wallColor: "#4DFA66",
            gridColor: "#454545",
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: "#4dfa66",
            borderWidth: 5,
            objects: [],
            portals: [{
                name: "Main Lobby",
                x: 20,
                y: 720,
                width: 200,
                height: 10,
                exit: [1000, 1000]
            }],
            door: "",
            type: "corridor"
        }
        this.floors7 = setupFloors(this.instance, this.room7)
        this.obstacles7 = setupObstacles(this.instance, this.room7, obstacles)
        //this.boxes7 = setupBoxes(this.instance, this.world, this.room7, boxes)



        this.obstacles = setupObstacles(this.instance, this.room, obstacles)
        this.obstacles2 = setupObstacles(this.instance, this.room2, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room3, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room4, obstacles)
        this.obstacles3 = setupObstacles(this.instance, this.room5, obstacles)
        this.obstacles = obstacles


        this.boxes = setupBoxes(this.instance, this.world, this.room, boxes)
        this.boxesTwo = setupBoxes(this.instance, this.world, this.room2, boxes)
        this.boxesThree = setupBoxes(this.instance, this.world, this.room3, boxes)
        this.boxesFour = setupBoxes(this.instance, this.world, this.room4, boxes)
        this.boxesFour = setupBoxes(this.instance, this.world, this.room5, boxes)
        this.boxes = boxes

       

        
        this.portals = setupPortals(this.instance, this.room, portals)
        this.portals2 = setupPortals(this.instance, this.room2, portals)
        this.portals3 = setupPortals(this.instance, this.room3, portals)
        this.portals4 = setupPortals(this.instance, this.room4, portals)
        this.portals5 = setupPortals(this.instance, this.room5, portals)
        
        this.portals7 = setupPortals(this.instance, this.room7, portals)
        this.portals = portals


        const theInstance = this.instance
        const theWorld = this.world

        setInterval(function(){
            let likePump = new Box({
                name: "token",
                type: "thumbs-up",
                x: 7250,
                y: 250,
                width: 25,
                height: 25,
                mass: 0.001,
                color: "0000ff",
            })
            theInstance.addEntity(likePump)
            theWorld.addBody(likePump.body)
            boxes.set(likePump.nid, likePump)
        }, 30000)

        /*setInterval(function(){
            let size = Math.random() * 70
            let likePump = new Box({
                name: "token",
                type: "dial",
                x: 8900,
                y: 4500,
                width: size,
                height: size,
                mass: 0.001,
                color: "0000ff",
            })
            theInstance.addEntity(likePump)
            theWorld.addBody(likePump.body)
            boxes.set(likePump.nid, likePump)
        }, 30000)

        setInterval(function(){
            let size = Math.random() * 70
            let likePump = new Box({
                name: "token",
                type: "robot",
                x: 11500,
                y: 4500,
                width: size,
                height: size,
                mass: 0.001,
                color: "0000ff",
            })
            theInstance.addEntity(likePump)
            theWorld.addBody(likePump.body)
            boxes.set(likePump.nid, likePump)
        }, 30000)*/
        

        


    
        




        //LONG TRIANGLE PATTERNSED OBSTACLE SOUTH OF RECEPTION
        /*const southWall = new Obstacle({ 
            name: "southWall",
            x: 1800, 
            y: 2400, 
            width: 200, 
            height: 1400, 
            border: "",
            color: "#FF284D"
        })
        this.instance.addEntity(southWall)
        obstacles.set(southWall.nid, southWall)*/



         const easternEyeBuilding = new Obstacle({ 
            name: "easternEyeBuilding",
            x: 0, 
            y: 775, 
            width: 570, 
            height: 450, 
            border: "",
            color: "#FFE401"
        })
        this.instance.addEntity(easternEyeBuilding)
        obstacles.set(easternEyeBuilding.nid, easternEyeBuilding)

 
      

        const easternEyeBuildingTwo = new Obstacle({ 
            name: "easternEyeBuildingTwo",
            x: 1430, 
            y: 775, 
            width: 570, 
            height: 450, 
            border: "",
            color: "#FF33FF"
        })
        this.instance.addEntity(easternEyeBuildingTwo)
        obstacles.set(easternEyeBuildingTwo.nid, easternEyeBuildingTwo)










         //LONG TRIANGLE PATTERNSED OBSTACLE SOUTH OF RECEPTION
         const northernFlowerBuilding = new Obstacle({ 
            name: "northernFlowerBuilding",
            x: 775, 
            y: 0, 
            width: 450, 
            height: 675, 
            border: "",
            color: "#1DCFFF"
        })
        this.instance.addEntity(northernFlowerBuilding)
        obstacles.set(northernFlowerBuilding.nid, northernFlowerBuilding)



        const northernFlowerBuildingTwo = new Obstacle({ 
            name: "northernFlowerBuildingTwo",
            x: 775, 
            y: 1320, 
            width: 450, 
            height: 600, 
            border: "",
            color: "#FF0000"
        })
        this.instance.addEntity(northernFlowerBuildingTwo)
        obstacles.set(northernFlowerBuildingTwo.nid, northernFlowerBuildingTwo)





       /* const crystal = new Obstacle({ 
            name: "crystal",
            x: 300, 
            y: 500, 
            width: 200, 
            height: 500, 
            color: "#FF0000",
            rotation: 0,
            angle: 0
            //shape: 
        })
        this.instance.addEntity(crystal)
        obstacles.set(crystal.nid, crystal)

        const crystalTwo = new Obstacle({ 
            name: "crystal",
            x: 50, 
            y: 250, 
            width: 200, 
            height: 500, 
            color: "#FF0000",
            rotation: 0,
            angle: 90
            //shape: 
        })
        this.instance.addEntity(crystalTwo)
        obstacles.set(crystalTwo.nid, crystalTwo)*/
/*
      
  //LONG TRIANGLE PATTERNSED OBSTACLE SOUTH OF RECEPTION
  const circleBuilding = new Obstacle({ 
    name: "circleBuilding",
    x: 3400, 
    y: 3000, 
    width: 600, 
    height: 600, 
    border: "",
    color: "#FFE401"
})
this.instance.addEntity(circleBuilding)
obstacles.set(circleBuilding.nid, circleBuilding)*/

        
        //crystal


        this.people = []

        
        // (the rest is just attached to client objects when they connect)
        this.instance.on('command::LeaveCommand', ({ command, client }) => {

           /// clean up per client state
           this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))


           for (var i = this.activeUsers.length - 1; i >= 0; --i) {
               if (this.activeUsers[i].name == ''+ client.rawEntity.name +'') {
                   this.activeUsers.splice(i,1);
               }
           }


           if(client.rawEntity.nid) {
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
               client.channel.removeEntity(client.rawEntity)
              
           }
           client.channel.destroy()




        })

        
        


        // (the rest is just attached to client objects when they connect)
        this.instance.on('command::JoinCommand', ({ command, client }) => {

            this.joinSession(command, client)
            
        })

        this.instance.on('connect', ({ client, data, callback }) => {
            
            const channel = this.instance.createChannel()
            channel.subscribe(client)
            client.channel = channel
            
            client.positions = []

            client.invite = {x:data.fromClient.inviteX, y:data.fromClient.inviteY}
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 4000,
                halfHeight: 4000
            }
            
           

            let theWorldDesign = JSON.stringify([this.room, this.room2, this.room3, this.room4, this.room5, this.room6, this.room7])

            this.instance.message(new Notification(theWorldDesign, 'mapInfo', 0, 0), client)

            console.log(data)
            if(data.fromClient.name) {
                let command = {name: data.fromClient.name, avatar: data.fromClient.avatar, color: data.fromClient.color}
                this.joinSession(command, client)  
                console.log('name set')
            }
            //
            //
            


            callback({ accepted: true, text: ""})

        })




        this.instance.on('disconnect', client => {
            // clean up per client state
            if(client.rawEntity) {
                this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))
            }

            //console.log(''+ client.rawEntity.name +'')

            if(client.rawEntity) {
                client.channel.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
            }
            client.channel.destroy()
        })




        this.instance.on('command::SpeakCommand', ({ command, client, tick }) => {

            if(command.type == "emojiBlast") {

                this.instance.messageAll(new Notification(command.text, 'emojiBlast', command.x, command.y))
            
            } else if(command.type == "talk") {

                //set the message
                const message = command.text

                //remove duplicate characters over 2
                let messageTrimmed = message.replace(/(.)\1{2,}/g, '$1$1')
                console.log("Trimmed: "+messageTrimmed)

                //the regex motherlode haha
                var exp = /[\u0000-\u001f-[-`{-þĀ-žƀ-Ɏɐ-ʮʰ-ϾЀ-ӾԀ-\u052e\u0530-\u058e\u0590-\u05fe\u0600-\u07be߀-\u07fe\u0800-\u083e\u0840-\u085e\u08a0-\u08fe\u0900-\u09fe\u0a00-\u0a7e\u0a80-\u0afe\u0b00-\u0b7e\u0b80-\u0bfe\u0c00-\u0cfe\u0d00-\u0dfe\u0e00-\u0e7e\u0e80-\u0efeༀ-\u0ffeက-\u10feᄀ-\u11feሀ-\u137eᎀ-\u139eᎠ-\u13fe\u1400-\u167e\u1680-\u169eᚠ-\u16feᜀ-\u171eᜠ-\u173eᝀ-\u175eᝠ-\u177eក-\u17fe᠀-\u18ae\u18b0-\u18feᤀ-\u197eᦀ-\u1aae\u1b00-\u1b7e\u1b80-\u1bbe\u1bc0-\u1bfeᰀ-᱿\u1cc0-\u1cce\u1cd0-\u1cfeᴀ-ᵾᶀ-Ỿἀ-῾\u2000-\u209e₠-\u20ce\u20d0-\u20fe℀-\u218e←-\u23fe␀-\u243e⑀-\u245e①-\u26fe\u2700-➾⟀-\u2bfeⰀ-ⱞⱠ-\u2c7eⲀ-\u2d2eⴰ-\u2d7eⶀ-ⷞ\u2de0-\u2e7e⺀-\u2efe⼀-\u2fde⿰-\u2ffe\u3000-\u312e\u3130-ㆎ㆐-\u31be㇀-\u31eeㇰ-㋾㌀-\u4dbe䷀-\u9ffeꀀ-\ua48e꒐-\ua4ce\ua4d0-\ua4feꔀ-\ua63eꙀ-\ua69e\ua6a0-\ua6fe꜀-\ua82e\ua830-\ua83eꡀ-\ua87e\ua880-\ua8de\ua8e0-\ua8fe꤀-\ua97e\ua980-\ua9deꨀ-\uaa7e\uaa80-\uaade\uaae0-\uaafe\uab00-\uab2e\uabc0-\uabfe가-\ud7ae\ud7b0-\ud7fe\ud806-\ud807\ud80a-\ud80b\ud80e-\ud819\ud81c-\ud82b\ud82d-\ud833\ud836-\ud83a\ud83e-\ud83f\ud86f-\ud87d\ud87f-\udb3f\udb41-\udb7f\udc00-\ufafeﬀ-\ufdfe\ufe00-\ufe1e\ufe20-\ufe2e︰-\ufe6eﹰ-￮\ufff0-\ufffe]|[\ud80c\ud835\ud840-\ud868\ud86a-\ud86c\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udc00-\udc7e\udc80-\udcfe\udd00-\udd8e\udd90-\uddce\uddd0-\uddfe\ude80-\ude9e\udea0-\udede\udf00-\udf2e\udf30-\udf4e\udf80-\udfde]|\ud801[\udc00-\udc4e\udc50-\udcae]|\ud802[\udc00-\udc5e\udd00-\udd3f\udd80-\udd9e\udda0-\uddfe\ude00-\ude5e\ude60-\ude7e\udf00-\udf3e\udf40-\udf5e\udf60-\udf7e]|\ud803[\udc00-\udc4e\ude60-\ude7e]|\ud804[\udc00-\udc7e\udc80-\udcce\udcd0-\udcfe\udd00-\udd4e\udd80-\uddde]|\ud805[\ude80-\udece]|\ud808[\udc00-\udffe]|\ud809[\udc00-\udc7e]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude3e]|\ud81b[\udf00-\udf9e]|\ud82c[\udc00-\udcfe]|\ud834[\udc00-\udcfe\udd00-\uddfe\ude00-\ude4e\udf00-\udf5e\udf60-\udf7e]|\ud83b[\ude00-\udefe]|\ud83c[\udc00-\udc2e\udc30-\udc9e\udca0-\udcfe\udd00-\uddfe\ude00-\udefe\udf00-\udfff]|\ud83d[\udc00-\uddfe\ude00-\ude4e\ude80-\udefe\udf00-\udf7e]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]|\udb40[\udc00-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffe]|\udbff[\udc00-\udffe]|[\ud800-\ud805\ud808-\ud809\ud80c-\ud80d\ud81a-\ud81b\ud82c\ud834-\ud835\ud83b-\ud83d\ud840-\ud86e\ud87e\udb40\udb80-\udbff]/g;
                let messageEnglishCharactersOnly = messageTrimmed.replace(exp, "")
                console.log("Limited: "+messageEnglishCharactersOnly)

                
                let newSentance = ""
                let singleWords = messageEnglishCharactersOnly.split(" ")
                singleWords.forEach(word => {
                    let isMisspelled = SpellChecker.isMisspelled(word)
                    console.log(isMisspelled);
                    if(isMisspelled) {
                        let replacementWord = SpellChecker.getCorrectionsForMisspelling(word)
                        if(replacementWord[0]) {
                            newSentance += " "+replacementWord[0]
                        } else {
                            newSentance += " ???"
                        }
                    } else {
                        if(word == "rape") {
                            newSentance += " ****"
                        } else {
                            newSentance += " "+word
                        }
                    }
                })
                var secondRound = newSentance.substring(1);
              

                let firstPass = swearjar.censor(secondRound);
                console.log("First Pass: "+firstPass)

                if(firstPass.length > 0) {
                    //console.log(firstPass)

                    //let secondPass = censoring.censorMessage(firstPass, '*');
                    //console.log("Second Pass: "+secondPass)

                    let thirdPass = filter.cleanHacked(firstPass)
                    console.log("Third Pass: "+thirdPass)

                    this.instance.messageAll(new Notification(thirdPass, 'text', command.x, command.y))

                }
                
            }

        })

        this.instance.on('command::RespawnCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity
            respawnPlayer(rawEntity, smoothEntity);
        })

        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity

            if(command.forward == true || command.backward == true || command.left == true || command.right == true) {
                this.instance.addLocalMessage(new Walking(client.smoothEntity.nid, rawEntity.x, rawEntity.y))
            }
            applyCommand(rawEntity, command, this.obstacles, this.boxes)

            client.positions.push({
                x: rawEntity.x,
                y: rawEntity.y,
                delta: rawEntity.delta,
                rotation: rawEntity.rotation
            })

            //this.instance.message(new Notification("", "playerPosition", rawEntity.x), client)

        })

        this.instance.on('command::FireCommand', ({ command, client, tick }) => {
            // shoot from the perspective of this client's entity
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity

            if (fire(rawEntity)) {
                let endX = command.x
                let endY = command.y

                this.obstacles.forEach(obstacle => {
                    let hitObstacle
                    if(obstacle.name == "circleBuilding") {
                        hitObstacle = CollisionSystem.checkLinePolygon(rawEntity.x, rawEntity.y, command.x, command.y, obstacle.collider.circle)
                    } else {
                        hitObstacle = CollisionSystem.checkLinePolygon(rawEntity.x, rawEntity.y, command.x, command.y, obstacle.collider.polygon)
                    }
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

    joinSession(command, client) {


            const rawEntity = new PlayerCharacter({ self: true, avatar: ""+command.avatar+"", color: ""+command.color+"" })
            const smoothEntity = new PlayerCharacter({ self: false, avatar: ""+command.avatar+"", color: ""+command.color+"" })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity

            /*const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity*/
            const peerID = client.peerID;


           //let room2SpawnX = this.room6.x + (this.room6.width/2)
           //let room2SpawnY = this.room6.y + (this.room6.height/2) + 50
           let room2SpawnX = this.room.x + (this.room.width/2)
           let room2SpawnY = this.room.y + (this.room.height/2)
            
            
                rawEntity.x = room2SpawnX
                rawEntity.y = room2SpawnY
                smoothEntity.x = room2SpawnX
                smoothEntity.y = room2SpawnY

                /*if(client.invite.x > 0) {
                    rawEntity.x = client.invite.x
                    rawEntity.y = client.invite.y
                    smoothEntity.x = client.invite.x
                    smoothEntity.y = client.invite.y
                }*/
          


            this.world.addBody(rawEntity.body);
            this.instance.addEntity(rawEntity)
            client.channel.addEntity(rawEntity)

            smoothEntity.collidable = true
            this.instance.addEntity(smoothEntity)

            smoothEntity.name = command.name
            rawEntity.name = command.name
            client.name = command.name

            smoothEntity.avatar = command.avatar
            rawEntity.avatar = command.avatar
            client.avatar = command.avatar

            smoothEntity.color = command.color
            rawEntity.color = command.color
            client.color = command.color

            smoothEntity.isAlive = true;
            rawEntity.isAlive = true;

            //console.log('raw id: ' + rawEntity.nid)
            
            
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+"", ""+ command.avatar +"",""+ command.name +"", ""+ command.color +""), client)
            this.instance.messageAll(new Notification(''+ command.name +'', 'personJoined', 20, 20))

            this.totalUsers++
            this.activeUsers.push({name: command.name})
    }

    update(delta, tick, now) {
        this.instance.emitCommands()

        this.instance.clients.forEach(client => {

            if(client.rawEntity) {
                client.view.x = client.rawEntity.x
                client.view.y = client.rawEntity.y
                
                //console.log(client.rawEntity.body)
                client.rawEntity.body.position[0] = client.rawEntity.x
                client.rawEntity.body.position[1] = client.rawEntity.y
                client.rawEntity.body.angle = client.rawEntity.rotation
            }
            
            //console.log(client);
            // have the smooth entity follow the raw entity
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }

        })

        const theInstance = this.instance
        

        this.world.step(1/20);

       


        //this.instance.messageAll(new Notification(""+(this.world.time.toFixed())+"", 'worldInfoTime'))
        //this.instance.messageAll(new Notification(""+this.totalUsers+"", 'worldInfoTotalUsers'))
        //this.instance.messageAll(new Notification(""+this.activeUsers.length+"", 'worldInfoActiveUsers'))

        
            //Portals
            this.instance.clients.forEach(client => {

                for (let portal of this.portals.values()) {

                    if(client.smoothEntity) {

                        let collided = false

                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, portal.collider.polygon) 
                        
                        if(collided) {


                            let thisInstance = this.instance
                            let thisClient = client.rawEntity
                            let thisClientSmooth = client.smoothEntity
                            let portalName = portal.name

                            thisClient.isAlive = false;
                           

                            setTimeout(function(){
                                thisClient.x = portal.exit[0]
                                thisClient.y = portal.exit[1]
                                thisClientSmooth.x = portal.exit[0]
                                thisClientSmooth.y = portal.exit[1]
                                //console.log(port)
                                client.view.x = thisClient.x
                                client.view.y = thisClient.y
                                client.positions = []
                            }, 500)
                            
                            setTimeout(function(){
                                thisClient.isAlive = true
                                //console.log(portalName)
                                thisInstance.message(new Notification(portalName, 'sound', 0, 0), client)
                            }, 100)

                            break
                        } else {

                            let thisClient = client.rawEntity
                            let thisInstance = this.instance

                            var a = thisClient.x - portal.x;
                            var b = thisClient.y - portal.y
                            var c = Math.sqrt( a*a + b*b );

                            if(c < 200) {
                                var portalVolume = c.toFixed(0)
                                thisInstance.message(new Notification(portalVolume, 'portalVolume', 0, 0), client)
                            }
                        }
                        
                    }


                }


            })

            //Play Boxes

            for (const [key, value] of Object.entries(this.instance.clients.array)) {

                 for (let box of this.boxes.values()) {

                    let collided = false

                    if(value.rawEntity && box.name == "token") {

                        collided = SAT.testCirclePolygon(value.rawEntity.collider.circle, box.collider.polygon) 
                        
                        if(collided == true) {

                            if(box.type == "quote") {
                                this.instance.message(new Notification(''+box.color+'', 'showQuote'), value) 
                            } else if (box.type == "art") {
                                this.instance.message(new Notification(''+box.color+'', 'showArt'), value)
                            } else {
                                this.instance.message(new Notification(''+box.type+'', 'scoreIncrease'), value)
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
            if(box.type == "video") {
                box.rotation = box.body.angle + 1.5708
            } else {
                box.rotation = box.body.angle 
            }
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
            box.body.force[0] += 0.1 * Math.random() * plusOrMinus
            box.body.force[1] += 0.1 * Math.random() * plusOrMinus2
            
            
        })

        this.world.on('beginContact', function (event) {

           

           
            if(event.bodyA.name == "player" || event.bodyB.name == "player") {
                
               // console.log(event.bodyA.name)
               // console.log(event.bodyB.name)

                var velocityY = event.bodyA.velocity[1]
                var mass = event.bodyA.mass
                var momentum = mass*velocityY
                var angularVelocity = event.bodyA.angularVelocity
                
                //console.log(momentum)
                //console.log(anngularVelocity)

               // console.log(event.bodyA.velocity)
               // console.log(event.bodyB.velocity)
               // console.log(event.bodyA.angularVelocity)
               // console.log(event.bodyB.angularVelocity)
            }
            
            theInstance.addLocalMessage(new Hitting(0, momentum, event.bodyA.position[0], event.bodyA.position[1]))

            //console.log('Collision registered...'); ]

            event.bodyA.updateAABB();
            event.bodyB.updateAABB();
         });
        



        // when instance.updates, nengi sends out snapshots to every client
        this.instance.update()
    }
}

export default GameInstance
