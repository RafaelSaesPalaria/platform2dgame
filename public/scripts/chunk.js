import { drawBlock, drawRect } from "./canvas.js"
import { Velocity } from "./entities.js"
import { checkCollision } from "./utils.js"

const blockSize = 16
const chunkSize = 10

export function getBlockSize() {
    return blockSize
}

export function getChunkSize() {
    return chunkSize
}

export class Chunk {
    constructor() {
        this.chunkId = 0
        this.dx = 0
        this.dy = 0
        this.x = 0
        this.y = 0
        this.w = chunkSize*blockSize
        this.h = chunkSize*blockSize
        this.rows = []
        this.count = 0
        for (let r = 0; r < chunkSize; r ++) {
            let row = []
            for (let l = 0; l < chunkSize; l++) {
                let b = new Block("air",l,r)
                row.push(b)
            }
            this.rows.push(row)
        }
    }
    hasBlock(x,y) {
        if (this.rows.length>y & y>=0) {
            return (this.rows[y].length>x & x>=0)
        }
    }
    setBlock(block,x,y) {
        this.rows[y][x] = block
    }
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
    collision(obj) {
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
}
    update() {
        Velocity.apply(this)
        this.draw()
    }
    draw() {
        this.forEachBlock((b) => {
            drawBlock(b.id,b.x*blockSize+this.x,b.y*blockSize+this.y,blockSize,blockSize)
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