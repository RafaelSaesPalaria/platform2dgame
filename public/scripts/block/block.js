export class Block {    
    constructor(id,worldX, worldY) {
        this.id = id;
        this.worldX = worldX
        this.worldY = worldY
    }
    right_click() {
        console.log("Right click on block")
    }
}