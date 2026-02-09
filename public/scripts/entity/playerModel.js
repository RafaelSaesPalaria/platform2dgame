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
            x: 0, y: 0, w: 8, h:7, color:"yellow"
        }
        this.leftArm = {
            x: 3, y:9, w: 5, h:11, color:"red"
        },
        this.rightArm = {
            x: 3, y: 9, w: 5, h:11, color:"green"
        }
        this.torso = {
            x: 1, y: 7, w: 8, h:12, color:"purple"
        },
        this.leftLeg = {
            x: 3, y: 18, w: 5, h:9, color:"pink"
        },
        this.rightLeg = {
            x: 3, y: 18, w: 5, h:9, color:"black"
        }
        this.parts = [
            this.leftArm,
            this.leftLeg,
            this.torso,
            this.head,
            this.rightLeg,
            ,this.rightArm]
    }
    walk() {
        this.head.animationY=0.6
        this.torso.animationY=0.8
        this.rightLeg.animationX=-1.4
        this.leftLeg.animationX=1.4
        this.rightArm.animationX=0.4
        this.leftArm.animationX=-0.4
    }
    update(x,y) {
        this.x = x
        this.y = y
        if (this.dir === getDir().x) {
            this.updatePose()
        } else {
            this.changePose()
            this.walk()
        }
        
    }
    updatePose() {
        this.poseTime+=1
    }
    changePose() {
        this.dir = getDir().x
    }
    draw() {
        let t = this.poseTime%20
        let animationFactor = 10 - Math.abs(t - 10)
        animationFactor/=5
        if (this.dir===0) {
            animationFactor = 0
        }

        this.parts.forEach(part => {
            let x = part.x
            let w = part.w
            let y = part.y
            if (this.dir === 1) {
                let half = (this.w/2)
                let diff = x - (half)
                diff*=-1
                x = diff + half - w
            }

            if (part.animationX) {
                x+=(part.animationX*animationFactor)
            }
            if (part.animationY) {
                y+=(part.animationX*animationFactor)
            }

            Screen.drawRect(this.x+x,this.y+part.y,part.w,part.h,part.color)
        });
        //Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}