import { Tree } from "../structures/tree.js"
import { EntityBlock } from "./components.js"

export class Sappling extends EntityBlock {
    constructor(c,id,x,y) {
        super(id,x,y)
        this.c = c
        this.timeLeft = 200
    }
    update() {
        this.timeLeft-=1
        if (this.timeLeft<0) {
            Tree.create(this.x,this.y)
            this.c.removeEntity(this)
        }
    }
}