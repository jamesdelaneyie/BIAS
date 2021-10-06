import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'

import Identity from '../common/message/Identity.js'

import WeaponFired from '../common/message/WeaponFired.js'
import CollisionSystem from '../common/CollisionSystem.js'
import followPath from './followPath.js'
import damagePlayer from './damagePlayer.js'
import tagPlayer from './tagPlayer.js'
import instanceHookAPI from './instanceHookAPI.js'
import applyCommand from '../common/applyCommand.js'


import setupFloors from './setupFloors.js'
import setupBoxes from './setupBoxes.js'
import addFlower from './addFlower.js'


import setupWalls from './setupWalls.js'
import setupObjectWalls from './setupObjectWalls.js'

import setupPortals from './setupPortals.js'
import setupObstacles from './setupObstacles.js'

import PlayerCharacter from '../common/entity/PlayerCharacter.js'
import Flower from '../common/entity/Flower.js'
import Box from '../common/entity/Box.js'
import Obstacle from '../common/entity/Obstacle.js'

import { fire } from '../common/weapon.js'

import Notification from '../common/message/Notification'
import Walking from '../common/message/Walking'
import Hitting from '../common/message/Hitting'

import lagCompensatedHitscanCheck from './lagCompensatedHitscanCheck'

import fs from 'fs'
import SAT from 'sat'

import { GoogleSpreadsheet } from 'google-spreadsheet'


