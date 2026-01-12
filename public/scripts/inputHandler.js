import { emit } from "./client.js"
import { draw } from "./canvas.js"

let mouse = {
    x:0,
    y:0
}

function right_click() {
    draw(mouse.x,mouse.y)
    emit("draw",{
        x: mouse.x,
        y: mouse.y,
        "color":"black",
        "size": 5
    })
}

export function addMouse() {
    document.addEventListener("mousemove", (e) => {
        mouse.x = e.offsetX
        mouse.y = e.offsetY
    })
    document.addEventListener("mousedown",(e) => {
        right_click()
    })
}