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
        for (let r = 0; r < chunkSize; r ++) {
            let row = []
            for (let l = 0; l < chunkSize; l++) {
                let line = []
                for (let b = 0; b < chunkSize; b++) {
                    let b = new Block("dirt",l,r)
                    line.push(b)
                }
                row.push(line)
            }
            this.rows.push(row)
        }
        console.log(this.rows)
    }
    collision(obj) {
        console.log("Chunk Collision")
        this.rows.forEach((r,ri) => {
            if (checkCollision(obj,{y:ri*blockSize+this.y,
                w:chunkSize*blockSize,h:chunkSize*blockSize,x:this.x})) {
                    console.log("Row Collision")
                    r.forEach((l,li) => {
                    if (checkCollision(obj,{x:li*blockSize+this.x,y:ri*blockSize+this.y,w:chunkSize*blockSize,h:chunkSize*blockSize})) {
                        console.log("Line Collision")
                        l.forEach(b => {
                            if (checkCollision(obj,{x:b.x*blockSize+this.x,y:b.y*blockSize+this.y,w:blockSize,h:blockSize})) {
                                b.id = "grass"
                            }
                        })
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
            r.forEach(l => {
                l.forEach(b => {
                    drawBlock(b.id,b.x*blockSize+this.x,b.y*blockSize+this.y,blockSize,blockSize)
                })
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