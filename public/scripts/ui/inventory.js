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
    addItem(id,qnt,slot) {
        let slotSize = {w:this.w/this.inventory.slotX,h:this.h/this.inventory.slotY}

        let it = new ItemUI(this,id,qnt,slot,
        this.x+((slot%this.inventory.slotX)*slotSize.w)+slotSize.w/4,
        this.y+(Math.floor(slot/this.inventory.slotX))*(slotSize.w)+slotSize.h/4,
                    slotSize.w/2,
                    slotSize.h/2)
        UIHandler.addUI(it,"ItemUI",this)
        this.item_uis.push(it)
    }
    slotOnCoords(x,y) {
        let slotSize = {w:this.w/this.inventory.slotX,h:this.h/this.inventory.slotY}

        let slotX = (Math.floor((x-this.x)/slotSize.w))
        let slotY = (Math.floor((y-this.y)/slotSize.h))
        let slot = slotX+(slotY*(this.w/slotSize.w))
        return slot
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
               
                
                if (this.item_uis.length<this.inventory.inventory.length) {
                    this.addItem(item.id,item.qnt,item.slot)
                    
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