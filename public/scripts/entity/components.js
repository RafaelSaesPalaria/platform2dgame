import { getBlock } from "../block/blockHandler.js"
import { getDir } from "../inputHandler.js"
import { Level } from "../level.js"
import { checkCollision } from "../utils.js"
import { Screen } from "../view/screen.js"

export class Velocity {
    static maxSpeed = 10
    static minSpeed = 0
    static slowBy = 0.3
    static apply(obj) {
        obj.x += obj.dx
        obj.y += obj.dy
    }
    static slowDown(obj) {
        obj.dx -= Math.sign(obj.dx) * this.slowBy
        if (Math.abs(obj.dx) < this.slowBy) obj.dx = 0

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
        for(let c of Level.chunks) {
            if (checkCollision(c,obj)) {
                let collidedBlocks = Level.getCollidedBlocks(obj)
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