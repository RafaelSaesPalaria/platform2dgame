import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"
import { ItemUI } from "./item.js"
import { UIHandler } from "./uiHandler.js"

export class InventoryUI extends UI {
    constructor(inventory,x,y,w,h) {
        super(x,y,w,h)
        this.inventory = inventory
        this.item_uis = []
    }
    update() {
        this.draw()
    }
    draw() {
        StaticScreen.drawImage("ui-background",this.x,this.y,this.w,this.h)
        let slotSize = {w:this.w/this.inventory.slotX,h:this.h/this.inventory.slotY}
        for (let i = 0; i < this.inventory.slotX*this.inventory.slotY; i++) {
            let item = this.inventory.inventory[i]
            let x = this.x+((i%this.inventory.slotX)*slotSize.w)
            let y = this.y+(Math.floor(i/this.inventory.slotX))
            *slotSize.h
            
            StaticScreen.drawImage("ui-slot",x,y,slotSize.w,slotSize.h)
            if (item) {
                let it = new ItemUI(this,item.id,
                    item.qnt,
                     this.x+((item.slot%this.inventory.slotX)*slotSize.w)+slotSize.w/4,
                    this.y+(Math.floor(item.slot/this.inventory.slotX))+slotSize.h/4,
                    slotSize.w/2,
                    slotSize.h/2)

                if (this.item_uis.length<this.inventory.slotX*this.inventory.slotY) {
                    console.log("itemui added")
                    UIHandler.addUI(it,"ItemUI",this)
                    this.item_uis.push(it)
                }
                /*StaticScreen.drawImage(
                    item.id,
                    x+slotSize.w/4,
                    y+slotSize.h/4,
                    slotSize.w/2,
                    slotSize.h/2
                )
                StaticScreen.write(item.qnt,"white",slotSize.w/3,x+slotSize.w/4,y+(slotSize.h/4)*3)*/
            }
        }
    }
}