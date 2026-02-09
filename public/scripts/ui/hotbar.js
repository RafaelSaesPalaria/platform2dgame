import { User } from "../user.js"
import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

export class HotbarUI extends UI {
    constructor (x,y,w,h) {
        super(x,y,w,h)
        this.slots = []
        this.selectedIndex = 0

        this.w = this.slots*50
        this.h = 50
    }
    click(x,y) {

    }
    update() {
        this.slots = User.getHotbar()
        this.selectedIndex = User.selectedItemIndex
        this.draw()
    }
    draw() {
        if (this.slots.length<9) {
            for (let i = this.slots.length; i < 9 ; i++) {
                StaticScreen.drawImage("ui-slot",this.x+(i*50),this.y,50,50)
            }
        }

        StaticScreen.drawImage("ui-slot",this.x-5+(this.selectedIndex*50),this.y-5,60,60)

        this.slots.forEach((s,i) => {
            if (i !== this.selectedIndex) { 
                StaticScreen.drawImage("ui-slot",this.x+(i*50),this.y,50,50)
            }
            if (s !== null) {
                StaticScreen.drawImage(s.id,this.x+(10)+(s.slot*50),this.y+10,30,30)
                StaticScreen.write(s.qnt,"white",20,this.x+(10)+(s.slot*50),this.y+40)
            }
        })
    }
}