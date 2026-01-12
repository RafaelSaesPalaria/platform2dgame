import { draw } from "./canvas.js"

let mouse = {
    x:0,
    y:0
}

function right_click() {
    draw(mouse.x,mouse.y)
}

export function addMouse() {
    document.addEventListener("mousemove", (e) => {
        console.log(e)
        mouse.x = e.offsetX
        mouse.y = e.offsetY
    })
    document.addEventListener("mousedown",(e) => {
        right_click()
    })
}