var swearjar = require('swearjar');
var SpellChecker = require('spellchecker')
var Filter = require('./cleanHacked');
var filter = new Filter();

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


        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet('1M4TNR1k7f2OLdN_cUd1-k2Hyb_zTWWzl7gs37sLd1OE');
        const creds = require('../bias-online-keys.json');
        



        this.portals = new Map()
        this.obstacles = new Map()
        this.boxes = new Map()
        this.flowers = new Map()

        this.world = new p2.World({gravity: [0, 0]});

        this.room = {
            x: 60,
            y: 60,
            width: 1320,
            height: 960,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00FF00",
            objects: [{
                name: "token",
                type: "soccer-ball",
                x: 950,
                y: 950,
                width: 25, 
                height: 25, 
                color: "#0000ff",
                mass: 0.001
            }],
            holes: [{
                offset: 500,
                width: 0,
            },{
                offset: 230,
                width: 490,
            },{
                offset: 1010,
                width: 180,
            },{
                offset: 500,
                width: 0,
            }]
        }
        setupFloors(this.instance, this.room)
        setupObjectWalls(this.instance, this.world, this.room, this.boxes)
        setupWalls(this.instance, this.room, this.obstacles, 'wall')
        setupBoxes(this.instance, this.world, this.room, this.boxes)

        this.roomEntrance = {
            x: 1080,
            y: 1030,
            width: 176,
            height: 176,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00FF00",
            holes: [{
                offset: 0,
                width: 176,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 176,
            },{
                offset: 0,
                width: 0,
            }],
            portals: [
                {
                    name: "Noah Levenson\n<bold>STEALING UR FEELINGS</bold>",
                    x: 0,
                    y: 0,
                    width: 180,
                    height: 20,
                    exit: [150, 150]
                }
            ]
        }
        setupFloors(this.instance, this.roomEntrance)
        setupObjectWalls(this.instance, this.world, this.roomEntrance, this.boxes)
        setupWalls(this.instance, this.roomEntrance, this.obstacles, 'wall')

       

        let securityCamera1 = new Box({
            name: "token",
            type: "security-cam",
            x: 1380,
            y: 1020,
            width: 150,
            height: 75,
            mass: 0,
            color: "0000ff",
        })
        this.instance.addEntity(securityCamera1)
        this.world.addBody(securityCamera1.body)
        this.boxes.set(securityCamera1.nid, securityCamera1)

        let securityCamera2 = new Box({
            name: "token",
            type: "security-cam",
            x: 60,
            y: 1020,
            width: 150,
            height: 75,
            mass: 0,
            color: "0000ff",
        })
        this.instance.addEntity(securityCamera2)
        this.world.addBody(securityCamera2.body)
        this.boxes.set(securityCamera2.nid, securityCamera2)


        let securityCamera3 = new Box({
            name: "token",
            type: "security-cam",
            x: 60,
            y: 60,
            width: 150,
            height: 75,
            mass: 0,
            color: "0000ff",
        })
        this.instance.addEntity(securityCamera3)
        this.world.addBody(securityCamera3.body)
        this.boxes.set(securityCamera3.nid, securityCamera3)



        let securityCamera4 = new Box({
            name: "token",
            type: "security-cam",
            x: 1380,
            y: 60,
            width: 150,
            height: 75,
            mass: 0,
            color: "0000ff",
        })
        this.instance.addEntity(securityCamera4)
        this.world.addBody(securityCamera4.body)
        this.boxes.set(securityCamera4.nid, securityCamera4)


        this.room2 = {
            x: 250,
            y: 250,
            width: 940,
            height: 580,
            floorColor: "#000000",
            gridColor: "#4DFA66",
            gridGap: 20,
            wallThickness: 10,
            wallColor: "#00FF00",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            }],
        }
        setupFloors(this.instance, this.room2)
        setupObjectWalls(this.instance, this.world, this.room2, this.boxes)
        setupWalls(this.instance, this.room2, this.obstacles, "artStarter")


        let information = new Box({
            name: "token",
            type: "info2",
            x: 690,
            y: 850,
            width: 80,
            height: 30,
            mass: 0,
            color: "quote7",
        })
        this.instance.addEntity(information)
        this.world.addBody(information.body)
        this.boxes.set(information.nid, information)

        let information2 = new Box({
            name: "token",
            type: "info2",
            x: 1680,
            y: 520,
            width: 30,
            height: 80,
            mass: 0,
            color: "quote8",
        })
        this.instance.addEntity(information2)
        this.world.addBody(information2.body)
        this.boxes.set(information2.nid, information2)

        let information3 = new Box({
            name: "token",
            type: "info2",
            x: 730,
            y: 70,
            width: 80,
            height: 30,
            mass: 0,
            color: "quote9",
        })
        this.instance.addEntity(information3)
        this.world.addBody(information3.body)
        this.boxes.set(information3.nid, information3)

        this.room3 = {
            x: 1391,
            y: 310,
            width: 300,
            height: 460,
            floorColor: "#717a73",
            gridColor: "#000000",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#00FF00",
            holes: [{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 0,
            },{
                offset: 0,
                width: 480,
            }],
        }
        setupFloors(this.instance, this.room3)
        setupObjectWalls(this.instance, this.world, this.room3, this.boxes)
        setupWalls(this.instance, this.room3, this.obstacles, "wall")



    
       

       const libbyVideoPreview = new Obstacle({ 
            name: "libbyVideoPreview",
            x: 310, 
            y: 310, 
            width: 820,
            height: 460, 
            color: "#FFE401"
        })
        this.instance.addEntity(libbyVideoPreview)
        this.obstacles.set(libbyVideoPreview.nid, libbyVideoPreview)




               
       








        this.room5 = {
            x: 440,
            y: 1500,
            width: 1020,
            height: 960,
            floorColor: "#f0f8ff",
            gridColor: "#545454",
            gridGap: 60,
            wallThickness: 10,
            wallColor: "#FFE401",
            objects: [{
                name: "token",
                type: "soccer-ball",
                x: 950,
                y: 950,
                width: 25, 
                height: 25, 
                color: "#0000ff",
                mass: 0.001
            }],
            holes: [{
                offset: 600,
                width: 180,
            },{
                offset: 0,
                width: 0,
            },{
                offset:0,
                width:0,
            },{
                offset: 500,
                width: 0,
            }]
        }
        setupFloors(this.instance, this.room5)
        setupObjectWalls(this.instance, this.world, this.room5, this.boxes)
        setupWalls(this.instance, this.room5, this.obstacles, 'wall')
        setupBoxes(this.instance, this.world, this.room5, this.boxes)




        let wallMaterial = new p2.Material()
        let merryGoRoundObject = new Box({ 
            name: 'merryGoRound',
            x: this.room5.x + this.room5.width/2 - 150, 
            y: this.room5.y + this.room5.height/2 - 150, 
            width: 300, 
            height: 300, 
            mass: 0,
            color: "#000000",
            material: wallMaterial 
        })
        this.instance.addEntity(merryGoRoundObject)
        this.world.addBody(merryGoRoundObject.body)
        this.boxes.set(merryGoRoundObject.nid, merryGoRoundObject)

        let merryGoRound = new Obstacle({ 
            name: 'merryGoRound',
            x: this.room5.x + this.room5.width/2, 
            y: this.room5.y + this.room5.height/2, 
            width: 300, 
            height: 300, 
            border: 5,
            color: "#000000",
            angle: 0
        })
        this.instance.addEntity(merryGoRound)
        this.obstacles.set(merryGoRound.nid, merryGoRound)

        
        


        const thisInstance = this.instance
        const thisWorld = this.world
        const thisBoxes = this.boxes

        setInterval(function(){
            let likePump = new Box({
                name: "token",
                type: "thumbs-up",
                x: 550,
                y: 2350,
                width: 20,
                height: 20,
                mass: 0.001,
                color: "0000ff",
            })
            thisInstance.addEntity(likePump)
            thisWorld.addBody(likePump.body)
            thisBoxes.set(likePump.nid, likePump)
        }, 500)





        this.angleTimer = 0
        this.angleMovement = 0.001

        this.people = []


        this.instance.on('connect', ({ client, data, callback }) => {

            console.log('connection')
            
            const channel = this.instance.createChannel()

            channel.subscribe(client)
            client.channel = channel
            
            client.positions = []
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 2000,
                halfHeight: 1800
            }

            let theWorldDesign = JSON.stringify([this.room, this.room2, this.roomEntrance, this.room3, this.room5])

            this.instance.message(new Notification(theWorldDesign, 'mapInfo', 0, 0), client)
            
            console.log('connection')

            if(data.fromClient.name) {
                console.log('login')
                this.instance.message(new Notification('', 'login', 0, 0), client)
                let command = {name: data.fromClient.name, avatar: data.fromClient.avatar, color: data.fromClient.color, x: data.fromClient.x, y: data.fromClient.y}
                this.joinSession(command, client, doc, creds, true)  
            }


            callback({ accepted: true, text: ""})

        })

        this.instance.on('disconnect', client => {
            
            if(client.rawEntity) {
                this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))
            }

            if(client.rawEntity) {
                client.channel.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
            }
            client.channel.destroy()
        })

        this.instance.on('command::JoinCommand', ({ command, client }) => {
            
            //console.log('join command')

            this.joinSession(command, client, doc, creds, true)
            
        })
        

        this.instance.on('command::ToggleCommand', ({ command, client }) => {

            //console.log(command)
            

            if(command.type == "headphones" && command.boolean == true) {
                client.rawEntity.headphones = true
                client.smoothEntity.headphones = true
            } else if (command.type == "headphones" && command.boolean == false) {
                client.rawEntity.headphones = false
                client.smoothEntity.headphones = false
            }



            if(command.type == "typing" && command.boolean == true) {
                client.rawEntity.typing = true
                client.smoothEntity.typing = true
            } else if (command.type == "typing" && command.boolean == false) {
                client.rawEntity.typing = false
                client.smoothEntity.typing = false
            }


 
        })


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

        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity


            if(command.forward == true || command.backward == true || command.left == true || command.right == true) {
                //this.instance.addLocalMessage(new Walking(client.smoothEntity.nid, client.color, client.smoothEntity.rotation, rawEntity.x, rawEntity.y))
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

                    let thirdPass = filter.cleanHacked(firstPass)
                    console.log("Third Pass: "+thirdPass)

                    this.instance.messageAll(new Notification(thirdPass, 'text', command.x, command.y))

                }
                
            }

        })

        this.instance.on('command::FireCommand', ({ command, client, tick }) => {
            // shoot from the perspective of this client's entity
            const rawEntity = client.rawEntity
            const smoothEntity = client.smoothEntity

            
            const flowerCommand = {x: command.x, y: command.y, color: command.color }

            


            //addFlower(this.instance, flowerCommand, this.flowers)
            let sticker = false 

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

                        if(obstacle.name == "merryGoRound") {
                            obstacle.sticker = parseInt(Math.random() * 100)
                            sticker = true
                            //console.log(obstacle)
                        }
                    }
                })

                const timeAgo = client.latency + 100
                const hits = lagCompensatedHitscanCheck(this.instance, rawEntity.x, rawEntity.y, endX, endY, timeAgo)
               

                hits.forEach(victim => {
                    
                    if (victim.nid !== rawEntity.nid && victim.nid !== smoothEntity.nid) {
                        damagePlayer(victim, 25)
                        victim.sticker = parseInt(Math.random() * 100)
                        sticker = true
                    }
                })

                if(sticker == false) {
                    this.addFlower(flowerCommand, client)
                }

                this.instance.addLocalMessage(new WeaponFired(smoothEntity.nid, smoothEntity.x, smoothEntity.y, command.x, command.y))
            }
        })
    }

    addFlower(command, client) {


            const flower = new Flower({ x: command.x, y: command.y, color: ""+command.color+"" })

            this.instance.addEntity(flower)
       
            client.channel.addEntity(flower)

            this.instance.messageAll(new Notification('', 'flower', 20, 20))
            
            
    }

    async addIdentity(doc, creds, command) {

        await doc.useServiceAccountAuth(creds);
                
        await doc.loadInfo(); 

        const sheet = doc.sheetsByIndex[0]; 
        sheet.headerValues = ['name', 'avatar', 'color']
        console.log(command)
        await sheet.addRow({ 
            name: ''+command.name+'', 
            avatar: ''+command.avatar+'', 
            color: ''+command.color+'' 
        });

        
    }

    joinSession(command, client, doc, creds, login) {

            //console.log('im joining')
            if(login == false) {
                this.addIdentity(doc, creds, command)
            }
            

            const rawEntity = new PlayerCharacter({ self: true, avatar: ""+command.avatar+"", color: ""+command.color+"" })
            const smoothEntity = new PlayerCharacter({ self: false, avatar: ""+command.avatar+"", color: ""+command.color+"" })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity

            const peerID = client.peerID;

           let spawnX = 1304
           let spawnY = 328

            if(!isNaN(command.x)) {
                rawEntity.x = Number(command.x)
            } else {
                rawEntity.x = spawnX
            }
            if(!isNaN(command.y)) {
                rawEntity.y = Number(command.y)
            } else {
                rawEntity.y = spawnY
            }
            
            if(!isNaN(command.x)) {
                smoothEntity.x = Number(command.x)
            } else {
                smoothEntity.x = spawnX
            }
            if(!isNaN(command.y)) {
                smoothEntity.y = Number(command.y)
            } else {
                smoothEntity.y = spawnY
            }

            console.log(command.x, command.y)


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
            
            
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+"", ""+ command.avatar +"",""+ command.name +"", ""+ command.color +""), client)
            this.instance.messageAll(new Notification(''+ command.name +'', 'personJoined', 20, 20))

            this.totalUsers++
            this.activeUsers.push({name: command.name})

           // console.log('im joining')

            
    }

    update(delta, tick, now) {
        this.instance.emitCommands()

        this.instance.clients.forEach(client => {

            if(client.rawEntity) {
                client.view.x = client.rawEntity.x
                client.view.y = client.rawEntity.y
                
                client.rawEntity.body.position[0] = client.rawEntity.x
                client.rawEntity.body.position[1] = client.rawEntity.y

                client.rawEntity.body.angle = client.rawEntity.rotation
            }
            
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

        this.obstacles.forEach(obstacle => {
            if(obstacle.name == "merryGoRound") {
                let newAngle = obstacle.angle + 0.03
                obstacle.angle = newAngle
                obstacle.collider.polygon.rotate(0.03)
            }
        })

        this.boxes.forEach(box => {
            
            if(box.name == "merryGoRound") {
                //console.log(box)
                box.body.angle += 0.03
                box.rotation = box.body.angle
                box.body.updateAABB() 
               
            }
        })

        //Start Art
        this.instance.clients.forEach(client => {

            let touching = false

            for (let obstacle of this.obstacles.values()) {

               if(client.rawEntity && obstacle.name == 'artStarter') {

                   let collided = false

                   collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, obstacle.collider.polygon) 
                   
                   if(collided == true) {

                       // console.log('collided')

                        //if(obstacle.touching == false) {
                            let directionvertical, directionHorizontal
                            //console.log(obstacle.name)
                            if(client.rawEntity.x < obstacle.x) {
                                directionHorizontal = "left"
                            } else if (client.rawEntity.x > obstacle.x + obstacle.width) {
                                directionHorizontal = "right"
                            } else {
                                directionHorizontal = ""
                            }
                            if(client.rawEntity.y < obstacle.y) {
                                directionvertical = "top"
                            } else if (client.rawEntity.y > obstacle.y + obstacle.height) {
                                directionvertical = "bottom"
                            } else {
                                directionvertical = ""
                            }
                            //console.log(client.smoothEntity.bodyRotation)
                            this.instance.message(new Notification(""+directionvertical+""+ directionHorizontal+"", 'showStartArtButton', client.rawEntity.bodyRotation, 0), client)
                        //}
                        
                        //obstacle.touching = true
                        touching = true

                        break

                   } else {
                        //
                        //obstacle.touching = false
                   }
          
               }


           }

           if(touching == false) {
            this.instance.message(new Notification("uo!", 'hideStartArtButton'), client)
          }


       })



        for (const [key, value] of Object.entries(this.instance.clients.array)) {

            let touching = false

            for (let box of this.boxes.values()) {

                let collided = false

                if(value.rawEntity && box.name == "token") {

                    collided = SAT.testCirclePolygon(value.rawEntity.collider.circle, box.collider.polygon) 
                    
                    if(collided == true) {

                        //if(box.touching == false) {
                            if(box.type == "info2") {
                                this.instance.message(new Notification(''+box.color+'', 'showQuote'), value) 
                            } else {
                                this.instance.message(new Notification(''+box.type+'', 'scoreIncrease'), value)
                            }
                        //}

                        //box.touching = true
                        touching = true

                        break

                    } else {
                        //box.touching = false
                    }
            
                }

            }

        }


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
                
                //console.log(momentum)
                //console.log(anngularVelocity)

               // console.log(event.bodyA.velocity)
               // console.log(event.bodyB.velocity)
               // console.log(event.bodyA.angularVelocity)
               // console.log(event.bodyB.angularVelocity)
            }
            
            //theInstance.addLocalMessage(new Hitting(0, momentum, event.bodyA.position[0], event.bodyA.position[1]))

            //console.log('Collision registered...'); ]

            //event.bodyA.updateAABB();
            //event.bodyB.updateAABB();
        });


        //Libbys Security Cameras
        this.instance.clients.forEach(client => {

            for (let box of this.boxes.values()) {

                if(client.smoothEntity) {

                    let thisClient = client.rawEntity

                    var a = thisClient.x - box.x;
                    var b = thisClient.y - box.y
                    var c = Math.sqrt( a*a + b*b );

                    if(c < 1000) {
                        if(box.type == "security-cam") {

                            const dx = box.x - thisClient.x
                            const dy = box.y - thisClient.y
                            const rotation = Math.atan2(dy, dx);

                            box.rotation = rotation
                           

                        }
                        
                    }
                }

            }

        })
    

        // when instance.updates, nengi sends out snapshots to every client
        this.instance.update()
    }
}

export default GameInstance
