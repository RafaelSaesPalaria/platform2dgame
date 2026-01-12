let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d")

export function resize() {
    canvas.width = 785;
    canvas.height = 515;
}

export function draw(x,y) {
    c.fillRect(x,y,5,5)
}