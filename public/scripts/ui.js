import { draw, drawRect, getCurrentlyColor, setCurrentlyColor } from "./canvas.js"
import { checkCollision } from "./utils.js"

let UIs = []

export function initUIs() {
    UIs.push(new colorsUI(635,0,150,300))
    console.log(UIs)
}

export function updateUIs() {
    UIs.forEach(ui => {
        ui.draw()
    })
}

export function checkClickOnUIs(x,y) {
    UIs.forEach(ui => {
        if (checkCollision({x,y,w:1,h:1},ui)) {
            ui.click(x,y)
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
        console.log(this.action)
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

class colorsUI extends UI{
    constructor (x,y,w,h) {
        super(x,y,w,h)
        this.size = 30
        this.colors = ["orange","green","blue","red","purple","yellow","black","white"]
        this.buttons = []
        this.makeButtons()
    }
    click(x,y) {
        /*let xc = x - this.x
        let yc = y - this.y

        xc = Math.floor(xc/30)
        yc = Math.floor(yc/30)

        let i = yc*5+xc
        
        if (i>=0 & i<this.colors.length) {
            this.colors[i]
           setCurrentlyColor(this.colors[i])
        }*/
       this.buttons.forEach(b => {
            b.checkClick(x,y)
       })
    }
    makeButtons() {
        drawRect(this.x,this.y,this.w,this.h,"#dddddd")

        this.colors.forEach((c,i) => {
            let b = new Button(this.x+(((i+1)%5)*this.size),this.y+(Math.floor((i+1)/5)*this.size),this.size,this.size,() => {
                setCurrentlyColor(this.colors[i])
                this.currentlyColorChange()
            })

            this.buttons.push(b)

            drawRect(b.x,b.y,b.w,b.h,this.colors[i])
        })
    }
    currentlyColorChange() {
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
        this.tools = ["paint","lapis","rect",'fill',"select","zoom","copy",".pngimport","layer"]
    }
    click(x,y) {

    }
    draw() {

    }
}