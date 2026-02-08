import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

export class InventoryUI extends UI {
    constructor(inventory,x,y) {
        super(x,y,30*inventory.slotX,30*inventory.slotY)
        this.inventory = inventory
    }
    update() {
        this.draw()
    }
    draw() {
        StaticScreen.drawImage("ui-background",this.x,this.y,this.w,this.h)
        let slotSize = {w:this.w/this.inventory.slotX,h:this.h/this.inventory.slotY}
        for (let i = 0; i < this.inventory.slotX*this.inventory.slotY; i++) {
            let x = this.x+((i%this.inventory.slotX)*slotSize.w)
            let y = this.y+(Math.floor(i/this.inventory.slotX))
            *slotSize.h
            let item = this.inventory.inventory[i]
            StaticScreen.drawImage("ui-slot",x,y,slotSize.w+1,slotSize.h+1)
            if (item) {
                StaticScreen.drawImage(item.id,x+12,y+12,30,30)
                StaticScreen.write(item.qnt,"white",20,x+12,y+42)
            }
        }
    }
}