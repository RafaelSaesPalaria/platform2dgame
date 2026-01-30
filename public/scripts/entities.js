import { drawHitbox, drawRect } from "./canvas.js";
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
        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
    draw() {
        drawHitbox(this.x,this.y,this.w,this.h)
    }
}

export class Gravity {
    static g = 0.5

    static apply(obj) {
        obj.dy+= Gravity.g
    }
}

export class Border {
    static apply(obj) {
        if (obj.dy < 0 & obj.y < 0) {
            obj.dy*=-1
        }
        if (obj.dy > 0 & obj.y > getLevelSize().height) {
            obj.dy*=-1
        }
    }
}

export class Controller {
    
}

export class Player extends Hitbox {
    constructor(x,y,w,h) {
        super(x,y,w,h)
    }
    update() {
        Gravity.apply(this)
        Border.apply(this)
        super.update()
    }
    draw() {
        drawRect(this.x,this.y,this.w,this.h,"red")
    }
}