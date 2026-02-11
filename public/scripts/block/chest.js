import { InventoryUI } from "../ui/inventory.js"
import { UIHandler } from "../ui/uiHandler.js"
import { Inventory } from "../user.js"
import { Block } from "./block.js"

export class Chest extends Block {
    constructor(id,x,y) {
        super(id,x,y)
        this.open = false
        this.ui = null
        this.inventory = new Inventory(9,3)
    }
    right_click() {
        this.open=!this.open
        if (this.open) {
            this.ui = new InventoryUI(this.inventory,250,170,250,83)
            UIHandler.addUI(this.ui,"inventoryUI")
        } else {
            UIHandler.removeUI(this.ui)
        }
    }
}