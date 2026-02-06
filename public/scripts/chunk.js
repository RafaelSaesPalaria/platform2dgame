import { getBlock } from "./block/blockHandler.js"
import { Velocity } from "./entities.js"
import { Sappling } from "./EntityBlock/sappling.js"
import { checkCollision, getDistance } from "./utils.js"
import { Screen } from "./view/screen.js"
import { Camera } from "./view/camera.js"
import { Level } from "./level.js"

export class GenerateChunk {
    static seed = 0
    static createSpace() {
        this.rows = []
        for (let r = 0; r < Level.chunkSize.h; r ++) {
            let row = []
            for (let l = 0; l < Level.chunkSize.w; l++) {
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
        this.w = Level.chunkSize.w*Level.blockSize
        this.h = Level.chunkSize.h*Level.blockSize
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
        if (block.id === "sappling") {
            block = new Sappling(this,id,x,y)
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
        return {x:chunkX*Level.blockSize+c.x,y:chunkY*Level.blockSize+c.y}
    }
    static forEachBlock(c, func) {
        c.rows.forEach(r => {
            r.forEach(b => {
                func(b)
            })
        })
    }
    // WorldCoords
    getBlockOnCoords(worldX,worldY) {
        let pos = getDistance({x:worldX,y:worldY},this)
        pos.x = Math.floor(pos.x/Level.blockSize)
        pos.y = Math.floor(pos.y/Level.blockSize)
        return this.getBlock(pos.x,pos.y)
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
            Screen.drawBlock(b.id,b.x*Level.blockSize+this.x,b.y*Level.blockSize+this.y,Level.blockSize,Level.blockSize)
        })
        //Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}