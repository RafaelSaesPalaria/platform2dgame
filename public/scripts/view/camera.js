import { checkCollision } from "../utils.js"
import { Screen } from "./screen.js"

export class Camera {
    static zoom = 1
    static offset = {x:0,y:0,dx:0,dy:0}
    static focusObject = {x:0,y:0}
    static size = {w:785,h:515}
    static setFocus(obj) {
        this.focusObject = obj
    }
    static updateFocus() {
        Camera.setOffset(
            -this.focusObject.x+(Screen.canvas.width/2)/Camera.zoom,
            -this.focusObject.y+(Screen.canvas.height/2)/Camera.zoom)
    }
    static addZoom(value) {
        Camera.zoom+=value

        Camera.size.w = Screen.canvas.width/Camera.zoom
        Camera.size.h = Screen.canvas.height/Camera.zoom
    }
    static setOffset(x,y) {
        Camera.offset.x = x
        Camera.offset.y = y
    }
    static updateOffset() {
        Camera.offset.x+=Camera.offset.dx
        Camera.offset.y+=Camera.offset.dy
    }
    static getZoom() {
        return Camera.zoom
    }
    static getOffset() {
        return Camera.offset
    }
    static isOnCamera(obj) {
        return checkCollision(obj,{
            x:-Camera.offset.x,
            y:-Camera.offset.y,
            w:Camera.size.w,
            h:Camera.size.h
        })
    }
}