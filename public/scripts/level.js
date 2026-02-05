import { Camera, Screen } from "./canvas.js"
import { Chunk, getBlockSize, getChunkSize } from "./chunk.js"
import { Item, Player } from "./entities.js"
import { mouse, right_click } from "./inputHandler.js"
import { updateUIs } from "./ui.js"
import { User } from "./user.js"
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

export function getEntities(type) {
    return entities.filter(e => e.constructor.name==type)
}

export function removeEntity(e) {
    entities = entities.filter(i => i!=e)
}

function initRegion() {
    let c = new Chunk()
    for (let i = 0; i < 9 ; i ++) {
        let c = new Chunk()
        c.x = i*getBlockSize()*getChunkSize().w
        region.push(c)
    }
}

export function init() {
    addEntity(new Player(392,1259,20,20))
    initRegion()
    animate()
}

function animate() {
    requestAnimationFrame(animate)
    Screen.erase()

    region.forEach(c => {
        c.update()
    })

    entities.forEach(e => {
        e.update()
    })

    Screen.drawRect(mouse.x,mouse.y,4,4,"purple")
    Screen.drawHitbox(-Camera.offset.x,-Camera.offset.y,Camera.size.w,Camera.size.h)

    let b = User.selectedBlock
    if (b) {
        Screen.drawHitbox(b.x,b.y,b.w,b.h)
    }
    
    Camera.updateOffset()
    Camera.updateFocus()
    updateUIs()

    if (mouse.isDown) {
        right_click()
    }

}