import { getDir } from "../inputHandler.js"
import { Screen } from "../view/screen.js"

export class PlayerModel {
    constructor(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = 1
        this.poseTime = 0
        this.head = {
            x: 2, y: 0, w: 8, h:7, color:"yellow"
        }
        this.leftArm = {
            x: 7, y:9, w: 5, h:11, color:"red"
        },
        this.rightArm = {
            x: 7, y: 9, w: 5, h:11, color:"green"
        }
        this.torso = {
            x: 3, y: 6, w: 8, h:12, color:"purple"
        },
        this.leftLeg = {
            x: 2, y: 15, w: 5, h:12, color:"pink"
        },
        this.rightLeg = {
            x: 7, y: 15, w: 5, h:12, color:"black"
        }
        this.parts = [
            this.torso,
            this.head,
            this.leftLeg,this.rightLeg,
            this.leftArm,this.rightArm]
    }
    walk() {
        
    }
    update(x,y) {
        this.x = x
        this.y = y
        if (this.dir === getDir().x) {
            this.updatePose()
        } else {
            this.changePose()
        }
        
    }
    updatePose() {
        this.poseTime+=1
    }
    changePose() {
        this.dir = getDir().x
    }
    draw() {
        this.parts.forEach(part => {
            let x = part.x
            if (this.dir === 1) {
                let half = (this.w/2)
                let diff = x - (half)
                diff*=-1
                x = diff + half
            }
            Screen.drawRect(this.x+x,this.y+part.y,part.w,part.h,part.color)
        });
        Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}