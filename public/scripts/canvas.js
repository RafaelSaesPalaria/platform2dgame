let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d")

let currentlyColor = "black"

export function setCurrentlyColor(c)  {
    currentlyColor = c
}

export function getCurrentlyColor() {
    return currentlyColor
}

export function resize() {
    canvas.width = 785;
    canvas.height = 515;
}

export function draw(x,y,color) {
    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,5,5)
    c.closePath()
}

export function drawRect(x,y,w,h,color) {
    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,w,h)
    c.closePath()
}

export function erase() {
    c.fillRect(0,0,canvas.width,canvas.height)
}