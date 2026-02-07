import { Block, Chunk } from "./chunk.js"
import { Item, Player } from "./entities.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./view/ui.js"
import { User } from "./user.js"
import {Screen } from './view/screen.js'
import { Camera } from "./view/camera.js"
import { getDistance } from "./utils.js"
import { Background } from "./view/background/background.js"
updateUIs

let levelSize = {width : 785, height : 515}

export class Level {
    static entities = []
    static chunks = []
    static blockSize = 16
    static chunkSize = {w: 16,h: 250}
    static gameTime = 0
    static day = 100
    static addEntity(e) {
        this.entities.push(e)
    }
    static getEntities(type) {
        return this.entities.filter(e => e.constructor.name==type)
    }
    static removeEntity(entity) {
        this.entities = this.entities.filter(e => e!=entity)
    }
    static hasBlock(blockX,blockY) {
        return ((blockX>=0 & blockY>=0) &
        (blockX<=this.chunkSize.w*9 & blockY<=this.chunkSize.h))
    }
    static setBlock(id,blockX,blockY) {
        if (this.hasBlock(blockX,blockY)) {
            let chunkIndex = Math.floor(blockX/this.chunkSize.w)
            let chunkX = (blockX%this.chunkSize.w)
            let chunkY = blockY

            Level.chunks[chunkIndex].setBlock(id,chunkX,chunkY)
        }
    }
    static getWorldRelativeCoords(worldX,worldY) {
        let pos = getDistance({x:worldX,y:worldY},{x:0,y:0})
        //return this.getBlock(pos.x,pos.y)
        pos.x = Math.floor(pos.x/Level.blockSize)
        pos.y = Math.floor(pos.y/Level.blockSize)
        return {worldX:pos.x,worldY:pos.y}
    }
    static getBlock(worldX,worldY) {
        let pos = this.getWorldRelativeCoords(worldX,worldY)
        let chunkIndex = Math.floor(pos.worldX/Level.chunkSize.w*Level.blockSize)
        let chunkX = Math.floor(worldX%Level.chunkSize.w)
        return this.chunks[chunkIndex].getBlock(chunkX,worldY)
    }
    static create() {

    }
    static fill(id,x,y,x2,y2) {
        let xmin = Math.min(x,x2)
        let ymin = Math.min(y,y2)
        let xmax = Math.max(x,x2)
        let ymax = Math.max(y,y2)
        for (let xc = xmin ; xc < xmax; xc++) {
            for (let yc = ymin; yc < ymax; yc++) {
                console.log(xc,yc)
                Level.setBlock(id,xc,yc)
            }
        }
    }
    static getBlockOnCoords(worldX,worldY) {
        let pos = this.getWorldRelativeCoords(worldX,worldY)
        return Level.getBlock(pos.worldX,pos.worldY)
        //chunks[]
    }
    static getCollidedBlocks(obj) {
        let b = this.getBlockOnCoords(obj.x,obj.y)
        let collidedBlocks = []
            
        //Math.floor(getDistance(obj,this).x/blockSize)
        for (let blockWidth = obj.x ;
            blockWidth < obj.x + obj.w ;
            blockWidth+=Level.blockSize) {
            for (let blockHeight = obj.y;
                blockHeight < obj.y + obj.h ;
                blockHeight+=Level.blockSize) {
                let block = this.getBlockOnCoords(blockWidth,blockHeight)

                Screen.drawRect(blockWidth,blockHeight,5,5,"blue")
                if (block!==undefined) {
                    collidedBlocks.push(block)
                            //}
                }
            }
        }
        return collidedBlocks
    }
}

export function getLevelSize() {
    return levelSize
}

function initRegion() {
    for (let i = 0; i < 9 ; i ++) {
        let c = new Chunk(i*Level.blockSize*Level.chunkSize.w,0)
        Level.chunks.push(c)
    }
}

export function init() {
    let p = new Player(392,1259,20,20)
    User.player = p
    Level.addEntity(p)
    
    initRegion()
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    Level.gameTime+=0.01
    Screen.erase()
    Background.draw()

    Level.chunks.forEach(c => {
        c.update()
    })

    Level.entities.forEach(e => {
        e.update()
    })

    // UIs
    Screen.drawRect(mouse.x,mouse.y,4,4,"purple")
    Screen.drawHitbox(-Camera.offset.x,-Camera.offset.y,Camera.size.w,Camera.size.h)

    let b = User.selectedBlock
    if (b) {
        Screen.drawHitbox((b.worldX*Level.blockSize),(b.worldY*Level.blockSize),b.w,b.h)
    }
    
    Camera.updateOffset()
    Camera.updateFocus()
    updateUIs()

    if (mouse.isDown) {
        right_click()
    }

}