import { getBlock } from "./block/blockHandler.js"
import { Screen } from "./canvas.js"
import { Velocity } from "./entities.js"
import { checkCollision, getDistance } from "./utils.js"

const blockSize = 16
const chunkSize = 10

export function getBlockSize() {
    return blockSize
}

export function getChunkSize() {
    return chunkSize
}

export class GenerateChunk {
    static seed = 0
    static normal (chunk) {

    }
    static flatLand() {
        this.rows = []
        for (let r = 0; r < chunkSize; r ++) {
            let row = []
            for (let l = 0; l < chunkSize; l++) {
                let b = new Block("air",l,r)
                if (r === chunkSize-1) {
                    b.id = "grass"
                }
                row.push(b)
            }
            this.rows.push(row)
        }
        return this.rows
    }
    static custom(chunk, ...settings) {

    }
}

export class Chunk {
    constructor() {
        this.chunkId = 0 // NOT USED YET
        this.dx = 0
        this.dy = 0
        this.x = 0
        this.y = 0
        this.w = chunkSize*blockSize
        this.h = chunkSize*blockSize
        this.count = 0
        this.rows = GenerateChunk.flatLand()
    }
    hasBlock(x,y) {
        if (this.rows.length>y & y>=0) {
            return (this.rows[y].length>x & x>=0)
        }
    }
    setBlock(block,x,y) {
        this.rows[y][x] = block
    }
    // ChunkRelative Coords
    getBlock(x,y) {
        if (this.hasBlock(x,y)) {
            return this.rows[y][x]
        }
    }
    forEachBlock(func) {
        this.rows.forEach(r => {
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

                    //console.log(obj.x,obj.y)
                    //console.log(b)
                    //console.log(blockWidth,blockHeight)
                    //console.log(block)
                    if (block!==undefined) {
                        /*console.log(checkCollision(obj,{x:blockWidth,y:blockHeight}))
                        if (checkCollision(obj,{x:blockWidth,y:blockHeight}) & getBlock(block.id).collide) {*/
                        collidedBlocks.push(block)
                        //}
                    }
            }
        }

        return collidedBlocks
    }
    //collision(obj) {
        /*return this.getCollidedBlocks(obj)
        for (let ri = 0; ri < this.rows.length; ri++) {
            const r = this.rows[ri]

            if (checkCollision(obj,{
                y:ri*blockSize+this.y,
                w:chunkSize*blockSize,
                h:chunkSize*blockSize,
                x:this.x
            })) {

            for (const b of r) {
                if (checkCollision(obj,{
                    x:b.x*blockSize+this.x,
                    y:b.y*blockSize+this.y,
                    w:blockSize,
                    h:blockSize
                })) {
                    return b
                }
            }
        }
    }
}*/
    update() {
        Velocity.apply(this)
        this.draw()
    }
    draw() {
        this.forEachBlock((b) => {
            Screen.drawBlock(b.id,b.x*blockSize+this.x,b.y*blockSize+this.y,blockSize,blockSize)
        })
    }
}

export class Block {
    constructor(id,x,y) {
        this.id = id;
        this.x = x
        this.y = y
    }
}