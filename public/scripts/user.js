export class User {
    static Inventory = []
    static inventoryOpen = false
    static selectedItemIndex = 0

    static getInventory() {
        return User.Inventory
    }
    static getHotbar() {
        return User.Inventory.slice(0,9)
    }

    static addItem(id,qnt) {
        let item = (this.Inventory.find(i => i.id === id))
        if (item && item!==null) {
            item.qnt+=qnt
        } else {
            this.Inventory.push({id,qnt})
        }
    }
    static removeItem(id,qnt) {

    }
}