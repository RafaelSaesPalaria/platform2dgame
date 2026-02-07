import { Velocity } from "../../entities.js"
import { checkCollision } from "../../utils.js"
import { Camera } from "../camera.js"
import { StaticScreen } from "../screen.js"
import { Background } from "./background.js"

export class Cloud {
    static cloudColorList = ["white","gray"]
    constructor(x,y,dy) {
        this.x =x
        this.y =y
        this.distanceFromView = Math.random()*5
        this.w = 16*this.distanceFromView
        this.h = 16
        this.dx = dy*(1/this.distanceFromView)
        this.dy = 0
        this.color = "white"
        this.transparency = 0
    }
    update() {
        Velocity.apply(this)

        if (!checkCollision({...Background.size,x:0,y:0},this)) {
            Background.removeCloud(this)
        }

        this.draw()
    }
    draw() {
        StaticScreen.drawRect(this.x,this.y,this.w,this.h,this.color)
        if (this.w>=this.h*2) {
            StaticScreen.drawRect(this.x+this.w/3,this.y-(this.h/2),this.w/3,this.h/2,this.color)   
        }
    }
}

export class CloudModel {}