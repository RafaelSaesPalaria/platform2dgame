import { Level } from "../level.js"

export class EntityBlock {
    constructor(id,worldX,worldY) {
        this.id = id
        this.worldX = worldX
        this.worldY =worldY
    }
    getChunk() {
        return Level.chunks[Math.floor(this.worldX/Level.blockSize)]
    }
    right_click() {
        
    }
    update() {

    }
}
