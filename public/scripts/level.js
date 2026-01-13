import { erase } from "./canvas.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./ui.js"
updateUIs

export function init() {
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    //erase()
    updateUIs()
    if (mouse.isDown) {
        right_click()
    }
}