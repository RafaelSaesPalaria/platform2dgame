import { erase } from "./canvas.js"
import { Chunk, getBlockSize, getChunkSize } from "./chunk.js"
import { Player } from "./entities.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./ui.js"
import { checkCollision } from "./utils.js"
updateUIs

let region = []
let entities = []
let levelSize = {width : 785, height : 515}

export function getRegion() {
    return region
}

export function getLevelSize() {
    return levelSize
}

export function addEntity(e) {
    entities.push(e)
}

export function removeEntity(e) {
    entities = entities.filter(i => i!=e)
}

function initRegion() {
    let c = new Chunk()
    for (let i = 0; i < 9 ; i ++) {
        let c = new Chunk()
        c.x = Math.floor(i%3)*getBlockSize()*getChunkSize()
        c.y = Math.floor(i/3)*getBlockSize()*getChunkSize()
        region.push(c)
    }
}

export function init() {
    addEntity(new Player(5,5,20,20))
    initRegion()
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    erase()

    region.forEach(c => {
        c.update()
        entities.forEach(e => {
            if (checkCollision(c,e)) {
                c.collision(e)
            }
        })
    })

    entities.forEach(e => {
        e.update()
    })

    if (mouse.isDown) {
        right_click()
    }

}