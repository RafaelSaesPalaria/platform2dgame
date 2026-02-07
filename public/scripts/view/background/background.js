import { Level } from "../../level.js"
import { hexToRGB, rgbToHex, shadeColor } from "../../utils.js"
import { Camera } from "../camera.js"
import { Screen, StaticScreen } from "../screen.js"
import { Cloud } from "./clouds.js"

export class Background {
    static clouds = []
    static wind = {dx : 1}
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
    static addCloud() {
        let y = Math.random()*Camera.size.h
        this.clouds.push(new Cloud(0,y,this.wind.dx))
    }
    static removeCloud(c) {
        this.clouds = this.clouds.filter(cl => cl!==c)
    }
    static updateClouds() {
        this.clouds.forEach(c => {
            c.update()
        })
    }
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
        if (this.clouds.length<=5) {
            this.addCloud()
        }
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
        this.updateClouds()
        StaticScreen.write(this.getGameTime(),"white",30,700,30)
    }
}