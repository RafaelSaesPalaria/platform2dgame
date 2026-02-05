import { getBlock } from "./block/blockHandler.js";
import { getBlockSize } from "./chunk.js";
import { getDir } from "./inputHandler.js";
import { getEntities, getLevelSize, getRegion, removeEntity } from "./level.js";
import { User } from "./user.js";
import { checkCollision } from "./utils.js";
import { Camera } from "./view/camera.js";
import { Screen } from "./view/screen.js";

export class Hitbox {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.dx = 0;
        this.dy = 0;
    }
    update() {
        this.draw()
    }
    draw() {
        Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}

export class Velocity {
    static maxSpeed = 10
    static minSpeed = 0
    static apply(obj) {
        obj.x += obj.dx
        obj.y += obj.dy
    }
    static fixSpeed(value) {
        let v = Math.abs(value)
        if (v>Velocity.maxSpeed) {
            return Velocity.maxSpeed*(value/v)
        } else if (v < Velocity.minSpeed) {
            return Velocity.minSpeed*(value/v)
        }
        return value
    }
    static validateSpeed(obj) {
        obj.dx = Velocity.fixSpeed(obj.dx)
        obj.dy = Velocity.fixSpeed(obj.dy)
    }
}

export class Gravity {
    static g = 0.5

    static apply(obj) {
        obj.dy+= Gravity.g
    }
}

export class Border {
    static friction = 0.9
    static apply(obj) {
        if (obj.dy < 0 & obj.y < 0 || 
            obj.dy > 0 & obj.y > getLevelSize().height) {
            obj.dy*=-Border.friction
        }
        if (obj.dx < 0 & obj.x < 0 || 
            obj.dx > 0 & obj.x > getLevelSize().width) {
            obj.dx*=-Border.friction
        }
        Border.draw()
    }
    static draw() {
        let l = getLevelSize()
        Screen.drawHitbox(0,0,l.width,l.height)
    }
}

export class Controller {
    static apply(obj) {
        let d = getDir()
        obj.dx += d.x
        obj.dy += d.y
    }
}

export class Collision {
    static apply(obj) {
        for(let c of getRegion()) {
            if (checkCollision(c,obj)) {
                let collidedBlocks = c.getCollidedBlocks(obj)
                if (collidedBlocks.length>0){
                    if (collidedBlocks.filter(b => getBlock(b.id).collide).length>0) {
                        return true
                    }
                }
            }
        }
    }
    static willCollide(obj,x,y) {
        let future_obj = {...obj}
        future_obj.x+=x
        future_obj.y+=y
        return Collision.apply(future_obj)
    }
    static collide(obj) {
        obj.dx*=0
        obj.dy*=0
        obj.color = "blue"
    }
}

export class Item extends Hitbox {
    constructor(id,qnt,x,y) {
        super(x,y,16,16)
        this.qnt = qnt
        this.id = id
        Item.clusterItems()
    }
    static itemPickupRange = 20
    static pickUp(entity) {
        let items = getEntities("Item")
        items.forEach(i => {
            let itemPickup = {...i}

            itemPickup.x -=this.itemPickupRange/2
            itemPickup.y -=this.itemPickupRange/2
            itemPickup.w +=this.itemPickupRange
            itemPickup.h +=this.itemPickupRange
        
            if (checkCollision(itemPickup,entity)) {
                User.addItem(i.id,i.qnt)
                removeEntity(i)
            }
        })
    }
    static clusterItems() {
        let items = getEntities("Item")
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
                    removeEntity(item2)
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
        Screen.drawBlock(this.id,this.x,this.y,16,16)
        Screen.drawHitbox(this.x,this.y,16,16)
    }
}

export class Player extends Hitbox {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.color = "red"
        Camera.setFocus(this)
    }
    update() {
        Velocity.validateSpeed(this)

       if (Collision.willCollide(this,this.dx,0)) {
        this.dx*=0
       }
       if (Collision.willCollide(this,0,this.dy)) {
        this.dy*=0
       }
        
        Velocity.apply(this)
        Gravity.apply(this)
        Item.pickUp(this)
        Controller.apply(this)
        //Border.apply(this)
        
        /*if (!Collision.willCollideX()) {
            Velocity.apply(this)
        }*/
        this.draw()
    }
    draw() {
        Screen.drawRect(this.x,this.y,this.w,this.h,this.color)
    }
}