import nengi from 'nengi'
import nengiConfig from '../common/nengiConfig.js'
import p2 from 'p2'

import Identity from '../common/message/Identity.js'

import WeaponFired from '../common/message/WeaponFired.js'
import CollisionSystem from '../common/CollisionSystem.js'
import followPath from './followPath.js'
import damagePlayer from './damagePlayer.js'

import instanceHookAPI from './instanceHookAPI.js'
import applyCommand from '../common/applyCommand.js'


import setupFloors from './setupFloors.js'
import setupBoxes from './setupBoxes.js'


import setupWalls from './setupWalls.js'
import setupObjectWalls from './setupObjectWalls.js'

import setupPortals from './setupPortals.js'
import setupObstacles from './setupObstacles.js'

import PlayerCharacter from '../common/entity/PlayerCharacter.js'
import Flower from '../common/entity/Flower.js'
import Box from '../common/entity/Box.js'
import Obstacle from '../common/entity/Obstacle.js'
import Art from '../common/entity/Art.js'

import { fire } from '../common/weapon.js'

import Notification from '../common/message/Notification'
import Walking from '../common/message/Walking'

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

        const doc = new GoogleSpreadsheet('1M4TNR1k7f2OLdN_cUd1-k2Hyb_zTWWzl7gs37sLd1OE');
        const creds = require('../bias-online-keys.json');
        

        this.portals = new Map()
        this.obstacles = new Map()
        this.boxes = new Map()
        this.artworks = new Map()
        this.flowers = new Map()

        this.world = new p2.World({gravity: [0, 0]});



       
        let libbyArtworkObject = {
            name: "<bold>CLASSES</bold>\nLibby Heaney",
            type: "rectangle",
            x: 2000,
            y: 1200,
            width: 250,
            height: 150,
            mass: 0,
            color: "#ffffff",
        }
        let libbyArtwork = new Art(libbyArtworkObject)
        this.instance.addEntity(libbyArtwork)
        this.world.addBody(libbyArtwork.body)
        this.artworks.set(libbyArtwork.nid, libbyArtwork)

        let noahArtworkObject = {
            name: "<bold>STEAL UR FEELINGS</bold>\nNoah Levenson",
            type: "triangle",
            x: 2600,
            y: 1200,
            width: 250,
            height: 200,
            mass: 0,
            color: "#ffffff",
        }
        let noahArtwork = new Art(noahArtworkObject)
        this.instance.addEntity(noahArtwork)
        this.world.addBody(noahArtwork.body)
        this.artworks.set(noahArtwork.nid, noahArtwork)


        let johannArtworkObject = {
            name: "<bold>DARK MATTERS</bold>\nJohann Diedrick",
            type: "circle",
            x: 2600,
            y: 1600,
            width: 200,
            height: 200,
            mass: 0,
            color: "#ffffff",
        }
        let johannArtwork = new Art(johannArtworkObject)
        this.instance.addEntity(johannArtwork)
        this.world.addBody(johannArtwork.body)
        this.artworks.set(johannArtwork.nid, johannArtwork)


        let mushonArtworkObject = {
            name: "<bold>NORMALIZI.NG</bold>\nMushon Zer-Aviv",
            type: "rectangle",
            x: 2100,
            y: 1600,
            width: 180,
            height: 180,
            mass: 0,
            color: "#ffffff",
        }
        let mushonArtwork = new Art(mushonArtworkObject)
        this.instance.addEntity(mushonArtwork)
        this.world.addBody(mushonArtwork.body)
        this.artworks.set(mushonArtwork.nid, mushonArtwork)

        



        this.instance.on('connect', ({ client, data, callback }) => {
            
            const channel = this.instance.createChannel()

            channel.subscribe(client)
            client.channel = channel
            
            client.positions = []
           
            client.view = {
                x: 0,
                y: 0,
                halfWidth: 2500,
                halfHeight: 2300
            }

            let theWorldDesign = JSON.stringify({
                art:[
                    libbyArtworkObject,
                    noahArtworkObject, 
                    johannArtworkObject, 
                    mushonArtworkObject
                ]
            })

            this.instance.message(new Notification(theWorldDesign, 'mapInfo', 0, 0), client)
            
            if(data.fromClient.bot == true) {
                let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                //let colorNow = PIXI.utils.string2hex(color);
                let command = {name: "BOT", avatar: "", color: ""+color+"", x:2320, y: 1500}
                this.joinSession(command, client, doc, creds, true) 
            }
            
            

            if(data.fromClient.name) {
                this.instance.message(new Notification('', 'login', 0, 0), client)
                let command = {name: data.fromClient.name, avatar: data.fromClient.avatar, color: data.fromClient.color, x: data.fromClient.x, y: data.fromClient.y}
                this.joinSession(command, client, doc, creds, true)  
            }

            callback({ accepted: true, text: ""})

        })

        this.instance.on('disconnect', client => {

            this.totalUsers--
            
            if(client.rawEntity) {
                this.instance.messageAll(new Notification(''+ client.rawEntity.name +'', 'personLeft', 20, 20))
            }

            if(client.rawEntity) {
                client.channel.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.rawEntity)
                this.instance.removeEntity(client.smoothEntity)
            }
            if(client.channel) {
                client.channel.destroy()
            }
            
        })
        

        this.instance.on('command::JoinCommand', ({ command, client }) => {
            
            //console.log('this')
            this.joinSession(command, client, doc, creds, false)
            
        })
        

        this.instance.on('command::ToggleCommand', ({ command, client }) => {

            if(command.type == "sleeping" && command.boolean == true) {

                if(client.smoothEntity) {
                    client.smoothEntity.sleeping = true
                    client.rawEntity.sleeping = true
                }


            } else if(command.type == "sleeping" && command.boolean == false)  {

               
                if(client.smoothEntity) {
                    client.smoothEntity.sleeping = false
                    client.rawEntity.sleeping = false
                }
                //console.log('awake')

            }

            if(command.type == "headphones" && command.boolean == true) {

                client.headphones = true
                client.rawEntity.headphones = true
                client.smoothEntity.headphones = true

            } else if (command.type == "headphones" && command.boolean == false) {

                
                for (let obstacle of this.obstacles.values()) {
                    if(obstacle.name == "merryGoRound") {
                        let collided = false
                        
                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, obstacle.collider.polygon) 
                        
                        if(collided == true) {

                            const response = new SAT.Response()


                            if (SAT.testCirclePolygon(client.rawEntity.collider.circle, obstacle.collider.polygon, response)) {
                                client.rawEntity.x -= response.overlapV.x * 4
                                client.rawEntity.y -= response.overlapV.y * 4
                            }
                            
 
                        }

                    }
                    
                   
                }

                setTimeout(function(){
                    client.headphones = false
                    client.rawEntity.headphones = false
                    client.smoothEntity.headphones = false
                }, 200)

                
              

                

            }


 
        })


        this.instance.on('command::LeaveCommand', ({ command, client }) => {

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

        this.messageDebounceTimer = 0
        this.timeDebounceTimer = 0


        this.instance.on('command::MoveCommand', ({ command, client, tick }) => {
            const rawEntity = client.rawEntity

            client.sleepTimer = 0

            if(command.forward == true || command.backward == true || command.left == true || command.right == true) {
                this.messageDebounceTimer++

                if(this.messageDebounceTimer > 20) {
                    this.instance.addLocalMessage(new Walking(client.smoothEntity.nid, client.color, client.smoothEntity.rotation, rawEntity.x, rawEntity.y))
                    //console.log(client.smoothEntity.nid+' walked')
                    this.messageDebounceTimer = 0
                }
            }

            applyCommand(rawEntity, command, this.obstacles, this.boxes, this.artworks)

            client.positions.push({
                x: rawEntity.x,
                y: rawEntity.y,
                delta: rawEntity.delta,
                rotation: rawEntity.rotation
            })
            

            
        })



        this.instance.on('command::SpeakCommand', ({ command, client, tick }) => {

            client.sleepTimer = 0

            if(command.type == "emojiBlast") {

                this.instance.messageAll(new Notification(command.text, 'emojiBlast', command.x, command.y))
            
            } else if(command.type == "talk") {

                //set the message
                const message = command.text

                if(command.text == "") {
                    return
                }

                //remove duplicate characters over 2
                let messageTrimmed = message.replace(/(.)\1{2,}/g, '$1$1')

                //the regex motherlode 
                var exp = /[\u0000-\u001f-[-`{-þĀ-žƀ-Ɏɐ-ʮʰ-ϾЀ-ӾԀ-\u052e\u0530-\u058e\u0590-\u05fe\u0600-\u07be߀-\u07fe\u0800-\u083e\u0840-\u085e\u08a0-\u08fe\u0900-\u09fe\u0a00-\u0a7e\u0a80-\u0afe\u0b00-\u0b7e\u0b80-\u0bfe\u0c00-\u0cfe\u0d00-\u0dfe\u0e00-\u0e7e\u0e80-\u0efeༀ-\u0ffeက-\u10feᄀ-\u11feሀ-\u137eᎀ-\u139eᎠ-\u13fe\u1400-\u167e\u1680-\u169eᚠ-\u16feᜀ-\u171eᜠ-\u173eᝀ-\u175eᝠ-\u177eក-\u17fe᠀-\u18ae\u18b0-\u18feᤀ-\u197eᦀ-\u1aae\u1b00-\u1b7e\u1b80-\u1bbe\u1bc0-\u1bfeᰀ-᱿\u1cc0-\u1cce\u1cd0-\u1cfeᴀ-ᵾᶀ-Ỿἀ-῾\u2000-\u209e₠-\u20ce\u20d0-\u20fe℀-\u218e←-\u23fe␀-\u243e⑀-\u245e①-\u26fe\u2700-➾⟀-\u2bfeⰀ-ⱞⱠ-\u2c7eⲀ-\u2d2eⴰ-\u2d7eⶀ-ⷞ\u2de0-\u2e7e⺀-\u2efe⼀-\u2fde⿰-\u2ffe\u3000-\u312e\u3130-ㆎ㆐-\u31be㇀-\u31eeㇰ-㋾㌀-\u4dbe䷀-\u9ffeꀀ-\ua48e꒐-\ua4ce\ua4d0-\ua4feꔀ-\ua63eꙀ-\ua69e\ua6a0-\ua6fe꜀-\ua82e\ua830-\ua83eꡀ-\ua87e\ua880-\ua8de\ua8e0-\ua8fe꤀-\ua97e\ua980-\ua9deꨀ-\uaa7e\uaa80-\uaade\uaae0-\uaafe\uab00-\uab2e\uabc0-\uabfe가-\ud7ae\ud7b0-\ud7fe\ud806-\ud807\ud80a-\ud80b\ud80e-\ud819\ud81c-\ud82b\ud82d-\ud833\ud836-\ud83a\ud83e-\ud83f\ud86f-\ud87d\ud87f-\udb3f\udb41-\udb7f\udc00-\ufafeﬀ-\ufdfe\ufe00-\ufe1e\ufe20-\ufe2e︰-\ufe6eﹰ-￮\ufff0-\ufffe]|[\ud80c\ud835\ud840-\ud868\ud86a-\ud86c\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udc00-\udc7e\udc80-\udcfe\udd00-\udd8e\udd90-\uddce\uddd0-\uddfe\ude80-\ude9e\udea0-\udede\udf00-\udf2e\udf30-\udf4e\udf80-\udfde]|\ud801[\udc00-\udc4e\udc50-\udcae]|\ud802[\udc00-\udc5e\udd00-\udd3f\udd80-\udd9e\udda0-\uddfe\ude00-\ude5e\ude60-\ude7e\udf00-\udf3e\udf40-\udf5e\udf60-\udf7e]|\ud803[\udc00-\udc4e\ude60-\ude7e]|\ud804[\udc00-\udc7e\udc80-\udcce\udcd0-\udcfe\udd00-\udd4e\udd80-\uddde]|\ud805[\ude80-\udece]|\ud808[\udc00-\udffe]|\ud809[\udc00-\udc7e]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude3e]|\ud81b[\udf00-\udf9e]|\ud82c[\udc00-\udcfe]|\ud834[\udc00-\udcfe\udd00-\uddfe\ude00-\ude4e\udf00-\udf5e\udf60-\udf7e]|\ud83b[\ude00-\udefe]|\ud83c[\udc00-\udc2e\udc30-\udc9e\udca0-\udcfe\udd00-\uddfe\ude00-\udefe\udf00-\udfff]|\ud83d[\udc00-\uddfe\ude00-\ude4e\ude80-\udefe\udf00-\udf7e]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]|\udb40[\udc00-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffe]|\udbff[\udc00-\udffe]|[\ud800-\ud805\ud808-\ud809\ud80c-\ud80d\ud81a-\ud81b\ud82c\ud834-\ud835\ud83b-\ud83d\ud840-\ud86e\ud87e\udb40\udb80-\udbff]/g;
                let messageEnglishCharactersOnly = messageTrimmed.replace(exp, "")
                
                let newSentance = ""
                let singleWords = messageEnglishCharactersOnly.split(" ")
                singleWords.forEach(word => {
                    let isMisspelled = SpellChecker.isMisspelled(word)
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

                if(firstPass.length > 0) {

                    let thirdPass = filter.cleanHacked(firstPass)

                    this.instance.messageAll(new Notification(thirdPass, 'text', command.x, command.y))

                }
                
            }

        })

        this.instance.on('command::FireCommand', ({ command, client, tick }) => {
            
        })
    }

   
    async addIdentity(doc, creds, command) {

        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo(); 

        const guestBook = doc.sheetsByIndex[0]; 
        let joinTime = Date.now();
        
        guestBook.headerValues = ['name', 'avatar', 'color', 'joined']

        await guestBook.addRow({ 
            name: ''+command.name+'', 
            avatar: ''+command.avatar+'', 
            color: ''+command.color+'',
            joined: ''+joinTime+''
        });

        
    }

    joinSession(command, client, doc, creds, login) {

            if(login == false) {
                this.addIdentity(doc, creds, command)
            }

            const name = command.name
            

            //remove duplicate characters over 2
            let nameTrimmed = name.replace(/(.)\1{2,}/g, '$1$1')

            //the regex motherlode 
            var exp = /[\u0000-\u001f-[-`{-þĀ-žƀ-Ɏɐ-ʮʰ-ϾЀ-ӾԀ-\u052e\u0530-\u058e\u0590-\u05fe\u0600-\u07be߀-\u07fe\u0800-\u083e\u0840-\u085e\u08a0-\u08fe\u0900-\u09fe\u0a00-\u0a7e\u0a80-\u0afe\u0b00-\u0b7e\u0b80-\u0bfe\u0c00-\u0cfe\u0d00-\u0dfe\u0e00-\u0e7e\u0e80-\u0efeༀ-\u0ffeက-\u10feᄀ-\u11feሀ-\u137eᎀ-\u139eᎠ-\u13fe\u1400-\u167e\u1680-\u169eᚠ-\u16feᜀ-\u171eᜠ-\u173eᝀ-\u175eᝠ-\u177eក-\u17fe᠀-\u18ae\u18b0-\u18feᤀ-\u197eᦀ-\u1aae\u1b00-\u1b7e\u1b80-\u1bbe\u1bc0-\u1bfeᰀ-᱿\u1cc0-\u1cce\u1cd0-\u1cfeᴀ-ᵾᶀ-Ỿἀ-῾\u2000-\u209e₠-\u20ce\u20d0-\u20fe℀-\u218e←-\u23fe␀-\u243e⑀-\u245e①-\u26fe\u2700-➾⟀-\u2bfeⰀ-ⱞⱠ-\u2c7eⲀ-\u2d2eⴰ-\u2d7eⶀ-ⷞ\u2de0-\u2e7e⺀-\u2efe⼀-\u2fde⿰-\u2ffe\u3000-\u312e\u3130-ㆎ㆐-\u31be㇀-\u31eeㇰ-㋾㌀-\u4dbe䷀-\u9ffeꀀ-\ua48e꒐-\ua4ce\ua4d0-\ua4feꔀ-\ua63eꙀ-\ua69e\ua6a0-\ua6fe꜀-\ua82e\ua830-\ua83eꡀ-\ua87e\ua880-\ua8de\ua8e0-\ua8fe꤀-\ua97e\ua980-\ua9deꨀ-\uaa7e\uaa80-\uaade\uaae0-\uaafe\uab00-\uab2e\uabc0-\uabfe가-\ud7ae\ud7b0-\ud7fe\ud806-\ud807\ud80a-\ud80b\ud80e-\ud819\ud81c-\ud82b\ud82d-\ud833\ud836-\ud83a\ud83e-\ud83f\ud86f-\ud87d\ud87f-\udb3f\udb41-\udb7f\udc00-\ufafeﬀ-\ufdfe\ufe00-\ufe1e\ufe20-\ufe2e︰-\ufe6eﹰ-￮\ufff0-\ufffe]|[\ud80c\ud835\ud840-\ud868\ud86a-\ud86c\udb80-\udbbe\udbc0-\udbfe][\udc00-\udfff]|\ud800[\udc00-\udc7e\udc80-\udcfe\udd00-\udd8e\udd90-\uddce\uddd0-\uddfe\ude80-\ude9e\udea0-\udede\udf00-\udf2e\udf30-\udf4e\udf80-\udfde]|\ud801[\udc00-\udc4e\udc50-\udcae]|\ud802[\udc00-\udc5e\udd00-\udd3f\udd80-\udd9e\udda0-\uddfe\ude00-\ude5e\ude60-\ude7e\udf00-\udf3e\udf40-\udf5e\udf60-\udf7e]|\ud803[\udc00-\udc4e\ude60-\ude7e]|\ud804[\udc00-\udc7e\udc80-\udcce\udcd0-\udcfe\udd00-\udd4e\udd80-\uddde]|\ud805[\ude80-\udece]|\ud808[\udc00-\udffe]|\ud809[\udc00-\udc7e]|\ud80d[\udc00-\udc2e]|\ud81a[\udc00-\ude3e]|\ud81b[\udf00-\udf9e]|\ud82c[\udc00-\udcfe]|\ud834[\udc00-\udcfe\udd00-\uddfe\ude00-\ude4e\udf00-\udf5e\udf60-\udf7e]|\ud83b[\ude00-\udefe]|\ud83c[\udc00-\udc2e\udc30-\udc9e\udca0-\udcfe\udd00-\uddfe\ude00-\udefe\udf00-\udfff]|\ud83d[\udc00-\uddfe\ude00-\ude4e\ude80-\udefe\udf00-\udf7e]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]|\ud87e[\udc00-\ude1e]|\udb40[\udc00-\udc7f\udd00-\uddef]|\udbbf[\udc00-\udffe]|\udbff[\udc00-\udffe]|[\ud800-\ud805\ud808-\ud809\ud80c-\ud80d\ud81a-\ud81b\ud82c\ud834-\ud835\ud83b-\ud83d\ud840-\ud86e\ud87e\udb40\udb80-\udbff]/g;
            let nameEnglishCharactersOnly = nameTrimmed.replace(exp, "")
            
            let newName = ""
            let singleName = nameEnglishCharactersOnly.split(" ")
            singleName.forEach(word => {
                let isMisspelled = SpellChecker.isMisspelled(word)
                if(isMisspelled) {
                    let replacementWord = SpellChecker.getCorrectionsForMisspelling(word)
                    if(replacementWord[0]) {
                        newName += " "+replacementWord[0]
                    } else {
                        newName += " ???"
                    }
                } else {
                    if(word == "rape") {
                        newName += " ****"
                    } else {
                        newName += " "+word
                    }
                }
            })
            let givenName = newName.substring(1);
            //console.log("name:"+givenName)
            givenName = swearjar.censor(givenName);

            const rawEntity = new PlayerCharacter({ self: true, avatar: ""+command.avatar+"", color: ""+command.color+"" })
            const smoothEntity = new PlayerCharacter({ self: false, avatar: ""+command.avatar+"", color: ""+command.color+"" })

            rawEntity.client = client
            client.rawEntity = rawEntity
            
            smoothEntity.client = client
            client.smoothEntity = smoothEntity

            client.sleepTimer = 1

            const peerID = client.peerID;

            let spawnX = 2253
            let spawnY = 1269

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

             
            smoothEntity.name = givenName
            rawEntity.name = givenName
            client.name = givenName

            smoothEntity.avatar = command.avatar
            rawEntity.avatar = command.avatar
            client.avatar = command.avatar

            smoothEntity.color = command.color
            rawEntity.color = command.color
            client.color = command.color

            smoothEntity.isAlive = true;
            rawEntity.isAlive = true;
            
            
            this.instance.message(new Identity(rawEntity.nid, smoothEntity.nid, ""+peerID+"", ""+ command.avatar +"",""+ givenName +"", ""+ command.color +""), client)
            this.instance.messageAll(new Notification(''+ command.name +'', 'personJoined', 20, 20))

            this.totalUsers++
            this.activeUsers.push({name: command.name})

            
    }
    update(delta, tick, now) {
        this.instance.emitCommands()

        this.instance.clients.forEach(client => {

            if(client.rawEntity) {
                
                if(!client.rawEntity.headphones) {
                    client.view.x = client.rawEntity.x
                    client.view.y = client.rawEntity.y
                    
                    client.rawEntity.body.position[0] = client.rawEntity.x
                    client.rawEntity.body.position[1] = client.rawEntity.y
    
                    client.rawEntity.body.angle = client.rawEntity.rotation
                    client.sleepTimer++

                } else {

                }

                if(client.sleepTimer > 60) {
                    //client.rawEntity.sleeping = true
                    client.smoothEntity.sleeping = true
                }
                
               
            }
            
            const smoothEntity = client.smoothEntity
            if (smoothEntity) {
                const maximumMovementPerFrameInPixels = 410 * delta
                followPath(smoothEntity, client.positions, maximumMovementPerFrameInPixels)
            }

            //console.log(client.sleepTimer)

        })

        //Start Art
        this.instance.clients.forEach(client => {

            let touching = false

            for (let artwork of this.artworks.values()) {

               if(client.rawEntity) {

                   let collided = false

                   if(artwork.collider.polygon) {
                        collided = SAT.testCirclePolygon(client.rawEntity.collider.circle, artwork.collider.polygon) 
                   } else {
                        collided = SAT.testCircleCircle(client.rawEntity.collider.circle, artwork.collider.circle) 
                   }
                   
                   
                   if(collided == true) {

                        let directionVertical, directionHorizontal

                        if(client.rawEntity.x < artwork.x - artwork.width/2) {
                            directionHorizontal = 1
                        } else if (client.rawEntity.x > artwork.x + artwork.width/2) {
                            directionHorizontal = 2
                        } 

                        if(client.rawEntity.y < artwork.y - artwork.height/2) {
                            directionVertical = 1
                        } else if (client.rawEntity.y > (artwork.y + artwork.height/2)) {
                            directionVertical = 2
                        } 

                        
                        this.instance.message(new Notification(artwork.name, 'showStartArtButton', directionHorizontal, directionVertical), client)
                    
                        touching = true

                        break

                   } else {
                        
                   }
          
               }

           }

           if(touching == false) {
            this.instance.message(new Notification("uo!", 'hideStartArtButton'), client)
          }


       })
        

        this.world.step(1/20);

        

        this.artworks.forEach(artwork => {
            
            artwork.x = artwork.body.position[0]
            artwork.y = artwork.body.position[1]
            artwork.rotation = artwork.body.angle 
            
            
        })

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
        

        
        this.timeDebounceTimer++
        if(this.timeDebounceTimer > 20) {
            this.instance.messageAll(new Notification(""+(this.world.time.toFixed())+"", 'worldInfoTime'))
            this.instance.messageAll(new Notification(""+this.totalUsers+"", 'worldInfoTotalUsers'))
            this.instance.messageAll(new Notification(""+this.activeUsers.length+"", 'worldInfoActiveUsers'))
            this.timeDebounceTimer = 0
        }
        

        this.instance.update()
    }
}

export default GameInstance
