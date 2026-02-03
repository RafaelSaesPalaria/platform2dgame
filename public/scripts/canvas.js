import { addColor, getUI } from "./ui.js";
import { checkCollision } from "./utils.js";

export class Camera {
    static zoom = 1
    static offset = {x:0,y:0,dx:0,dy:0}
    static focusObject = {x:0,y:0}
    static size = {w:785,h:515}
    static setFocus(obj) {
        this.focusObject = obj
    }
    static updateFocus() {
        Camera.setOffset(
            -this.focusObject.x+(Screen.canvas.width/2)/Camera.zoom,
            -this.focusObject.y+(Screen.canvas.height/2)/Camera.zoom)
    }
    static addZoom(value) {
        Camera.zoom+=value

        Camera.size.w = Screen.canvas.width/Camera.zoom
        Camera.size.h = Screen.canvas.height/Camera.zoom
    }
    static setOffset(x,y) {
        Camera.offset.x = x
        Camera.offset.y = y
    }
    static updateOffset() {
        Camera.offset.x+=Camera.offset.dx
        Camera.offset.y+=Camera.offset.dy
    }
    static getZoom() {
        return Camera.zoom
    }
    static getOffset() {
        return Camera.offset
    }
    static isOnCamera(obj) {
        return checkCollision(obj,{
            x:-Camera.offset.x,
            y:-Camera.offset.y,
            w:Camera.size.w,
            h:Camera.size.h
        })
    }
}

export class Screen {
    static canvas = document.querySelector("canvas");
    static c = Screen.canvas.getContext("2d")
    static frameCountDraw = 0
    static resize() {
        Screen.canvas.width = 785
        Screen.canvas.height = 515
    }
    static drawRect(x,y,w,h,color) {
        if (Camera.isOnCamera({x,y,w,h})) {
            this.frameCountDraw+=1
            x+= Camera.getOffset().x
            y+= Camera.getOffset().y

            x*=Camera.getZoom()
            y*=Camera.getZoom()
            w*=Camera.getZoom()
            h*=Camera.getZoom()

            Screen.c.beginPath()
            Screen.c.fillStyle = color
            Screen.c.fillRect(x,y,w,h)
            Screen.c.closePath()
        }
    }
    static drawHitbox(x,y,w,h) {
        if (Camera.isOnCamera({x,y,w,h})) {
            this.frameCountDraw+=1
            x+= Camera.getOffset().x
            y+= Camera.getOffset().y

            x*=Camera.getZoom()
            y*=Camera.getZoom()
            w*=Camera.getZoom()
            h*=Camera.getZoom()

            Screen.c.beginPath()
            Screen.c.strokeRect(x,y,w,h)
            Screen.c.stroke()
            Screen.c.closePath()
        }
    }
    static drawBlock(id,x,y,w,h) {
        if (Camera.isOnCamera({x,y,w,h})) {
            this.frameCountDraw+=1
            x+= Camera.getOffset().x
            y+= Camera.getOffset().y

            x*=Camera.getZoom()
            y*=Camera.getZoom()
            w*=Camera.getZoom()
            h*=Camera.getZoom()

            Screen.c.beginPath()

            //Screen.c.fillStyle = "#dAdAdA"
            //Screen.c.fillRect(x,y,w,h)

            let color = "green"
            if (id ==="dirt") {
                color = "brown"
            } else if (id ==="stone") {
                color = "gray"
            } else if (id ==="air") {
                color = "white"
            }


            Screen.c.fillStyle = color
            let border = 0
            Screen.c.fillRect(x+border,y+border,w-border,h-border)

            Screen.c.closePath()
        }
    }
    static erase() {
        Screen.c.fillStyle = "white"
        Screen.c.fillRect(0,0,Screen.canvas.width,Screen.canvas.height)

        //console.log(Screen.frameCountDraw)
        Screen.frameCountDraw=0
    }
}

Screen.canvas.addEventListener("contextmenu", (e) => {
    console.log(e)
    e.preventDefault()
})
/*
export function resize() {
    canvas.width = 785;
    canvas.height = 515;
}
/*
export function draw(x,y,color) {
    x+= Camera.getOffset().x
    y+= Camera.getOffset().y

    x*=Camera.getZoom()
    y*=Camera.getZoom()

    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,5,5)
    c.closePath()
}*/
/*
export function drawRect(x,y,w,h,color) {
    x+= Camera.getOffset().x
    y+= Camera.getOffset().y

    x*=Camera.getZoom()
    y*=Camera.getZoom()
    w*=Camera.getZoom()
    h*=Camera.getZoom()

    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,w,h)
    c.closePath()
}

export function drawHitbox(x,y,w,h) {
    x+= Camera.getOffset().x
    y+= Camera.getOffset().y

    x*=Camera.getZoom()
    y*=Camera.getZoom()
    w*=Camera.getZoom()
    h*=Camera.getZoom()

    c.beginPath()
    c.strokeRect(x,y,w,h)
    c.stroke()
    c.closePath()
}

export function drawBlock(id,x,y,w,h) {
    x+= Camera.getOffset().x
    y+= Camera.getOffset().y

    x*=Camera.getZoom()
    y*=Camera.getZoom()
    w*=Camera.getZoom()
    h*=Camera.getZoom()

    c.beginPath()

    c.fillStyle = "black"
    c.fillRect(x,y,w,h)

    let color = "green"
    if (id ==="dirt") {
        color = "brown"
    } else if (id ==="stone") {
        color = "gray"
    } else if (id ==="air") {
        color = "white"
    }


    c.fillStyle = color
    let border = 1
    c.fillRect(x+border,y+border,w-border,h-border)

    c.closePath()
}

export function erase() {
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height)
}*/