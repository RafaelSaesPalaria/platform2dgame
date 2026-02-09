import { Mouse } from "../input/mouse.js"
import { checkCollision } from "../utils.js"
import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

/* Class to be used in inventories to drag itens */
export class ItemUI extends UI {
    constructor(reference,item_id,qnt,screenX,screenY,w,h) {
        super(screenX,screenY,w,h)
        this.ui_id = -1
        this.item_id = item_id
        this.qnt = qnt
        this.x = screenX
        this.y = screenY
        this.w = w
        this.h =h 
        this.isDragged = false
        this.reference = reference
    }
    click(x,y) {
        this.isDragged = true
    }
    update() {
        if (this.isDragged) {
            this.x = Mouse.screenX
            this.y = Mouse.screenY
        }
        //console.log(checkCollision(this,{x:Mouse.x,y:Mouse.y,w:1,h:1}))
        
        if (checkCollision({x:this.x,y:this.y,h:this.h,w:this.w},{x:Mouse.screenX,y:Mouse.screenY,w:100,h:100})) {
            this.isDragged= true
        }
        this.draw()
    }
    draw() {
        StaticScreen.drawImage(
                    this.item_id,
                    this.x,
                    this.y,
                    this.w,
                    this.h
                )
        StaticScreen.write(this.qnt,"white",this.w/3,this.x,this.y)
    }
}