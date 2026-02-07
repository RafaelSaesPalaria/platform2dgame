import { checkCollision } from "../utils.js"
import { Screen, StaticScreen } from "./screen.js"
import { User } from "../user.js"
import { Message } from "./message.js"

let UIs = []

export function initUIs() {
    UIs.push({type:"hotbarUI",element:new hotbarUI(25,25,200,50)})
    UIs.push({type:"healthUI",element:new healthUI(25,85,200,30)})
    UIs.push({type:"inventoryUI",element:new inventoryUI(150,150,500,222)})
    UIs.push({type:"chatUI",element:new chatUI(0,300,350,220)})
}

export function updateUIs() {
    UIs.forEach(ui => {
        ui.element.update()
    })
}

export function checkClickOnUIs(x,y) {
    UIs.forEach(ui => {
        if (checkCollision({x,y,w:1,h:1},ui.element)) {
            ui.element.click(x,y)
            return true
        }
    })
    return false
}

class Button {
    constructor (x,y,w,h,action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.action = action;
    }
    checkClick(x,y) {
        if (checkCollision({x,y,w:1,h:1},this)) {
            this.click()
        }
    }
    click() {
        this.action();
    }
    draw() {

    }
}

class UI {
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    click(x,y) {

    }
    update() {
        this.draw()
    }
    draw() {

    }
}

export function getUI(type) {
    return UIs.filter(ui => ui.type===type)[0].element
}

export function addColor(hexCode) {
    colors.push(hexCode)
    getUI("colorsUI").buttons = []
    getUI("colorsUI").makeButtons()
    setCurrentlyColor(hexCode)
    getUI("colorsUI").currentlyColorChange()
}

let colors = ["#FF0000","#FFA500","#FFFF00","#008000","#0000FF","#800080","#000000","#808080","#FFFFFF"]
class colorsUI extends UI{
    constructor (x,y,w,h) {
        super(x,y,w,h)
        this.size = 30
        this.buttons = []
        this.makeButtons()
    }
    click(x,y) {
       this.buttons.forEach(b => {
            b.checkClick(x,y)
       })
    }
    makeButtons() {
        Screen.drawRect(this.x,this.y,this.w,this.h,"#dddddd")

        colors.forEach((c,i) => {
            let b = new Button(this.x+(((i+1)%5)*this.size),this.y+(Math.floor((i+1)/5)*this.size),this.size,this.size,() => {
                setCurrentlyColor(colors[i])
                this.currentlyColorChange()
            })

            this.buttons.push(b)

            Screen.drawRect(b.x,b.y,b.w,b.h,colors[i])
        })
    }
    currentlyColorChange() {
        setColors_input_Color(getCurrentlyColor())
        Screen.drawRect(this.x-2,this.y-2,this.size+4,this.size+4,"black")
        Screen.drawRect(this.x-1,this.y-1,this.size+2,this.size+2,"white")
        Screen.drawRect(this.x,this.y,this.size,this.size,getCurrentlyColor())
    }
    draw() {
        this.currentlyColorChange()
    }
}

class hotbarUI extends UI {
    constructor (x,y,w,h) {
        super(x,y,w,h)
        this.slots = []
        this.selectedIndex = 0

        this.w = this.slots*50
        this.h = 50
    }
    click(x,y) {

    }
    update() {
        this.slots = User.getHotbar()
        this.selectedIndex = User.selectedItemIndex
        this.draw()
    }
    draw() {
        if (this.slots.length<9) {
            for (let i = this.slots.length; i < 9 ; i++) {
                StaticScreen.drawImage("ui-slot",this.x+(i*50),this.y,50,50)
            }
        }

        StaticScreen.drawImage("ui-slot",this.x-5+(this.selectedIndex*50),this.y-5,60,60)

        this.slots.forEach((s,i) => {
            if (i !== this.selectedIndex) { 
                StaticScreen.drawImage("ui-slot",this.x+(i*50),this.y,50,50)
            }
            if (s !== null) {
                StaticScreen.drawImage(s.id,this.x+(10)+(i*50),this.y+10,30,30)
                StaticScreen.write(s.qnt,"white",20,this.x+(10)+(i*50),this.y+40)
            }
        })
    }
}

class inventoryUI extends UI {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.slots = []
    }
    update() {
        if (User.inventoryOpen) {
            this.slots = User.Inventory
            this.draw()
        }
    }
    draw() {
        StaticScreen.drawImage("ui-background",this.x,this.y,this.w,this.h)
        let slotSize = {w:this.w/9,h:this.h/4}
        for (let i = 0; i < 36; i++) {
            let x = this.x+((i%9)*slotSize.w)
            let y = this.y+(Math.floor(i/9))
            *slotSize.h
            let item = this.slots[i]
            StaticScreen.drawImage("ui-slot",x,y,slotSize.w+1,slotSize.h+1)
            if (item) {
                StaticScreen.drawImage(item.id,x+12,y+12,30,30)
                StaticScreen.write(item.qnt,"white",20,x+12,y+42)
            }
        }
    }
}

class healthUI extends UI {
    constructor(x,y,w,h) {
        super(x,y,w,h)
        this.health = 100
    }
    draw() {
        for(let h = 0; h < this.health; h+=10) {
            StaticScreen.drawImage("heart-filled",this.x+(h*3),this.y,30,30)
        }
    }
}

class chatUI extends UI {
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