import { Level } from "../level.js"
import { User } from "../user.js"
import { checkCollision } from "../utils.js"
import { Collision, Gravity, Hitbox, Velocity } from "./components.js"
import { Screen } from "../view/screen.js"

export class Item extends Hitbox {
    constructor(id,qnt,worldX,worldY) {
        super(worldX*Level.blockSize,worldY*Level.blockSize,16,16)
        this.qnt = qnt
        this.id = id
        Item.clusterItems()
    }
    static itemPickupRange = 20
    static pickUp(entity) {
        let items = Level.getEntities("Item")
        items.forEach(i => {
            let itemPickup = {...i}

            itemPickup.x -=this.itemPickupRange/2
            itemPickup.y -=this.itemPickupRange/2
            itemPickup.w +=this.itemPickupRange
            itemPickup.h +=this.itemPickupRange
        
            if (checkCollision(itemPickup,entity)) {
                User.addItem(i.id,i.qnt)
                Level.removeEntity(i)
            }
        })
    }
    static clusterItems() {
        let items = Level.getEntities("Item")
        for (let itemi = 0; itemi<items.length-1;itemi++) {
            for (let item2i = itemi+1 ; item2i<items.length;item2i++) {
                let item = items[itemi]
                let item2 = items[item2i]
                let itemPickup = {...item}

                itemPickup.x -=this.itemPickupRange/2
                itemPickup.y -=this.itemPickupRange/2
                itemPickup.w +=this.itemPickupRange
                itemPickup.h +=this.itemPickupRange

                

                //Screen.drawHitbox(itemPickup.x,itemPickup.y,itemPickup.w,itemPickup.h)

                if (item.id == item2.id &&checkCollision(item,item2)) {
                    item.qnt+=item2.qnt
                    Level.removeEntity(item2)
                }
            }
        }
    }
    update() {
        if (Collision.willCollide(this,this.dx,0)) {
        this.dx*=0
       }
       if (Collision.willCollide(this,0,this.dy)) {
        this.dy*=0
       }
        
       if (this.dx!==0 || this.dy!==0) {
            Item.clusterItems()
       }

        Velocity.apply(this)
        Gravity.apply(this)
        this.draw()
    }
    draw() {
        Screen.drawImage(this.id,this.x,this.y,this.w,this.h)
        Screen.drawHitbox(this.x,this.y,this.w,this.h)
        if (this.qnt>1) {
            Screen.write(this.qnt,"white",15,this.x,this.y+this.h)
        }
    }
}