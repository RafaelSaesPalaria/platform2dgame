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
            x: 2, y: 18, w: 5, h:9, color:"pink"
        },
        this.rightLeg = {
            x: 7, y: 18, w: 5, h:9, color:"black"
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
        if (this.dir!==0) {
            let p = Math.floor(10-this.poseTime%21)
            p = p/10
            this.rightLeg.x+=p*0.7
            this.leftLeg.x-=p*0.7
            this.rightArm.x+=p*0.2
            this.leftArm.x-=p*0.2
        }
    }
    update(x,y) {
        this.x = x
        this.y = y
        if (this.dir === getDir().x) {
            this.updatePose()
            this.walk()
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
            let w = part.w
            if (this.dir === 1) {
                let half = (this.w/2)
                let diff = x - (half)
                diff*=-1
                x = diff + half - w
            }
            Screen.drawRect(this.x+x,this.y+part.y,part.w,part.h,part.color)
        });
        //Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}