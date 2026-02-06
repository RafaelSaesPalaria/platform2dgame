import { Command } from "./command.js"

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
        this.updateHint()
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
    static updateHint() {
        if (this.isCommand(this.currentlyMessage)) {
            Message.hints = (Command.hint(this.currentlyMessage))
        } else {
            Message.hints = []
        }
    }
    static type(e) {
        if (this.isValidCaracter(e)) {
            this.currentlyMessage+=e.key
        }
        if (e.code === "ArrowUp") {
            this.selectedHint+=1
            if (this.selectedHint>=this.hints.length) {
                this.selectedHint=0
            }
        } else if (e.code === "ArrowDown") {
            this.selectedHint-=1
            if (this.selectedHint<=0) {
                this.selectedHint=this.hints.length
            }
        }
        if (e.code === "Tab") {
            let h = this.hints[this.selectedHint]
            //h= h.slice(1,this.hints[this.selectedHint].length)
            let msg = this.currentlyMessage.split(" ")
            msg[msg.length-1] = h
            this.currentlyMessage=msg.join(" ")
        }
        this.updateHint()
    }
}