import { emit } from "./client.js"
import {Camera} from "./canvas.js"
import { checkClickOnUIs } from "./ui.js"
import { addEntity, getRegion } from "./level.js"
import { checkCollision } from "./utils.js"
import { User } from "./user.js"
import { Item } from "./entities.js"
import { getBlockSize } from "./chunk.js"

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
        getRegion().forEach(c => {
            if (checkCollision(c,{x:mouse.x,y:mouse.y,w:1,h:1})) {
                let i = "grass"
                let blocks = c.getCollidedBlocks({x:mouse.x,y:mouse.y,w:1,h:1})
                blocks.forEach(b => {
                    if (mouse.isLeftKey) {
                        break_block(b)
                    } else {
                        place_block(b)
                    }
                })
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
        b.id = "air"
        addEntity(new Item(id,1,mouse.x-getBlockSize()/2,mouse.y-getBlockSize()/2))
    }
}

export function place_block(b) {
    if (b.id === "air") {
        b.id = User.getSelectedItem().id
        User.removeItem(User.getSelectedItem().id,1)
    }
}

export function addMouse() {
    document.addEventListener("mousemove", (e) => {
        let cam = Camera.getOffset()
        let z = Camera.getZoom()
        mouse.x = (e.offsetX/z - (cam.x))
        mouse.y = (e.offsetY/z - (cam.y))
    })
    document.addEventListener("mousedown",(e) => {
        mouse.isDown= true
        mouse.isLeftKey = e.button === 0
    })
    document.addEventListener("drag", (e) => {})
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
    keys[e.code] = e.type !== "keyup"
    updateDir()
    updateZoom()
    if (keys["KeyE"]) {
        User.inventoryOpen=!User.inventoryOpen  
    }
}

function updateZoom() {
    let z = keys.NumpadAdd - keys.NumpadSubtract
    Camera.addZoom(z*0.01)
}

function updateDir() {
    dir.y = keys.KeyS - keys.KeyW
    dir.x = keys.KeyD - keys.KeyA
}