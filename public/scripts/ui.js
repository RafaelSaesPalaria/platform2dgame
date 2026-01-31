import { draw, drawRect,} from "./canvas.js"
import { checkCollision } from "./utils.js"

let UIs = []

export function initUIs() {
    UIs.push({type:"colorsUI",element:new colorsUI(635,0,150,90)})
}

export function updateUIs() {
    UIs.forEach(ui => {
        ui.element.draw()
    })
}

export function checkClickOnUIs(x,y) {
    UIs.forEach(ui => {
        if (checkCollision({x,y,w:1,h:1},ui.element)) {
            ui.element.click(x,y)
            return true
        }
    })
    return false
}

class Button {
    constructor (x,y,w,h,action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.action = action;
    }
    checkClick(x,y) {
        if (checkCollision({x,y,w:1,h:1},this)) {
            this.click()
        }
    }
    click() {
        this.action();
    }
    draw() {

    }
}

class UI {
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    click(x,y) {

    }
    draw() {

    }
}

export function getUI(type) {
    return UIs.filter(ui => ui.type===type)[0].element
}

export function addColor(hexCode) {
    colors.push(hexCode)
    getUI("colorsUI").buttons = []
    getUI("colorsUI").makeButtons()
    setCurrentlyColor(hexCode)
    getUI("colorsUI").currentlyColorChange()
}

let colors = ["#FF0000","#FFA500","#FFFF00","#008000","#0000FF","#800080","#000000","#808080","#FFFFFF"]
class colorsUI extends UI{
    constructor (x,y,w,h) {
        super(x,y,w,h)
        this.size = 30
        this.buttons = []
        this.makeButtons()
    }
    click(x,y) {
       this.buttons.forEach(b => {
            b.checkClick(x,y)
       })
    }
    makeButtons() {
        drawRect(this.x,this.y,this.w,this.h,"#dddddd")

        colors.forEach((c,i) => {
            let b = new Button(this.x+(((i+1)%5)*this.size),this.y+(Math.floor((i+1)/5)*this.size),this.size,this.size,() => {
                setCurrentlyColor(colors[i])
                this.currentlyColorChange()
            })

            this.buttons.push(b)

            drawRect(b.x,b.y,b.w,b.h,colors[i])
        })
    }
    currentlyColorChange() {
        setColors_input_Color(getCurrentlyColor())
        drawRect(this.x-2,this.y-2,this.size+4,this.size+4,"black")
        drawRect(this.x-1,this.y-1,this.size+2,this.size+2,"white")
        drawRect(this.x,this.y,this.size,this.size,getCurrentlyColor())
    }
    draw() {
        
    }
}

class toolsUI extends UI {
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.tools = ["paint","lapis","rect",'fill',"select","zoom","copy",".pngimport","layer","degrade"]
    }
    click(x,y) {

    }
    draw() {
        this.tools.forEach((t,i) => {
            drawRect(this.x*i,this.y,30,30,"black")
        })
    }
}