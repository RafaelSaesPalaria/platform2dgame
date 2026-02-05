export function checkCollision(obj1,obj2) {
    return (
        obj1.x + obj1.w >= obj2.x &&
        obj1.x <= obj2.x + obj2.w &&
        obj1.y + obj1.h >= obj2.y &&
        obj1.y <= obj2.y + obj2.h);
}

export function getDistance(obj1,obj2) {
    return {x:Math.floor(obj1.x-obj2.x),y:Math.floor(obj1.y-obj2.y)}
}

/*
 this.selectedHint+=1
            if (this.selectedHint>this.hints.length) {
                this.selectedHint=0
            }
        } else if (e.code === "ArrowDown") {
            this.selectedHint-=1
            if (this.selectedHint<0) {
                this.selectedHint=this.hints.length
            }
*/

export class List {
    static add(listValue,listMax,value) {
        listValue+=value
        if (listValue<0) {
            listValue=listMax
        }
        if (listValue>listMax) {
            listValue = 0
        }
    }
}