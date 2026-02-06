import { getObj } from "./block/blockHandler.js"

export class User {
    static Inventory = []
    static inventoryOpen = false
    static selectedItemIndex = 0
    static selectedBlock = null

    static isChatOpen = false
    static isWriting = false

    static getInventory() {
        return User.Inventory
    }
    static getHotbar() {
        return User.Inventory.slice(0,9)
    }
    static getSelectedItem() {
        return this.Inventory[this.selectedItemIndex]
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

    static validAmount(a) {
        return (a>=0)
    }
    static validID(id) {
        return getObj(id) !== undefined
    }
    static addItem(id,qnt) {
        if (this.validID(id) && this.validAmount(qnt)) {
            let item = (this.Inventory.find(i => i.id === id))
            if (item && item!==null) {
                item.qnt+=qnt
            } else {
                this.Inventory.push({id,qnt})
            }
        }
    }
    static removeItem(id,qnt) {
        let item = (this.Inventory.find(i => i.id === id))
        item.qnt-=qnt
        if (item.qnt<=0) {
            this.Inventory = this.Inventory.filter(s => {return s.qnt>0
            })
        }
    }
}