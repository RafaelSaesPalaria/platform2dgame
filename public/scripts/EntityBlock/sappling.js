import { Level } from "../level.js"
import { Tree } from "../structures/tree.js"
import { EntityBlock } from "./components.js"

export class Sappling extends EntityBlock {
    constructor(id,x,y) {
        super(id,x,y)
        this.timeLeft = 200
        this.getChunk().entityBlocks.push(this)
    }
    getChunk() {
        return Level.chunks[Math.floor(this.x/Level.blockSize)]
    }
    update() {
        this.timeLeft-=1
        if (this.timeLeft<0) {
            Tree.create(this.x,this.y)
            this.getChunk().removeEntity(this)
        }
    }
}