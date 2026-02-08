import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

export class InventoryUI extends UI {
    constructor(inventory,x,y,w,h) {
        super(x,y,w,h)
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
            StaticScreen.drawImage("ui-slot",x,y,slotSize.w,slotSize.h)
            if (item) {
                StaticScreen.drawImage(
                    item.id,
                    x+slotSize.w/4,
                    y+slotSize.h/4,
                    slotSize.w/2,
                    slotSize.h/2
                )
                StaticScreen.write(item.qnt,"white",slotSize.w/3,x+slotSize.w/4,y+(slotSize.h/4)*3)
            }
        }
    }
}