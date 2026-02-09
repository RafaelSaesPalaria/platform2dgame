import { updateDir, updateZoom } from "../inputHandler.js"
import { ChatUI } from "../ui/chat.js"
import { UIHandler } from "../ui/uiHandler.js"
import { User } from "../user.js"
import { Message } from "../view/message.js"

export class Keyboard {
    static keys = {
        KeyW : false,
        KeyS: false,
        KeyD:false,
        KeyA:false,
        Enter: false,
        NumpadAdd: false,
        NumpadSubtract: false,
        KeyE: false
    }

    static keyHandler(e) {
        if (e.code === "Tab") {
            e.preventDefault()
        }
        if (e.code==="Enter" || !User.isWriting) {
            this.keys[e.code] = e.type !== "keyup"
            updateDir()
            updateZoom()
            if (this.keys["KeyE"]) {
                User.inventoryOpen=!User.inventoryOpen  
                if (User.inventoryOpen) {
                    User.openInventory()
                } else {
                    User.closeInventory()
                }
            }
            if (this.keys["Enter"]) {
                User.isChatOpen = !User.isChatOpen
                User.isWriting = User.isChatOpen
                if (User.isChatOpen) {
                    User.chatUI = new ChatUI(0,300,350,220)
                    UIHandler.UIs.push({type:"chatUI",element:User.chatUI})
                } else {
                    UIHandler.removeUI(User.chatUI)
                }
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
}