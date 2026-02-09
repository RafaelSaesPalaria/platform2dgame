import { checkCollision } from "../utils.js"
import { ChatUI } from "./chat.js"
import { HealthUI } from "./health.js"
import { HotbarUI } from "./hotbar.js"

export class UIHandler {
    static UIs = []
    
    static addUI(ui,type,reference) {
        ui.id = this.UIs.length+1
        this.UIs.push({type,"element":ui,reference})
    }
    static removeUI(ui) {
        this.UIs = this.UIs.filter(u => u.reference !== ui)
        this.UIs = this.UIs.filter(u => u.element!==ui)
    }
    static updateUIs() {
        this.UIs.forEach(ui => {
            ui.element.update()
        })
    }
    static getUI() {
        return this.UIs.filter(ui => ui.type===type)[0].element
    }
    static checkClickOnUIs(x,y) {
        for (let ui in this.UIs) {
            if (checkCollision({x,y,w:1,h:1},this.UIs[ui].element)) {
                return this.UIs[ui].element
            }
        }
    }
}

export function initUIs() {
    UIHandler.UIs.push({type:"hotbarUI",element:new HotbarUI(25,25,200,50)})
    UIHandler.UIs.push({type:"healthUI",element:new HealthUI(25,85,200,30)})
}

