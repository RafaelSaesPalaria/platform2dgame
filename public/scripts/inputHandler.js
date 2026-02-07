import { emit } from "./client.js"
import { addUI, checkClickOnUIs } from "./view/ui.js"
import { Level } from "./level.js"
import { checkCollision } from "./utils.js"
import { User } from "./user.js"
import { Item } from "./entities.js"
import { Chunk } from "./chunk.js"
import { Camera } from "./view/camera.js"
import { Message } from "./view/message.js"
import { getBlock } from "./block/blockHandler.js"


export let mouse = {
    x:0,
    y:0,
    isDown:false,
    isLeftKey: false
}

export let keys = {
    KeyW : false,
    KeyS: false,
    KeyD:false,
    KeyA:false,
    Enter: false,
    NumpadAdd: false,
    NumpadSubtract: false,
    KeyE: false
}

let dir = {
    x: 0, y : 0
}

export function getDir() {
    return dir
}

export function right_click() {
    if (!checkClickOnUIs(mouse.x,mouse.y)) {
        let blocks = Level.getCollidedBlocks({x:mouse.x,y:mouse.y,w:1,h:1})
        blocks.forEach(b => {
            if (mouse.isLeftKey) {
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

export function mouseMove() {
    let bs= Level.getCollidedBlocks({...mouse,w:1,h:1})
    bs.forEach(b => {
        let fb = {...b}
        fb.w=Level.blockSize
        fb.h=Level.blockSize
        highlight_block(fb)
    })
}

export function addMouse() {
    document.addEventListener("mousemove", (e) => {
        let cam = Camera.getOffset()
        let z = Camera.getZoom()
        mouse.x = (e.offsetX/z - (cam.x))
        mouse.y = (e.offsetY/z - (cam.y))

        mouseMove()
    })
    document.addEventListener("mousedown",(e) => {
        mouse.isDown= true
        mouse.isLeftKey = e.button === 0
    })
    document.addEventListener("wheel",(e) => {
        mouseWheelHandler(e.wheelDeltaY)
    })
    document.addEventListener("mouseup", (e) => {
        mouse.isDown = false
    })
}

export function addKeys() {
    document.addEventListener("keyup", (e) => {
        keyHandler(e)
    }),
    document.addEventListener("keydown",(e) => {
        keyHandler(e)
    })
}

function mouseWheelHandler(delta) {
    User.moveSelectedIndex(delta)
}

function keyHandler(e) {
    if (e.code === "Tab") {
        e.preventDefault()
    }
    if (e.code==="Enter" || !User.isWriting) {
        keys[e.code] = e.type !== "keyup"
        updateDir()
        updateZoom()
        if (keys["KeyE"]) {
            User.inventoryOpen=!User.inventoryOpen  
            if (User.inventoryOpen) {
                User.openInventory()
            } else {
                User.closeInventory()
            }
        }
        if (keys["Enter"]) {
            User.isChatOpen = !User.isChatOpen
            User.isWriting = User.isChatOpen
        }
        if (e.code === "Enter") {
            Message.send()
        }
    } else {
        if (e.type !== "keyup") {
            Message.type(e)
        }
    }
}





function updateZoom() {
    let z = keys.NumpadAdd - keys.NumpadSubtract
    Camera.addZoom(z*0.1)
}

function updateDir() {
    dir.y = keys.KeyS - keys.KeyW
    dir.x = keys.KeyD - keys.KeyA
}