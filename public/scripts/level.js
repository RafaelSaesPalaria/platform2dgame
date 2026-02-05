import { Chunk } from "./chunk.js"
import { Item, Player } from "./entities.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./view/ui.js"
import { User } from "./user.js"
import {Screen } from './view/screen.js'
import { Camera } from "./view/camera.js"
updateUIs

let levelSize = {width : 785, height : 515}

export class Level {
    static entities = []
    static chunks = []
    static blockSize = 16
    static chunkSize = {w: 16,h: 250}
    static addEntity(e) {
        this.entities.push(e)
    }
    static getEntities(type) {
        return this.entities.filter(e => e.constructor.name==type)
    }
    static removeEntity(entity) {
        this.entities = this.entities.filter(e => e!=entity)
    }
    static setBlock(x,y) {

    }
    static getBlock(x,y) {

    }
    static create() {

    }
    static getCollidedBlocks(obj) {
        let b = this.getBlockOnCoords(obj.x,obj.y)
        let collidedBlocks = []
            
        //Math.floor(getDistance(obj,this).x/blockSize)
        for (let blockWidth = obj.x ;
            blockWidth < obj.x + obj.w ;
            blockWidth+=blockSize) {
            for (let blockHeight = obj.y;
                blockHeight < obj.y + obj.h ;
                blockHeight+=blockSize) {
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
    let c = new Chunk()
    for (let i = 0; i < 9 ; i ++) {
        let c = new Chunk()
        c.x = i*Level.blockSize*Level.chunkSize.w
        Level.chunks.push(c)
    }
}

export function init() {
    Level.addEntity(new Player(392,1259,20,20))
    initRegion()
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    Screen.erase()

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
        Screen.drawHitbox(b.x,b.y,b.w,b.h)
    }
    
    Camera.updateOffset()
    Camera.updateFocus()
    updateUIs()

    if (mouse.isDown) {
        right_click()
    }

}