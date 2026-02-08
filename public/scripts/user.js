import { getObj } from "./block/blockHandler.js"
import { InventoryUI } from "./ui/inventory.js"
import { UIHandler } from "./ui/uiHandler.js"

export class Inventory {
    constructor(slotX,slotY) {
        this.slotX = slotX // Amount of vertical slots
        this.slotY = slotY // Amount of horizontal slots
        this.inventory = []
    }
    validAmount(a) {
        return (a>=0)
    }
    validID(id) {
        return getObj(id) !== undefined
    }
    addItem(id,qnt) {
        if (this.validID(id) && this.validAmount(qnt)) {
            let item = (this.inventory.find(i => i.id === id))
            if (item && item!==null) {
                item.qnt+=qnt
            } else {
                this.inventory.push({id,qnt})
            }
        }
    }
    removeItem(id,qnt) {
        let item = (this.inventory.find(i => i.id === id))
        item.qnt-=qnt
        if (item.qnt<=0) {
            this.inventory = this.inventory.filter(s => {return s.qnt>0
            })
        }
    }
}

export class User {
    static inventory = new Inventory(9,4)
    static inventoryOpen = false
    static selectedItemIndex = 0
    static selectedBlock = null
    static player = {}

    static isChatOpen = false
    static isWriting = false
    static inventoryUI = null

    static openInventory() {
        let slotSize = 30
        console.log(User.inventory.slotX*30)
        User.inventoryUI = new InventoryUI(User.inventory,250,280,(slotSize*User.inventory.slotX),(slotSize*User.inventory.slotY))
        UIHandler.addUI(User.inventoryUI,"inventoryUI")
    }
    static closeInventory() {
        UIHandler.removeUI(User.inventoryUI)
    }
    static getInventory() {
        return this.inventory.inventory
    }
    static getHotbar() {
        return this.inventory.inventory.slice(0,9)
    }
    static getSelectedItem() {
        return this.inventory.inventory[this.selectedItemIndex]
    }
    static moveSelectedIndex(delta) {
        if(delta>=0) {
            User.selectedItemIndex+=1
            if (User.selectedItemIndex>=9) {
                User.selectedItemIndex=0
            }
        } else {
            User.selectedItemIndex-=1
            if (User.selectedItemIndex<0) {
                User.selectedItemIndex=8
            }
        }
    }

    static addItem(id,qnt) {
        this.inventory.addItem(id,qnt)
    }
    static removeItem(id,qnt) {
        this.inventory.removeItem(id,qnt)
    }
}