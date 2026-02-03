import { getBlock } from "./block/blockHandler.js";
import { Camera, Screen} from "./canvas.js";
import { getBlockSize } from "./chunk.js";
import { getDir } from "./inputHandler.js";
import { getLevelSize, getRegion } from "./level.js";
import { checkCollision } from "./utils.js";

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
        Velocity.apply(this)
        this.draw()
    }
    draw() {
        Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}

export class Velocity {
    static apply(obj) {
        obj.x += obj.dx
        obj.y += obj.dy
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
                        Collision.collide(obj)
                    }
                }
                
            }
        }
    }
    static collide(obj) {
        obj.dx*=0
        obj.dy*=0
        obj.color = "blue"
    }
}

export class Player extends Hitbox {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.color = "red"
    }
    update() {
        if (Collision.apply(this)) {
            Collision.collide(this)
        } else {
            this.color = "red"
            Gravity.apply(this)
        }
        
        
        Border.apply(this)
        Controller.apply(this)
        Camera.setFocus(this)
        super.update()
    }
    draw() {
        Screen.drawRect(this.x,this.y,this.w,this.h,this.color)
    }
}