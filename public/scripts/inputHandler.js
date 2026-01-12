import { emit } from "./client.js"
import { draw, getCurrentlyColor } from "./canvas.js"
import { checkClickOnUIs } from "./ui.js"

let mouse = {
    x:0,
    y:0
}

function right_click() {
    if (!checkClickOnUIs(mouse.x,mouse.y)) {
        draw(mouse.x,mouse.y,getCurrentlyColor())
        emit("draw",{
            x: mouse.x,
            y: mouse.y,
            "color":getCurrentlyColor(),
            "size": 5
        })
    }
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