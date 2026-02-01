import { addColor, getUI } from "./ui.js";

let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d")

let cameraOffset = {x:0, y:0, dx: 0, dy: 0}

let zoom = 1

export function addZoom(z) {
    zoom+=z
}

export function getZoom() {
    return zoom
}

// Right click
canvas.addEventListener("contextmenu", (e) => {
    console.log(e)
    e.preventDefault()
})


export function getCameraOffset() {
    return cameraOffset
}

export function setCameraOffset(x,y) {
    cameraOffset.x=x
    cameraOffset.y=y
}

export function updateCameraOffset() {
    cameraOffset.x+=cameraOffset.dx
    cameraOffset.y+=cameraOffset.dy
}

export function resize() {
    canvas.width = 785;
    canvas.height = 515;
}

export function draw(x,y,color) {
    x+= cameraOffset.x
    y+= cameraOffset.y

    x*=zoom
    y*=zoom

    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,5,5)
    c.closePath()
}

export function drawRect(x,y,w,h,color) {
    x+= cameraOffset.x
    y+= cameraOffset.y

    x*=zoom
    y*=zoom
    w*= zoom
    h*= zoom

    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,w,h)
    c.closePath()
}

export function drawHitbox(x,y,w,h) {
    x+= cameraOffset.x
    y+= cameraOffset.y

    x*=zoom
    y*=zoom
    w*= zoom
    h*= zoom

    c.beginPath()
    c.strokeRect(x,y,w,h)
    c.stroke()
    c.closePath()
}

export function drawBlock(id,x,y,w,h) {
    x+= cameraOffset.x
    y+= cameraOffset.y

    x*=zoom
    y*=zoom
    w*= zoom
    h*= zoom

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
}