import { draw, drawRect, setCurrentlyColor } from "./canvas.js"

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
        if (
            x >= ui.x &&
            x <= ui.x + ui.w &&
            y >= ui.y &&
            y <= ui.y + ui.h
        ) {
            ui.click(x,y)
            return true
        }
    })
    return false
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
        this.matriz = {x: 635, y:0 }
        this.size = 30
        this.colors = ["orange","green","blue","red","purple","yellow","black","white"]
    }
    click(x,y) {
        let xc = x - this.matriz.x
        let yc = y - this.matriz.y

        xc = Math.floor(xc/30)
        yc = Math.floor(yc/30)

        let i = yc*5+xc
        
        if (i>=0 & i<this.colors.length) {
            this.colors[i]
           setCurrentlyColor(this.colors[i])
        }
    }
    drawColors() {
        this.colors.forEach((c,i) => {
            drawRect(this.matriz.x+((i%5)*this.size),this.matriz.y+(Math.floor(i/5)*this.size),this.size,this.size,c)
        })
    }
    draw() {
        drawRect(this.x,this.y,this.w,this.h,"#dddddd")
        this.drawColors()
    }
}