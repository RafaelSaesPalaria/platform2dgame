import { Camera } from "../view/camera.js"
import { Collision, Controller, Gravity, Hitbox, Velocity } from "./components.js"
import { Item } from "./item.js"
import { Screen } from "../view/screen.js"

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
        Velocity.slowDown(this)
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