import { drawHitbox, drawRect, setCameraOffset } from "./canvas.js";
import { getDir } from "./inputHandler.js";
import { getLevelSize } from "./level.js";

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
        drawHitbox(this.x,this.y,this.w,this.h)
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
    }
}

export class Controller {
    static apply(obj) {
        let d = getDir()
        obj.dx += d.x
        obj.dy += d.y
    }
}

export class CameraController {
    static apply(obj) {
        setCameraOffset(-obj.x+392,-obj.y+259)
    }
}

export class Player extends Hitbox {
    constructor(x,y,w,h) {
        super(x,y,w,h)
    }
    update() {
        Gravity.apply(this)
        Border.apply(this)
        Controller.apply(this)
        CameraController.apply(this)
        super.update()
    }
    draw() {
        drawRect(this.x,this.y,this.w,this.h,"red")
    }
}