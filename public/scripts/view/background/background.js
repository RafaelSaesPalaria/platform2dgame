import { Level } from "../../level.js"
import { Screen } from "../screen.js"

export class Background {
    static size = {w:785,h:515}
    static timeShade = [
        "#99d9ea",
        "#00A2E8",
        "#FF7F27",
        "#3f48cc",
        "#1c2166",
        "#3f48cc",
        "#FF7F27",
        "#00A2E8",
    ]
    static getDayTime() {
        return Level.gameTime%Level.day
    }
    static getDayShade() {
        return ((this.getDayTime()/Level.day)*this.timeShade.length)
    }
    static getColor(hex) {
        console.log(parseInt("FF",16))
    }
    static draw() {
        let dayTime = this.getDayTime()
        //console.log(dayTime)
        this.getColor("#FF7F27")
        //Screen.drawRect(0,0,this.size.w,this.size.h,this.timeShade[this.getDayShade()])
    }
}