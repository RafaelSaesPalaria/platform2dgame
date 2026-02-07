import { Inventory } from "../user.js"
import { StaticScreen } from "../view/screen.js"
import { addUI, inventoryUI, removeUI } from "../view/ui.js"
import { Block } from "./block.js"

export class Chest extends Block {
    constructor(x,y) {
        super("chest",x,y)
        this.open = false
        this.ui = null
        this.inventory = new Inventory(9,3)
    }
    right_click() {
        this.open=!this.open
        if (this.open) {
            this.ui = new inventoryUI(this.inventory,250,170)
            addUI(this.ui,"inventoryUI")
        } else {
            removeUI(this.ui)
        }
    }
}