export class User {
    static Inventory = []
    static inventoryOpen = false
    static selectedItemIndex = 0

    static addItem(id,qnt) {
        let item = (this.Inventory.find(i => i.id === id))
        if (item) {
            item.qnt+=qnt
        } else {
            this.Inventory.push({id,qnt})
        }
    }
    static removeItem(id,qnt) {

    }
}