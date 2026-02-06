import { Camera } from "./camera.js";
import { Images } from "./images.js";

export class StaticScreen {
    static canvas = document.querySelector("canvas");
    static c = StaticScreen.canvas.getContext("2d")
    static frameCountDraw = 0
    static resize() {
        StaticScreen.canvas.width = 785
        StaticScreen.canvas.height = 515
    }
    static drawRect(x,y,w,h,color) {
        StaticScreen.c.beginPath()
        StaticScreen.c.fillStyle = color
        StaticScreen.c.fillRect(x,y,w,h)
        StaticScreen.c.closePath()
    }
    static drawBlock() {

    }
    static drawHitbox(x,y,w,h) {
        StaticScreen.c.beginPath()
        StaticScreen.c.strokeRect(x,y,w,h)
        StaticScreen.c.stroke()
        StaticScreen.c.closePath()
    }
    static drawImage(id,x,y,w,h) {
        StaticScreen.c.beginPath()

        x = Math.floor(x)
        y = Math.floor(y)
        StaticScreen.c.drawImage(Images.use(id),x,y,w,h)
        StaticScreen.c.closePath()
    }
    static write(text,color,size,x,y) {
        StaticScreen.c.beginPath()
        StaticScreen.c.fillStyle = color
        StaticScreen.c.font = `${size}px Arial`
        StaticScreen.c.fillText(text,x,y)
        StaticScreen.c.closePath()
    }
    static erase() {
        StaticScreen.c.fillStyle = "white"
        StaticScreen.c.fillRect(0,0,StaticScreen.canvas.width,StaticScreen.canvas.height)
        //console.log(StaticScreen.frameCountDraw)
        StaticScreen.frameCountDraw=0
    }
}

StaticScreen.canvas.addEventListener("contextmenu", (e) => {
    console.log(e)
    e.preventDefault()
})

export class Screen extends StaticScreen {
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
            StaticScreen.drawRect(x,y,w,h,color)
        }
    }
    static write(text,color,size,x,y) {
        if (Camera.isOnCamera({x,y,w:10,h:10})) {
            this.frameCountDraw+=1
            x+= Camera.getOffset().x
            y+= Camera.getOffset().y

            x*=Camera.getZoom()
            y*=Camera.getZoom()

            StaticScreen.write(text,color,size,x,y)
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

            x = Math.floor(x)
            y = Math.floor(y)
            StaticScreen.drawHitbox(x,y,w,h)
        }
    }
    static drawImage(id,x,y,w,h) {
        if (Camera.isOnCamera({x,y,w,h}) & id!=="air") {
            this.frameCountDraw+=1
            x+= Camera.getOffset().x
            y+= Camera.getOffset().y

            x*=Camera.getZoom()
            y*=Camera.getZoom()
            w*=Camera.getZoom()
            h*=Camera.getZoom()

            StaticScreen.c.beginPath()


            //StaticScreen.c.fillStyle = "#dAdAdA"
            //StaticScreen.c.fillRect(x,y,w,h)

            x = Math.floor(x)
            y = Math.floor(y)
            StaticScreen.drawImage(id,x,y,w,h)

            StaticScreen.c.closePath()
        }
    }
}