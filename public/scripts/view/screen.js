import { Camera } from "./camera.js";
import { Images } from "./images.js";

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