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
        let x = this.focusObject.x+(this.focusObject.w/2)
        let y = this.focusObject.y+(this.focusObject.h/2)
        Camera.setOffset(
            -x+(Screen.canvas.width/2)/Camera.zoom,
            -y+(Screen.canvas.height/2)/Camera.zoom)
    }
    static validZoom(value) {
        return value<25 && value > 0.3
    }
    static addZoom(value) {
        if (this.validZoom(Camera.zoom+value)) {
            Camera.zoom+=value
            this.updateFocus()
            Camera.size.w = Screen.canvas.width/Camera.zoom
            Camera.size.h = Screen.canvas.height/Camera.zoom
        }   
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