import { emit } from "./client.js"
import {Camera} from "./canvas.js"
import { checkClickOnUIs } from "./ui.js"
import { getRegion } from "./level.js"
import { checkCollision } from "./utils.js"

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
    NumpadSubtract: false
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
                if (mouse.isLeftKey) {
                    i = "air"
                }
                let blocks = c.getCollidedBlocks({x:mouse.x,y:mouse.y,w:1,h:1})
                blocks.forEach(b => {
                    b.id= i
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

function keyHandler(e) {
    keys[e.code] = e.type !== "keyup"
    updateDir()

    updateZoom()
}

function updateZoom() {
    let z = keys.NumpadAdd - keys.NumpadSubtract
    Camera.addZoom(z*0.01)
}

function updateDir() {
    dir.y = keys.KeyS - keys.KeyW
    dir.x = keys.KeyD - keys.KeyA
}