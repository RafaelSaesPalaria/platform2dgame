import { erase } from "./canvas.js"
import { Player } from "./entities.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./ui.js"
updateUIs

let region = []
let entities = []
let levelSize = {width : 785, height : 515}

export function getLevelSize() {
    return levelSize
}

export function addEntity(e) {
    entities.push(e)
}

export function removeEntity(e) {
    entities = entities.filter(i => i!=e)
}

export function init() {
    addEntity(new Player(5,5,20,20))
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    erase()

    entities.forEach(e => {
        e.update()
    })

}