import { Level } from "../../level.js"
import { hexToRGB, rgbToHex, shadeColor } from "../../utils.js"
import { Screen, StaticScreen } from "../screen.js"

export class Background {
    static size = {w:785,h:515}
    static timeShade = [
        "#99d9ea",
        "#00a2e8",
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
    static getGameTime() {
        return Math.floor((this.getDayTime()/1000)*24) + "h" + Math.floor((Math.floor((this.getDayTime()/1000)*24*60))%60)
    }
    static draw() {
        let dayTime = this.getDayTime()
        //console.log(dayTime)

        let thisShade = Math.floor(this.getDayShade())
        let nextShade = thisShade+1
        if (nextShade>=this.timeShade.length) {
            nextShade = 0
        }

        let rgb = (shadeColor(
            hexToRGB(this.timeShade[thisShade]),
            hexToRGB(this.timeShade[nextShade]),this.getDayShade()%1))
        StaticScreen.drawRect(0,0,this.size.w,this.size.h,rgbToHex(rgb))
        StaticScreen.write(this.getGameTime(),"white",30,700,30)
    }
}