import { highlight_block } from "../inputHandler.js"
import { Level } from "../level.js"
import { User } from "../user.js"
import { Camera } from "../view/camera.js"

export class Mouse {
    static x = 0
    static y = 0
    static isDown = 0
    static isLeftKey=0

    static mouseMove(e) {
        let cam = Camera.getOffset()
        let z = Camera.getZoom()
        this.x = (e.offsetX/z - (cam.x))
        this.y = (e.offsetY/z - (cam.y))

        let bs= Level.getCollidedBlocks({...this,w:1,h:1})
        bs.forEach(b => {
            let fb = {...b}
            fb.w=Level.blockSize
            fb.h=Level.blockSize
            highlight_block (fb)
        })
    }
    static wheel(e) {
        User.moveSelectedIndex(e.wheelDeltaY)
    }
    static mouseUp(e) {
        Mouse.isDown = false
    }
    static mouseDown(e) {
        Mouse.isDown= true
        Mouse.isLeftKey = e.button === 0
    }
}