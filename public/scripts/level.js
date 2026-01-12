import { erase } from "./canvas.js"
import { updateUIs } from "./ui.js"
updateUIs

export function init() {
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    //erase()
    updateUIs()
}