import { emit } from "./client.js"
import { Level } from "./level.js"
import { checkCollision } from "./utils.js"
import { User } from "./user.js"
import { Chunk } from "./chunk.js"
import { Camera } from "./view/camera.js"
import { Message } from "./view/message.js"
import { getBlock } from "./block/blockHandler.js"
import { UIHandler } from "./ui/uiHandler.js"
import { Item } from "./entity/item.js"
import { Mouse } from "./io/mouse.js"
import { Keyboard } from "./io/keyboard.js"

let dir = {
    x: 0, y : 0
}

export function getDir() {
    return dir
}

export function right_click() {
    if (!UIHandler.checkClickOnUIs(Mouse.x,Mouse.y)) {
        let blocks = Level.getCollidedBlocks({x:Mouse.x,y:Mouse.y,w:1,h:1})
        blocks.forEach(b => {
            if (Mouse.isLeftKey) {
                break_block(b)
            } else {
                place_block(b)
            }
        })
        /*emit("draw",{
            x: mouse.x,
            y: mouse.y,
            "color":getCurrentlyColor(),
            "size": 5
        })*/
    }
}

export function break_block(b) {
    if (b.id !== "air") {
        let id = b.id
        let drop_id = getBlock(b.id).drops
        b.id = "air"
        Level.addEntity(new Item(drop_id,1,b.worldX,b.worldY))
    }
}

export function place_block(b) {
    
    if (b.id === "air") {
        if (User.getSelectedItem()) {
            b.id = User.getSelectedItem().id
            Level.setBlock(b.id,b.worldX,b.worldY)
            User.removeItem(User.getSelectedItem().id,1)
        }
    } else {
        Level.getBlock(b.worldX,b.worldY).right_click()
    }
}

export function highlight_block(b) {
    if (b.id!=="air" || User.getSelectedItem()) {
        User.selectedBlock = b
    } else {
        User.selectedBlock = null
    }
}

export function addMouse() {
    document.addEventListener("mousemove", (e) => {
        Mouse.mouseMove(e)
    })
    document.addEventListener("mousedown",(e) => {
        Mouse.mouseDown(e)
    })
    document.addEventListener("wheel",(e) => {
        Mouse.wheel(e)
    })
    document.addEventListener("mouseup", (e) => {
        Mouse.mouseUp(e)
    })
}

export function addKeys() {
    document.addEventListener("keyup", (e) => {
        Keyboard.keyHandler(e)
    }),
    document.addEventListener("keydown",(e) => {
        Keyboard.keyHandler(e)
    })
}




export function updateZoom() {
    let z = Keyboard.keys.NumpadAdd - Keyboard.keys.NumpadSubtract
    Camera.addZoom(z*0.1)
}

export function updateDir() {
    dir.y = Keyboard.keys.KeyS - Keyboard.keys.KeyW
    dir.x = Keyboard.keys.KeyD - Keyboard.keys.KeyA
}