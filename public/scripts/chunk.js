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
                let b = new Block("dirt",l,r)
                row.push(b)
            }
            this.rows.push(row)
        }
        console.log(this.count)
        console.log(this.rows)
    }
    getBlock(x,y) {
        console.log(this.rows[x][y])
        return this.rows[x][y][0]
    }
    collision(obj,func) {
        this.getBlock(3,5)
        console.log("Chunk Collision")
        this.rows.forEach((r,ri) => {
            if (checkCollision(obj,{y:ri*blockSize+this.y,
                w:chunkSize*blockSize,h:chunkSize*blockSize,x:this.x})) {
                    console.log("Row Collision")
                    r.forEach((b,) => {
                    if (checkCollision(obj,{x:b.x*blockSize+this.x,y:b.y*blockSize+this.y,w:blockSize,h:blockSize})) {
                        console.log("Line Collision")
                        func(b)
                    }
                })
            }
        })
    }
    update() {
        Velocity.apply(this)
        this.draw()
    }
    draw() {
        this.rows.forEach(r => {
            r.forEach(b => {
                drawBlock(b.id,b.x*blockSize+this.x,b.y*blockSize+this.y,blockSize,blockSize)
            })
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