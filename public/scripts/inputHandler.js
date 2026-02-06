import { emit } from "./client.js"
import { checkClickOnUIs } from "./view/ui.js"
import { Level } from "./level.js"
import { checkCollision } from "./utils.js"
import { User } from "./user.js"
import { Item } from "./entities.js"
import { Chunk } from "./chunk.js"
import { Camera } from "./view/camera.js"


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
        Level.chunks.forEach(c => {
            if (checkCollision(c,{x:mouse.x,y:mouse.y,w:1,h:1})) {
                let i = "grass"
                let blocks = Level.getCollidedBlocks({x:mouse.x,y:mouse.y,w:1,h:1})
                blocks.forEach(b => {
                    if (mouse.isLeftKey) {
                        break_block(c,b)
                    } else {
                        place_block(c,b)
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

export function break_block(c,b) {
    if (b.id !== "air") {
        let id = b.id
        b.id = "air"
        Level.addEntity(new Item(id,1,mouse.x-Level.blockSize/2,mouse.y-Level.blockSize/2))
    }
}

export function place_block(c,b) {
    if (b.id === "air") {
        if (User.getSelectedItem()) {
            b.id = User.getSelectedItem().id
            if (b.id === "sappling") {
                console.log(b.worldX)
                Level.setBlock(b.id,b.worldX,b.worldY)
            }
            User.removeItem(User.getSelectedItem().id,1)
        }
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
    if (e.code === "Tab") {
        e.preventDefault()
    }
    if (e.code==="Enter" || !User.isWriting) {
        keys[e.code] = e.type !== "keyup"
        updateDir()
        updateZoom()
        if (keys["KeyE"]) {
            User.inventoryOpen=!User.inventoryOpen  
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

export class Message {
    static messages = []
    static hints = []
    static selectedHint = 0
    static currentlyMessage = ""
    static send() {
        if (this.isCommand(this.currentlyMessage)) {
            Command.apply(this.currentlyMessage)
            this.currentlyMessage = ""
        } else {
            this.messages.push(this.currentlyMessage)
            this.currentlyMessage = ""
        }
    }
    static backspace() {
        this.currentlyMessage = this.currentlyMessage.slice(0,this.currentlyMessage.length-1)
    }
    static isCommand(msg) {
        return msg[0]==="/"
    }
    static isValidCaracter(e) {
        if (e.code === "Backspace") {
            this.backspace()
        } else if (e.code === "CapsLock" || e.code === "Tab" || e.code === "ArrowUp" || e.code === "ArrowDown") {

        } else {
            return true
        }
    }
    static type(e) {
        if (this.isValidCaracter(e)) {
            this.currentlyMessage+=e.key
        }
        if (e.code === "ArrowUp") {
            this.selectedHint+=1
            if (this.selectedHint>this.hints.length) {
                this.selectedHint=0
            }
        } else if (e.code === "ArrowDown") {
            this.selectedHint-=1
            if (this.selectedHint<0) {
                this.selectedHint=this.hints.length
            }
        }
        if (e.code === "Tab") {
            let h = this.hints[this.selectedHint]
            h= h.slice(1,this.hints[this.selectedHint].length)
            this.currentlyMessage+=h
        }
        if (this.isCommand(this.currentlyMessage)) {
            Message.hints = (Command.hint(this.currentlyMessage))
            
        }
    }
}

export class Command {
    static commandsList = [
        "/give","/atest","/ztest"
    ]
    static give(player,id,amount) {
        User.addItem(id,Number.parseInt(amount))
    }
    static searchCommand(cmd) {
        let command = cmd.split(" ")

        if (command[0]==="/give") {
            Command.give(command[1],command[2],command[3])
        }
    }
    static apply(cmd) {
        this.searchCommand(cmd)
    }
    static hint(cmd) {
        let command = cmd.split(" ")
        if (command.length<=1) {
            return this.commandsList.filter(c => c.includes(command[0]))
        }
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