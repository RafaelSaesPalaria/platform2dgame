import { emit } from "./client.js"
import { draw, getCurrentlyColor } from "./canvas.js"
import { checkClickOnUIs } from "./ui.js"
import { getRegion } from "./level.js"
import { checkCollision } from "./utils.js"

export let mouse = {
    x:0,
    y:0,
    isDown:false,
}

export let keys = {
    KeyW : false,
    KeyS: false,
    KeyD:false,
    KeyA:false
}

let dir = {
    x: 0, y : 0
}

export function getDir() {
    return dir
}

export function right_click() {
    console.log("Righ Clicjk")
    if (!checkClickOnUIs(mouse.x,mouse.y)) {
        getRegion().forEach(c => {
            if (checkCollision(c,{x:mouse.x,y:mouse.y,w:1,h:1})) {
                c.collision({x:mouse.x,y:mouse.y,w:1,h:1},(ev) => {ev.id = "grass"})
            }
        })
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
        mouse.isDown= true
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
}

function updateDir() {
    dir.y = keys.KeyS - keys.KeyW
    dir.x = keys.KeyD - keys.KeyA
}