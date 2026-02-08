import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

export class HealthUI extends UI {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.health = 100
    }
    draw() {
        for(let h = 0; h < this.health; h+=10) {
            StaticScreen.drawImage("heart-filled",this.x+(h*3),this.y,30,30)
        }
    }
}