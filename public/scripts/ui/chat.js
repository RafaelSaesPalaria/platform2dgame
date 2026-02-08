import { User } from "../user.js"
import { Message } from "../view/message.js"
import { StaticScreen } from "../view/screen.js"
import { UI } from "./components.js"

export class ChatUI extends UI {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.open = true
        this.currentlyMessage = ""
        this.messaging = true
        this.messages = []
        this.hints = []
    }
    update() {
        this.open = User.isChatOpen
        this.hints = Message.hints
        if (this.open) {
            this.draw()
        }
    }
    draw() {
        StaticScreen.drawImage("ui-background",this.x,this.y,this.w,this.h)

        Message.messages.forEach((m,i) => {
            StaticScreen.write(m,"white",this.x+5,this.y+190-((Message.messages.length-i)*4.5))
        })

        if (User.isWriting) {
            StaticScreen.drawImage("ui-background",this.x,this.y+190,this.w,30)
            StaticScreen.write(Message.currentlyMessage,"white",20,this.x+5,this.y+210)
            if (this.hints) {
                if (this.hints.length>0) {
                    this.hints.forEach((h,i) => {
                        if (i>Message.selectedHint) {
                            StaticScreen.write(h,"white",20,this.x+5,this.y+190-((i-Message.selectedHint)*30))
                        }
                    })
                    let msg = this.hints[Message.selectedHint]
                    StaticScreen.write(msg,"yellow",20,this.x+5,this.y+190)
                }
            }
        }
    }
}