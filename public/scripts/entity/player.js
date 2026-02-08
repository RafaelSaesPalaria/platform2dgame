import { Camera } from "../view/camera.js"
import { Collision, Controller, Gravity, Hitbox, Velocity } from "./components.js"
import { Item } from "./item.js"
import { Screen } from "../view/screen.js"
import { PlayerModel } from "./playerModel.js"

export class Player extends Hitbox {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.color = "red"
        this.model = new PlayerModel(x,y,w,h)
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
        this.model.update(this.x,this.y)
        this.draw()
    }
    draw() {
        //Screen.drawRect(this.x,this.y,this.w,this.h,this.color)
        this.model.draw()
    }
}