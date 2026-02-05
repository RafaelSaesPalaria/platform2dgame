import { getBlock } from "./block/blockHandler.js"
import { Velocity } from "./entities.js"
import { Sapling } from "./EntityBlock/sapling.js"
import { checkCollision, getDistance } from "./utils.js"
import { Screen } from "./view/screen.js"
import { Camera } from "./view/camera.js"

const blockSize = 16
const chunkSize = {w: 16,h: 250}

export function getBlockSize() {
    return blockSize
}

export function getChunkSize() {
    return chunkSize
}

export class GenerateChunk {
    static seed = 0
    static createSpace() {
        this.rows = []
        for (let r = 0; r < chunkSize.h; r ++) {
            let row = []
            for (let l = 0; l < chunkSize.w; l++) {
                let b = new Block("air",l,r)
                row.push(b)
            }
            this.rows.push(row)
        }
        return this.rows
    }
    static normal (chunk) {

    }
    static flatLand() {
        this.rows = this.createSpace()
        Chunk.forEachBlock(this,(b) => {
            if (b.y===100) {
                b.id = "grass"
            } else if (b.y>100 & b.y<=130) {
                b.id = "dirt"
            } else if (b.y>130) {
                b.id = "stone"
            }
        })
        return this.rows
    }
    static custom(chunk, ...settings) {

    }
}

export class Block {    
    constructor(id,x,y) {
        this.id = id;
        this.x = x
        this.y = y
    }
}

export class Chunk {
    constructor() {
        this.chunkId = 0 // NOT USED YET
        this.dx = 0
        this.dy = 0
        this.x = 0
        this.y = 0
        this.w = chunkSize.w*blockSize
        this.h = chunkSize.h*blockSize
        this.count = 0
        this.rows = GenerateChunk.flatLand()
        this.entityBlocks = []
    }
    removeEntity(e) {
        this.entityBlocks = this.entityBlocks.filter(i => i!==e)
    }
    hasBlock(x,y) {
        if (this.rows.length>y & y>=0) {
            return (this.rows[y].length>x & x>=0)
        }
    }
    setBlock(id,x,y) {
        let block = new Block(id,x,y)
        this.rows[y][x] = block
        if (block.id === "sapling") {
            block = new Sapling(this,id,x,y)
            this.entityBlocks.push(block)
        }
    }
    // ChunkRelative Coords
    getBlock(x,y) {
        if (this.hasBlock(x,y)) {
            return this.rows[y][x]
        }
    }
    static getWorldRelativeCoords(c,chunkX,chunkY) {
        return {x:chunkX*blockSize+c.x,y:chunkY*blockSize+c.y}
    }
    static forEachBlock(c, func) {
        c.rows.forEach(r => {
            r.forEach(b => {
                func(b)
            })
        })
    }
    // WorldCoords
    getBlockOnCoords(x,y) {
        let pos = getDistance({x:x,y:y},this)
        pos.x = Math.floor(pos.x/blockSize)
        pos.y = Math.floor(pos.y/blockSize)
        return this.getBlock(pos.x,pos.y)
    }
    getCollidedBlocks(obj) {
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
    update() {
        this.entityBlocks.forEach(e => {
            e.update()
        })
        Velocity.apply(this)
        this.draw()
    }
    draw() {
        Chunk.forEachBlock(this,(b) => {
            Screen.drawBlock(b.id,b.x*blockSize+this.x,b.y*blockSize+this.y,blockSize,blockSize)
        })
        //Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}