import { getBlock, getObj } from "./block/blockHandler.js";
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

export class Images {
    static imgs = []
    static use(id) {
        if (!this.has(id)) {
            this.create(id)
        }
        return this.get(id)
    }
    static get(id) {
        return this.imgs.find(i => i.id === id)?.img
    }
    static has(id) {
        return this.imgs.some(i => i.id === id)
    }
    static create(id) {
        if (!this.has(id)) {
            let img = new Image(16,16)
            img.src = getObj(id).src
            this.imgs.push({id,img})
        }
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

            x = Math.floor(x)
            y = Math.floor(y)
            Screen.c.beginPath()
            Screen.c.fillStyle = color
            Screen.c.fillRect(x,y,w,h)
            Screen.c.closePath()
        }
    }
    static drawUI(id,x,y,w,h) {
        Screen.c.beginPath()

        x = Math.floor(x)
        y = Math.floor(y)
        Screen.c.drawImage(Images.use(id),x,y,w,h)
        Screen.c.closePath()
    }
    static writeUI(text,color,x,y) {
        Screen.c.beginPath()
        Screen.c.fillStyle = color
        Screen.c.font = "20px Arial"
        Screen.c.fillText(text,x,y)
        Screen.c.closePath()
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

            x = Math.floor(x)
            y = Math.floor(y)
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

            x = Math.floor(x)
            y = Math.floor(y)
            Screen.c.drawImage(Images.use(id),x,y,w,h)

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