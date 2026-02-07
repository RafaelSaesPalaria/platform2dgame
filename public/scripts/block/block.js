import { Level } from "../level.js";

export class Block {    
    constructor(id,worldX, worldY) {
        this.id = id;
        this.worldX = worldX
        this.worldY = worldY
    }
    getChunk() {
        return Level.chunks[Math.floor(this.worldX/Level.blockSize)]
    }
    right_click() {
        console.log("Right click on block")
    }
}