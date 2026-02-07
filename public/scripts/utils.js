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

export function hexToRGB(hex) {
    hex = hex.replace("#", "")

    let r = parseInt(hex.substring(0, 2), 16)
    let g = parseInt(hex.substring(2, 4), 16)
    let b = parseInt(hex.substring(4, 6), 16)

    return { r, g, b }
}

export function rgbToHex(rgb) {
    return "#" + [rgb.r, rgb.g, rgb.b]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("")
}

export function shadeColor(color1, color2, percentage) {
        let r = Math.floor(color1.r + (color2.r - color1.r) * percentage)
        let g = Math.floor(color1.g + (color2.g - color1.g) * percentage)
        let b = Math.floor(color1.b + (color2.b - color1.b) * percentage)
        return { r, g, b }
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