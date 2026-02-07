import { Tree } from "../structures/tree.js"
import { EntityBlock } from "./components.js"

export class Sappling extends EntityBlock {
    constructor(id,worldX,worldY) {
        super(id,worldX,worldY)
        this.timeLeft = 200
        this.getChunk().entityBlocks.push(this)
    }
    update() {
        this.timeLeft-=1
        if (this.timeLeft<0) {
            Tree.create(this.worldX,this.worldY)
            this.getChunk().removeEntity(this)
        }
    }
}